#!/bin/bash


if [[ $# -lt 1 ]]; then
    echo "Argument 'local' or 'dev' expected, but found None. Continue with dev ..."
fi

ENV=$1

# Cleaning up folders
bash scripts/cleanup.sh

# copying local canister ids to canister_ids.json
cp -r ids/canister_ids_dev.json ids/canister_ids.json

# getting canisterIds
willCanisterId=$(jq '.will.local' ids/canister_ids.json)
providersCanisterId=$(jq '.providers.local' ids/canister_ids.json)
icrcCanisterId=$(jq '.icrc.local' ids/canister_ids.json)
btcCanisterId=$(jq '.btc.local' ids/canister_ids.json)
icpledgerCanisterId=$(jq '.icp_ledger.local' ids/canister_ids.json)
ckbtcledgerCanisterId=$(jq '.ckbtc_ledger.local' ids/canister_ids.json)

willVar="NEXT_PUBLIC_CANISTER_ID_WILL="$willCanisterId
providersVar="NEXT_PUBLIC_CANISTER_ID_PROVIDERS="$providersCanisterId
icrcVar="NEXT_PUBLIC_CANISTER_ID_ICRC="$icrcCanisterId
btcVar="NEXT_PUBLIC_CANISTER_ID_BTC="$btcCanisterId
icpVar="NEXT_PUBLIC_CANISTER_ID_ICP_LEDGER="$icpledgerCanisterId
ckBtcVar="NEXT_PUBLIC_CANISTER_ID_CKBTC_LEDGER="$ckbtcledgerCanisterId

# ic-host

icHost="http://localhost:8080"

icHostVar="NEXT_PUBLIC_IC_HOST="$icHost

# Assigning Variables to Environment Variable
echo $icHostVar >.env

echo $willVar >>.env
echo $providersVar >>.env
echo $icrcVar >>.env
echo $btcVar >>.env
echo $icpVar >>.env
echo $ckBtcVar >>.env

# DFX_NETWORK=local

# checking ENV variable passed to deploy
if [[ $ENV == "local" ]]; then

    echo "Switching the deployment to local replica"
    dfx canister uninstall-code avqkn-guaaa-aaaaa-qaaea-cai
    dfx canister stop avqkn-guaaa-aaaaa-qaaea-cai
    dfx canister delete avqkn-guaaa-aaaaa-qaaea-cai
    # yarn build
    dfx deploy inheritX --specified-id avqkn-guaaa-aaaaa-qaaea-cai

    exit 0
fi

# if ENV is dev or not provided (using as default local deployment)
echo "Switching the deployment to node dev"
yarn run dev
