import { useState } from 'react';

interface BackupMnemonicProps {
  mnemonic: string;
  onConfirm: () => void;
}

export function BackupMnemonic({ mnemonic, onConfirm }: BackupMnemonicProps) {
  const [confirmed1, setConfirmed1] = useState(false);
  const [confirmed2, setConfirmed2] = useState(false);
  const [confirmed3, setConfirmed3] = useState(false);
  const [copied, setCopied] = useState(false);
  const words = mnemonic.split(' ');
  const allConfirmed = confirmed1 && confirmed2 && confirmed3;

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
          Write down these 12 words in order. This is the <strong className="text-white">only way</strong> to
          recover your wallet if you lose access to this browser.
        </p>
      </div>

      <div className="card bg-dark-800">
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-3 mb-4 text-yellow-300 text-sm">
          Never share these words with anyone. Anyone with these words can steal your funds.
        </div>

        <div className="grid grid-cols-3 gap-3">
          {words.map((word, i) => (
            <div
              key={i}
              className="bg-dark-900 rounded-lg px-3 py-2 text-center"
            >
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

      {/* Three explicit confirmation gates — escalates from SMT's single checkbox */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 rounded border-dark-600 bg-dark-800 text-ratr-500
                       focus:ring-ratr-500 focus:ring-offset-0"
            checked={confirmed1}
            onChange={(e) => setConfirmed1(e.target.checked)}
          />
          <span className="text-sm text-dark-300">
            I have written down these 12 words <strong className="text-white">in order</strong> and stored them somewhere safe (paper, metal backup, or password manager).
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 rounded border-dark-600 bg-dark-800 text-ratr-500
                       focus:ring-ratr-500 focus:ring-offset-0"
            checked={confirmed2}
            onChange={(e) => setConfirmed2(e.target.checked)}
          />
          <span className="text-sm text-dark-300">
            I understand that <strong className="text-yellow-300">if I lose these words, my funds are permanently lost</strong>.
            No one — not EnchantedForestDeFi, not the Ratatoskr team, not anyone — can recover them.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 rounded border-dark-600 bg-dark-800 text-ratr-500
                       focus:ring-ratr-500 focus:ring-offset-0"
            checked={confirmed3}
            onChange={(e) => setConfirmed3(e.target.checked)}
          />
          <span className="text-sm text-dark-300">
            I will <strong className="text-red-300">never share</strong> these words with anyone, including support staff.
            Anyone asking for them is trying to steal my RATR.
          </span>
        </label>
      </div>

      <button
        onClick={onConfirm}
        disabled={!allConfirmed}
        className="btn-parchment w-full"
      >
        I've Saved My Backup
      </button>
    </div>
  );
}
