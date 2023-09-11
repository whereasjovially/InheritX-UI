import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface ICRCAccount {
  'owner' : Principal,
  'subaccount' : [] | [Uint8Array | number[]],
}
export type ICRCTransferError = {
    'GenericError' : _InlineICRCTransferErrorGenericError
  } |
  { 'TemporarilyUnavailable' : null } |
  { 'BadBurn' : _InlineICRCTransferErrorBadBurn } |
  { 'Duplicate' : _InlineICRCTransferErrorDuplicate } |
  { 'BadFee' : _InlineICRCTransferErrorBadFee } |
  { 'CreatedInFuture' : _InlineICRCTransferErrorCreatedInFuture } |
  { 'TooOld' : null } |
  { 'InsufficientFunds' : _InlineICRCTransferErrorInsufficientFunds };
export type ManualReply = { 'Ok' : Tokens } |
  { 'Err' : string };
export type ManualReply_1 = { 'Ok' : bigint } |
  { 'Err' : TransferError } |
  { 'message' : string } |
  { 'unAuthorized' : boolean };
export type ManualReply_2 = { 'Ok' : bigint } |
  { 'Err' : ICRCTransferError } |
  { 'message' : string } |
  { 'unAuthorized' : boolean };
export type ManualReply_3 = { 'Ok' : bigint } |
  { 'Err' : string };
export type ManualReply_4 = { 'Ok' : bigint } |
  { 'Err' : ICRCTransferError } |
  { 'message' : string } |
  { 'success' : bigint } |
  { 'unAuthorized' : boolean };
export interface Tokens { 'e8s' : bigint }
export type TransferError = { 'TxTooOld' : _InlineTransferErrorTxTooOld } |
  { 'BadFee' : _InlineTransferErrorBadFee } |
  { 'TxDuplicate' : _InlineTransferErrorTxDuplicate } |
  { 'TxCreatedInFuture' : null } |
  { 'InsufficientFunds' : _InlineTransferErrorInsufficientFunds };
export interface _InlineICRCTransferErrorBadBurn { 'min_burn_amount' : bigint }
export interface _InlineICRCTransferErrorBadFee { 'expected_fee' : bigint }
export interface _InlineICRCTransferErrorCreatedInFuture {
  'ledger_time' : bigint,
}
export interface _InlineICRCTransferErrorDuplicate { 'duplicate_of' : bigint }
export interface _InlineICRCTransferErrorGenericError {
  'message' : string,
  'error_code' : bigint,
}
export interface _InlineICRCTransferErrorInsufficientFunds {
  'balance' : bigint,
}
export interface _InlineTransferErrorBadFee { 'expected_fee' : Tokens }
export interface _InlineTransferErrorInsufficientFunds { 'balance' : Tokens }
export interface _InlineTransferErrorTxDuplicate { 'duplicate_of' : bigint }
export interface _InlineTransferErrorTxTooOld {
  'allowed_window_nanos' : bigint,
}
export interface _SERVICE {
  'binary_address_from_principal' : ActorMethod<
    [Principal, number],
    Uint8Array | number[]
  >,
  'canisterBalance128' : ActorMethod<[], bigint>,
  'ckbtc_balance_of' : ActorMethod<[ICRCAccount], bigint>,
  'ckbtc_fee' : ActorMethod<[], bigint>,
  'getIdentifierBlob' : ActorMethod<[number], Uint8Array | number[]>,
  'get_account_balance_of_icp_identifier' : ActorMethod<
    [Principal, number],
    ManualReply
  >,
  'get_canister_binary_subaccount_from_identifier' : ActorMethod<
    [number],
    Uint8Array | number[]
  >,
  'get_canister_hex_subaccount_from_identifier' : ActorMethod<[number], string>,
  'get_icrc_canister_id' : ActorMethod<[], Principal>,
  'get_will_canister_id' : ActorMethod<[], string>,
  'hex_address_from_principal' : ActorMethod<[Principal, number], string>,
  'icp_transfer' : ActorMethod<[number, Principal], ManualReply_1>,
  'icrc_ckbtc_transfer' : ActorMethod<
    [number, Principal, bigint],
    ManualReply_2
  >,
  'icrc_icp_balanceOf' : ActorMethod<[number], ManualReply_3>,
  'icrc_icp_fee' : ActorMethod<[], ManualReply_3>,
  'icrc_icp_transfer' : ActorMethod<[number, Principal], ManualReply_4>,
  'list_canister_ids' : ActorMethod<[], Array<[string, string]>>,
  'set_will_canister_id' : ActorMethod<[string], string>,
}
