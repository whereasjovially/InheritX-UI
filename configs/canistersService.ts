import { _SERVICE as _CKBTC } from "@/declarations/ckbtc/ckbtc";
import { _SERVICE as _ICRC } from "@/declarations/icrc";
import { _SERVICE as _PROVIDERS } from "@/declarations/providers";
import { _SERVICE as _WILL } from "@/declarations/will";
import { _SERVICE as _ICP } from "@/declarations/icp/icp";
import { ActorSubclass, Identity } from "@dfinity/agent";

type CKBTC = ActorSubclass<_CKBTC>;
type ICP = ActorSubclass<_ICP>;
type ICRC = ActorSubclass<_ICRC>;
type PROVIDERS = ActorSubclass<_PROVIDERS>;
type WILL = ActorSubclass<_WILL>;

export type {
  // services
  _CKBTC,
  _ICP,
  _ICRC,
  _PROVIDERS,
  _WILL,
};

export type { CKBTC, ICP, ICRC, PROVIDERS, WILL };

// export // services
// ActorSubclass<_CKBTC>,
// ActorSubclass<_ICP>,
// ActorSubclass<_ICRC>,
// ActorSubclass<_PROVIDERS>,
// ActorSubclass<_WILL>,
//  type {};
