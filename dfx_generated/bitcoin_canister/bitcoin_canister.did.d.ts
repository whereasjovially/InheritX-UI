import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type BitcoinNetwork = { 'Mainnet' : null } |
  { 'Regtest' : null } |
  { 'Testnet' : null };
export interface ManualReply {
  'next_page' : [] | [Uint8Array | number[]],
  'tip_height' : number,
  'tip_block_hash' : Uint8Array | number[],
  'utxos' : Array<Utxo>,
}
export interface Outpoint { 'txid' : Uint8Array | number[], 'vout' : number }
export interface SendRequest {
  'amountInSatoshi' : bigint,
  'destinationAddress' : string,
  'identifier' : number,
}
export interface Utxo {
  'height' : number,
  'value' : bigint,
  'outpoint' : Outpoint,
}
export interface _SERVICE {
  'getBalance' : ActorMethod<[string], bigint>,
  'getCurrentFeePercentiles' : ActorMethod<[], BigUint64Array | bigint[]>,
  'getP2PKHAddress' : ActorMethod<[number], string>,
  'getUtxos' : ActorMethod<[string], ManualReply>,
  'send' : ActorMethod<[SendRequest], string>,
}
