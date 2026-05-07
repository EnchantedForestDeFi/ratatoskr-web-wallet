import React, { useState } from 'react';

interface ImportWalletProps {
  onImport: (mnemonic: string, password: string) => Promise<void>;
  onBack: () => void;
  loading: boolean;
  error: string | null;
}

export function ImportWallet({ onImport, onBack, loading, error }: ImportWalletProps) {
  const [mnemonic, setMnemonic] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const wordCount = mnemonic.trim().split(/\s+/).filter(Boolean).length;
  const passwordsMatch = password === confirm;
  const isValid = wordCount === 12 && password.length >= 8 && passwordsMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onImport(mnemonic, password);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Import Wallet</h1>
        <p className="text-dark-400 mt-2">
          Enter your 12-word recovery phrase and set a new password.
        </p>
      </div>

      {/* Mobile/clipboard safety warning - phrase entry is high-risk */}
      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-3 text-yellow-200/90 text-xs">
        Type your phrase carefully or paste from a trusted source.
        Anything in your clipboard could be read by malicious software —
        clear it after pasting.
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Recovery Phrase (12 words)
          </label>
          {/*
            CRITICAL: spellCheck=false prevents iOS/Safari and Chromium browsers
            from sending the phrase to remote spellcheck servers.
            autoCorrect=off prevents iOS from silently mutating "abandon" -> "Abandon".
            autoCapitalize=none prevents iOS from capitalizing the first letter.
            autoComplete=off prevents browser saved-form suggestions for this field.
          */}
          <textarea
            className="input-field h-24 resize-none font-mono text-sm"
            placeholder="word1 word2 word3 ..."
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value.toLowerCase())}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
          />
          <p className="text-dark-500 text-xs mt-1">
            {wordCount}/12 words
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            New Password
          </label>
          <input
            type="password"
            className="input-field"
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            autoComplete="new-password"
            spellCheck={false}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            className="input-field"
            placeholder="Repeat your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            spellCheck={false}
          />
          {confirm && !passwordsMatch && (
            <p className="text-red-400 text-sm mt-1">Passwords do not match</p>
          )}
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-xl p-3 text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onBack} className="btn-secondary flex-1">
            Back
          </button>
          <button type="submit" disabled={!isValid || loading} className="btn-primary flex-1">
            {loading ? 'Importing...' : 'Import Wallet'}
          </button>
        </div>
      </form>
    </div>
  );
}
