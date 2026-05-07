import { useState, useMemo } from 'react';
import * as bip39 from 'bip39';

interface BackupVerifyProps {
  mnemonic: string;
  onSuccess: () => void;
  onRetry: () => void;
}

interface Question {
  position: number;   // 0-indexed position in the 12-word seed
  correctWord: string;
  options: string[];  // shuffled: correct + 2 distractors
}

// Fisher-Yates-style sample of N unique elements from arr (non-mutating)
function sampleN<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

export function BackupVerify({ mnemonic, onSuccess, onRetry }: BackupVerifyProps) {
  const words = mnemonic.split(' ');

  // Generate questions ONCE on mount via useMemo — re-renders must not reshuffle
  // (otherwise the user would see new questions mid-attempt)
  const questions: Question[] = useMemo(() => {
    const wordlist = bip39.wordlists.english;
    // Pick 3 unique random positions (0..11), then sort ascending for natural reading order
    const positions = sampleN(
      Array.from({ length: words.length }, (_, i) => i),
      3
    ).sort((a, b) => a - b);

    return positions.map((pos) => {
      const correctWord = words[pos];
      // Distractors must NOT be words already in the user's seed (else two correct answers possible)
      const seedSet = new Set(words);
      const candidates = wordlist.filter((w) => !seedSet.has(w));
      const distractors = sampleN(candidates, 2);
      // Shuffle so the correct word isn't always in the same slot
      const options = sampleN([correctWord, ...distractors], 3);
      return { position: pos, correctWord, options };
    });
  }, [mnemonic]);

  const [selections, setSelections] = useState<Record<number, string>>({});
  const [failed, setFailed] = useState(false);

  const allAnswered = Object.keys(selections).length === questions.length;

  const handleVerify = () => {
    const allCorrect = questions.every(
      (q) => selections[q.position] === q.correctWord
    );
    if (allCorrect) {
      onSuccess();
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-red-300">Verification failed</h1>
          <p className="text-dark-400 mt-2">
            One or more answers were incorrect. Please go back and write down your
            12-word phrase carefully — make sure all words are in the correct order
            before trying again.
          </p>
        </div>

        <div className="bg-red-900/30 border-2 border-red-700/60 rounded-xl p-4 text-red-200 text-sm">
          This check exists to make sure you actually have your backup.
          Skipping it or guessing risks losing access to your wallet
          permanently. Take your time — this is a one-time gate.
        </div>

        <button onClick={onRetry} className="btn-primary w-full">
          Show my phrase again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Verify Your Backup</h1>
        <p className="text-dark-400 mt-2">
          Look at your written backup and pick the correct word for each position.
        </p>
      </div>

      <div className="space-y-5">
        {questions.map((q) => (
          <div key={q.position} className="card bg-dark-800">
            <p className="text-sm text-dark-300 mb-3">
              Word at position{' '}
              <span className="font-bold text-ratr-400">#{q.position + 1}</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              {q.options.map((opt) => {
                const isSelected = selections[q.position] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setSelections({ ...selections, [q.position]: opt })
                    }
                    className={`py-2.5 px-3 rounded-lg font-mono text-sm transition-all ${
                      isSelected
                        ? 'bg-ratr-600 text-white border-2 border-ratr-400'
                        : 'bg-dark-900 text-dark-200 border-2 border-dark-600 hover:border-dark-500'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onRetry} className="btn-secondary flex-1">
          Show phrase again
        </button>
        <button
          onClick={handleVerify}
          disabled={!allAnswered}
          className="btn-parchment flex-1"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
