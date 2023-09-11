import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AddUserDetails = { 'userExists' : boolean } |
  { 'success' : boolean };
export type CreateWillArgs = { 'icrc' : ICRCCreateWillArgs };
export type GetHeirWills = { 'wills' : Array<Will> } |
  { 'noWillsExists' : boolean };
export type GetTestatorWills = { 'userNotExists' : boolean } |
  { 'wills' : Array<Will> } |
  { 'noWillsExists' : boolean };
export type GetUserDetails = { 'userDetails' : UserDetails } |
  { 'userNotExists' : boolean };
export type ICRCClaimWill = {
    'ckbtcClaimResult' : _InlineICRCClaimWillCkbtcClaimResult
  } |
  { 'isClaimed' : boolean } |
  { 'claimError' : string } |
  { 'tokenTickerNotSupported' : boolean } |
  { 'icpClaimResult' : _InlineICRCClaimWillIcpClaimResult };
export type ICRCCreateWill = { 'identifierUsed' : boolean } |
  { 'tokenTickerNotSupported' : string } |
  { 'success' : boolean } |
  { 'userNotExists' : boolean };
export interface ICRCCreateWillArgs {
  'heirs' : Principal,
  'willName' : string,
  'tokenTicker' : string,
  'identifier' : number,
  'amount' : bigint,
}
export type ICRCDeleteWill = { 'errorMessage' : string } |
  { 'success' : boolean };
export type ManualReply = { 'icrc' : ICRCClaimWill } |
  { 'claimError' : boolean } |
  { 'willNotExists' : boolean } |
  { 'unAuthorizedClaimer' : boolean } |
  { 'willTypeNotSupported' : boolean };
export type ManualReply_1 = { 'icrc' : ICRCCreateWill } |
  { 'userNotExists' : boolean } |
  { 'willTypeNotSupported' : boolean };
export type ManualReply_2 = { 'identifierUsed' : boolean } |
  { 'icrc' : ICRCDeleteWill } |
  { 'unAuthorizedTestator' : boolean } |
  { 'willNotExists' : boolean } |
  { 'userNotExists' : boolean } |
  { 'willTypeNotSupported' : boolean };
export type UpdateUserDetails = { 'success' : boolean } |
  { 'userNotExists' : boolean };
export interface UserDetails {
  'sex' : string,
  'principal' : Principal,
  'birthDate' : string,
  'birthLocationCode' : string,
  'firstNames' : Array<string>,
  'lastName' : string,
}
export interface Will {
  'heirs' : Principal,
  'value' : bigint,
  'willName' : string,
  'timeStamp' : bigint,
  'testator' : Principal,
  'isClaimed' : boolean,
  'tokenTicker' : string,
  'identifier' : number,
}
export interface _InlineICRCClaimWillCkbtcClaimResult {
  'success' : boolean,
  'claimCKBTCMessage' : string,
}
export interface _InlineICRCClaimWillIcpClaimResult {
  'claimICPMessage' : string,
  'success' : boolean,
}
export interface userDetailsArgs {
  'sex' : string,
  'birthDate' : string,
  'birthLocationCode' : string,
  'firstNames' : Array<string>,
  'lastName' : string,
}
export interface _SERVICE {
  'add_user_details' : ActorMethod<[userDetailsArgs], AddUserDetails>,
  'canisterBalance' : ActorMethod<[], bigint>,
  'claim_will' : ActorMethod<[number, string], ManualReply>,
  'create_will' : ActorMethod<[CreateWillArgs, string], ManualReply_1>,
  'delete_will' : ActorMethod<[number, string], ManualReply_2>,
  'get_all_identifiers' : ActorMethod<[], Array<[number, Principal]>>,
  'get_all_wills' : ActorMethod<[], Array<[number, Will]>>,
  'get_icrc_canister_id' : ActorMethod<[], string>,
  'get_user_details' : ActorMethod<[], GetUserDetails>,
  'get_will_canister_id' : ActorMethod<[], Principal>,
  'get_wills_for_heir' : ActorMethod<[], GetHeirWills>,
  'get_wills_for_testator' : ActorMethod<[], GetTestatorWills>,
  'request_random_will_identifier' : ActorMethod<[], number>,
  'set_icrc_canister_id' : ActorMethod<[string], string>,
  'update_user_details' : ActorMethod<[userDetailsArgs], UpdateUserDetails>,
}
