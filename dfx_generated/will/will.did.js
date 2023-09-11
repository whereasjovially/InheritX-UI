export const idlFactory = ({ IDL }) => {
  const userDetailsArgs = IDL.Record({
    'sex' : IDL.Text,
    'birthDate' : IDL.Text,
    'birthLocationCode' : IDL.Text,
    'firstNames' : IDL.Vec(IDL.Text),
    'lastName' : IDL.Text,
  });
  const AddUserDetails = IDL.Variant({
    'userExists' : IDL.Bool,
    'success' : IDL.Bool,
  });
  const _InlineICRCClaimWillCkbtcClaimResult = IDL.Record({
    'success' : IDL.Bool,
    'claimCKBTCMessage' : IDL.Text,
  });
  const _InlineICRCClaimWillIcpClaimResult = IDL.Record({
    'claimICPMessage' : IDL.Text,
    'success' : IDL.Bool,
  });
  const ICRCClaimWill = IDL.Variant({
    'ckbtcClaimResult' : _InlineICRCClaimWillCkbtcClaimResult,
    'isClaimed' : IDL.Bool,
    'claimError' : IDL.Text,
    'tokenTickerNotSupported' : IDL.Bool,
    'icpClaimResult' : _InlineICRCClaimWillIcpClaimResult,
  });
  const ManualReply = IDL.Variant({
    'icrc' : ICRCClaimWill,
    'claimError' : IDL.Bool,
    'willNotExists' : IDL.Bool,
    'unAuthorizedClaimer' : IDL.Bool,
    'willTypeNotSupported' : IDL.Bool,
  });
  const ICRCCreateWillArgs = IDL.Record({
    'heirs' : IDL.Principal,
    'willName' : IDL.Text,
    'tokenTicker' : IDL.Text,
    'identifier' : IDL.Nat32,
    'amount' : IDL.Nat,
  });
  const CreateWillArgs = IDL.Variant({ 'icrc' : ICRCCreateWillArgs });
  const ICRCCreateWill = IDL.Variant({
    'identifierUsed' : IDL.Bool,
    'tokenTickerNotSupported' : IDL.Text,
    'success' : IDL.Bool,
    'userNotExists' : IDL.Bool,
  });
  const ManualReply_1 = IDL.Variant({
    'icrc' : ICRCCreateWill,
    'userNotExists' : IDL.Bool,
    'willTypeNotSupported' : IDL.Bool,
  });
  const ICRCDeleteWill = IDL.Variant({
    'errorMessage' : IDL.Text,
    'success' : IDL.Bool,
  });
  const ManualReply_2 = IDL.Variant({
    'identifierUsed' : IDL.Bool,
    'icrc' : ICRCDeleteWill,
    'unAuthorizedTestator' : IDL.Bool,
    'willNotExists' : IDL.Bool,
    'userNotExists' : IDL.Bool,
    'willTypeNotSupported' : IDL.Bool,
  });
  const Will = IDL.Record({
    'heirs' : IDL.Principal,
    'value' : IDL.Nat,
    'willName' : IDL.Text,
    'timeStamp' : IDL.Nat64,
    'testator' : IDL.Principal,
    'isClaimed' : IDL.Bool,
    'tokenTicker' : IDL.Text,
    'identifier' : IDL.Nat32,
  });
  const UserDetails = IDL.Record({
    'sex' : IDL.Text,
    'principal' : IDL.Principal,
    'birthDate' : IDL.Text,
    'birthLocationCode' : IDL.Text,
    'firstNames' : IDL.Vec(IDL.Text),
    'lastName' : IDL.Text,
  });
  const GetUserDetails = IDL.Variant({
    'userDetails' : UserDetails,
    'userNotExists' : IDL.Bool,
  });
  const GetHeirWills = IDL.Variant({
    'wills' : IDL.Vec(Will),
    'noWillsExists' : IDL.Bool,
  });
  const GetTestatorWills = IDL.Variant({
    'userNotExists' : IDL.Bool,
    'wills' : IDL.Vec(Will),
    'noWillsExists' : IDL.Bool,
  });
  const UpdateUserDetails = IDL.Variant({
    'success' : IDL.Bool,
    'userNotExists' : IDL.Bool,
  });
  return IDL.Service({
    'add_user_details' : IDL.Func([userDetailsArgs], [AddUserDetails], []),
    'canisterBalance' : IDL.Func([], [IDL.Nat64], ['query']),
    'claim_will' : IDL.Func([IDL.Nat32, IDL.Text], [ManualReply], []),
    'create_will' : IDL.Func([CreateWillArgs, IDL.Text], [ManualReply_1], []),
    'delete_will' : IDL.Func([IDL.Nat32, IDL.Text], [ManualReply_2], []),
    'get_all_identifiers' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat32, IDL.Principal))],
        ['query'],
      ),
    'get_all_wills' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat32, Will))],
        ['query'],
      ),
    'get_icrc_canister_id' : IDL.Func([], [IDL.Text], ['query']),
    'get_user_details' : IDL.Func([], [GetUserDetails], ['query']),
    'get_will_canister_id' : IDL.Func([], [IDL.Principal], ['query']),
    'get_wills_for_heir' : IDL.Func([], [GetHeirWills], ['query']),
    'get_wills_for_testator' : IDL.Func([], [GetTestatorWills], ['query']),
    'request_random_will_identifier' : IDL.Func([], [IDL.Nat32], []),
    'set_icrc_canister_id' : IDL.Func([IDL.Text], [IDL.Text], []),
    'update_user_details' : IDL.Func(
        [userDetailsArgs],
        [UpdateUserDetails],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
