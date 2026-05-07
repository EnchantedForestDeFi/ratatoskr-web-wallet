import { useState } from 'react';

interface BackupMnemonicProps {
  mnemonic: string;
  onConfirm: () => void;
}

export function BackupMnemonic({ mnemonic, onConfirm }: BackupMnemonicProps) {
  const [copied, setCopied] = useState(false);
  const words = mnemonic.split(' ');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mnemonic);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Backup Your Wallet</h1>
        <p className="text-dark-400 mt-2">
          Write down these 12 words in order. This is the{' '}
          <strong className="text-white">only way</strong> to recover your wallet
          if you lose access to this browser.
        </p>
      </div>

      <div className="card bg-dark-800">
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-3 mb-4 text-yellow-300 text-sm">
          Never share these words with anyone. Anyone with these words can steal your funds.
        </div>

        <div className="grid grid-cols-3 gap-3">
          {words.map((word, i) => (
            <div key={i} className="bg-dark-900 rounded-lg px-3 py-2 text-center">
              <span className="text-dark-500 text-xs mr-1">{i + 1}.</span>
              <span className="font-mono text-sm">{word}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="mt-4 w-full py-2.5 rounded-xl text-sm font-medium transition-colors border border-dark-600 hover:border-ratr-500 hover:text-ratr-400 text-dark-300"
        >
          {copied ? 'Copied!' : 'Copy recovery phrase'}
        </button>
      </div>

      {/* Educational warnings as prose. The verification step (next view) is the
          actual gate — these are here to teach, not to be click-required. */}
      <div className="space-y-2.5 text-sm text-dark-300 px-1">
        <p className="flex items-start gap-2">
          <span className="text-yellow-400 mt-0.5 flex-shrink-0">▸</span>
          <span>
            Write them down <strong className="text-white">in order</strong> — paper,
            metal backup, or password manager. Avoid screenshots.
          </span>
        </p>
        <p className="flex items-start gap-2">
          <span className="text-yellow-400 mt-0.5 flex-shrink-0">▸</span>
          <span>
            <strong className="text-yellow-300">
              Lose these words = lose your funds permanently.
            </strong>{' '}
            No one — not EnchantedForestDeFi, not the Ratatoskr team, not anyone — can recover them.
          </span>
        </p>
        <p className="flex items-start gap-2">
          <span className="text-red-400 mt-0.5 flex-shrink-0">▸</span>
          <span>
            <strong className="text-red-300">Never share</strong> these words with anyone, including
            support staff. Anyone asking is trying to steal your RATR.
          </span>
        </p>
      </div>

      <button onClick={onConfirm} className="btn-parchment w-full">
        I&apos;ve written it down — verify
      </button>
    </div>
  );
}
