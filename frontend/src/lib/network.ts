import { networks } from 'bitcoinjs-lib';

// Ratatoskr (RATR) network parameters
// Source: chainparams.cpp (CMainParams)
//   PUBKEY_ADDRESS: 60 = 0x3C — addresses start with 'R'
//   SCRIPT_ADDRESS: 122 = 0x7A — addresses start with '7'
//   SECRET_KEY:     188 = 0xBC — WIF
//   EXT_PUBLIC_KEY: 0x0420BD3A
//   EXT_SECRET_KEY: 0x0420B900
//   nExtCoinType:   530 (Ratatoskr BIP44 coin type, SLIP-0044 registration target)
export const ratatoskr: networks.Network = {
  messagePrefix: '\x19Ratatoskr Signed Message:\n',
  bech32: 'ratr', // RATR doesn't actually use bech32 addresses; field required by Network type
  bip32: {
    public: 0x0420BD3A,
    private: 0x0420B900,
  },
  pubKeyHash: 0x3C,  // 60 — R prefix
  scriptHash: 0x7A,  // 122
  wif: 0xBC,         // 188
};

// Testnet — for testnet selector / development
// Source: chainparams.cpp (CTestNetParams)
export const ratatoskrTestnet: networks.Network = {
  messagePrefix: '\x19Ratatoskr Testnet Signed Message:\n',
  bech32: 'tratr',
  bip32: {
    public: 0x043587CF,
    private: 0x04358394,
  },
  pubKeyHash: 0x8C,  // 140 — y prefix
  scriptHash: 0x13,  // 19
  wif: 0xEF,         // 239
};

// Default to mainnet; flip via env at build time:
//   VITE_RATR_NETWORK=testnet  → testnet
//   anything else / unset      → mainnet
const networkSelection = (import.meta.env.VITE_RATR_NETWORK || 'mainnet').toLowerCase();
export const activeNetwork = networkSelection === 'testnet' ? ratatoskrTestnet : ratatoskr;
export const isTestnet = networkSelection === 'testnet';

export const BIP44_COIN_TYPE = isTestnet ? 1 : 530;
export const DERIVATION_PATH = `m/44'/${BIP44_COIN_TYPE}'/0'/0/0`;

// 1 RATR = 100,000,000 satoshis
export const COIN = 100_000_000;

// Minimum fee rate (satoshis per byte)
export const MIN_FEE_RATE = 1;
export const DEFAULT_FEE_RATE = 10;

export const API_BASE = '/api';
