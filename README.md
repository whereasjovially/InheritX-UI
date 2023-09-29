# InheritX-UI

## Introduction

<i>
InheritX is a blockchain-based application developed on Internet Computer (IC) that allows users to create a digital will and bequeath their assets to designated beneficiaries in the event of their death.
</i>

### NOTE

This repo contains Frontend Canister Code, for Backend Canisters code visit [InheritX](https://github.com/mzurs/InheritX)

## Prerequisites

1. `DFX_VERSION= 0.15.0-beta.6`
2. `AZLE_VERSION= 0.17.1`
3. `NodeJS_VERSION= 18.17.1`

## Setting Up and Running InheritX Locally

- <h3>Follow steps below</h3>

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start local replica

   ```bash
    dfx start --clean
   ```

3. Deploy Canisters (run the command in new terminal)

   ```bash
   dfx deploy inheritX --specified-id avqkn-guaaa-aaaaa-qaaea-cai
   ```
