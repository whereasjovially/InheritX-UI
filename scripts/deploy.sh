if [[ $# -lt 1 ]]; then
    echo "Argument 'local' or 'ic' expected, but found None. Continue with dev ..."
fi

ENV=$1

# checking ENV variable passed to deploy
if [[ $ENV == "local" ]]; then

    echo "Switching the deployment to local replica"

    bash scripts/pre_deploy_local.sh

    dfx deploy inheritX --specified-id 2222s-4iaaa-aaaaf-ax2uq-cai

    exit 0
fi

# checking ENV variable passed to deploy
if [[ $ENV == "ic" ]]; then

    echo "Switching the deployment to IC replica"

    bash scripts/pre_deploy_ic.sh

    dfx deploy --network ic inheritX

    exit 0
fi


# if ENV is dev or not provided (using as default node deployment)
echo "Switching the deployment to node dev"

bash scripts/pre_deploy_local.sh

yarn run dev
