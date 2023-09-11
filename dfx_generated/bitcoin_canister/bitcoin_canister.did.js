export const idlFactory = ({ IDL }) => {
  const BitcoinNetwork = IDL.Variant({
    'Mainnet' : IDL.Null,
    'Regtest' : IDL.Null,
    'Testnet' : IDL.Null,
  });
  const Outpoint = IDL.Record({
    'txid' : IDL.Vec(IDL.Nat8),
    'vout' : IDL.Nat32,
  });
  const Utxo = IDL.Record({
    'height' : IDL.Nat32,
    'value' : IDL.Nat64,
    'outpoint' : Outpoint,
  });
  const ManualReply = IDL.Record({
    'next_page' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'tip_height' : IDL.Nat32,
    'tip_block_hash' : IDL.Vec(IDL.Nat8),
    'utxos' : IDL.Vec(Utxo),
  });
  const SendRequest = IDL.Record({
    'amountInSatoshi' : IDL.Nat64,
    'destinationAddress' : IDL.Text,
    'identifier' : IDL.Nat32,
  });
  return IDL.Service({
    'getBalance' : IDL.Func([IDL.Text], [IDL.Nat64], []),
    'getCurrentFeePercentiles' : IDL.Func([], [IDL.Vec(IDL.Nat64)], []),
    'getP2PKHAddress' : IDL.Func([IDL.Nat32], [IDL.Text], []),
    'getUtxos' : IDL.Func([IDL.Text], [ManualReply], []),
    'send' : IDL.Func([SendRequest], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => {
  const BitcoinNetwork = IDL.Variant({
    'Mainnet' : IDL.Null,
    'Regtest' : IDL.Null,
    'Testnet' : IDL.Null,
  });
  return [BitcoinNetwork];
};
