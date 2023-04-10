# BSC DAO

# Overview

An easy-to-understand tutorial for newbies to develop On-Chain DAO on BNB Smart Chain.

# What You Willl Learn

1. Set up a On-Chain DAO Dapps using BSC Truffle box
2. Deploying the DAO contract to Binance Smart Chain
3. Developing the frontend
4. Integrating the contract with the frontend
5. Testing the proposal and voting
6. Launching the DAO

# Technology Stack

- Node v16.19.1
- NPM v8.19.3
- Nextjs
- Truffle versions
    - Truffle v5.8.1 (core: 5.8.1)
    - Ganache
    - Solidity
    - Web3.js v1.6.1

# Setup

- **Clone the repository** `gh repo clone [https://github.com/bnb-chain/bnb-chain-tutorial](https://github.com/bnb-chain/bnb-chain-tutorial)`
- **Change the current directory** `cd 05-Hello World Full Stack dApp on BSC`
- **Install all the dependencies** `npm install`
- Create a `.secret` file with the secret phrase of MetaMask.
- **Compile Smart Contracts** `truffle compile`
- **Migrate Smart Contracts** `truffle migrate --reset --network bscTestnet`
- **To run the frontend first run** `cd client`
- **Install all the dependencies** `npm install`
- **Create build** `npm run build`
- **Run the application** `npm run dev`

# Available Scripts

```bash
Compile:              truffle compile
Migrate:              truffle migrate
Test contracts:       truffle test
Test dapp:            cd client && npm test
Run dev server:       cd client && npm run start
Build for production: cd client && npm run buildNextJS:
```

# Structure

```bash
NFT Mint.
|   .env
|   .gitattributes
|   LICENSE
|   package-lock.json
|   package.json
|   README.md
|   truffle-config.js
|   yarn.lock
|            
+---client
|   \---app
|       \---components
|               CreateProposal.jsx \\ The component for creating the proposal
|               ViewProposal.jsx \\ The component for viewing the proposal
|   \---utils \\ all utilities
|       \---contracts       
|               DAOProposal.json \\ NFTCollection.sol's abi
|       |---index.js \\ utilities functions
|.  \---page
|.      |---index.js \\ main page for the mint
|
+---contracts
|       Proposal.sol
|       
+---migrations
|       1_deploy_contracts.js
|                    
+---test
|       mynftTest.js       
|
```

# How it Works

## Smart contract

- Make sure you have MetaMask installed and logged in on your browser.
- Make sure that your MetaMask wallet is correctly configured to connect to BSC Testnet. Refer to this [guide](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain) for details.
    - For testnet development
        - Create a file named `.secret`, save your MetaMask Secret Phrase in this file.
    - For local environement
        - Run the command `ganache`, choose one of the private key shown in the command line to `.secret` file
- Run the command `truffle compile` to compile the smart contracts.
- Run the command `truffle migrate --reset --network bscTestnet` to deploy the contract on the BSC Testnet. Or Run the command `truffle migrate` for local environment.

## Frontend

- Run the command `cd client` to move to the frontend folder
- Create a `.env` include the following variables
    - If you want to use local environment
        - `MODE=”development”`
        - `LOCAL_NODE=“ws://localhost:8545”`
    - Add `CONTRACTADDRESS=<your contract address>`
- Run the command `npm install` to install all the dependencies
- Run the command `npm run dev` to start the server
- Now you are all set mint your first NFT on **BSC testnet** or **local environment**

## Running the application

- The default deployment for NextJs is [`http://localhost:3000/`](http://localhost:3000/) Open a browser and go to this URL
- Make sure that your MetaMask wallet is correctly installed and configured to connect to BSC Testnet. Refer to this [guide](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain) for details.
- Select your desired account of MetaMask that has BNB Test tokens to perform transactions.
- To get test tokens use the [BNB Smart Chain Faucet](https://testnet.binance.org/faucet-smart).
- Click the ******************************Connect wallet****************************** button to connect the wallet first.
- Click the **Create proposal** button to create a proposal
- Click the **View all Proposals** button to view the proposal
- Confirm the transaction when MetaMask notification pops up.

# Unit Test of Smart Contracts

- Set up the ganache [localhost](http://localhost) by starting `ganache` in command line
    - If you have not installed the Ganache, please use the following command to install `npm install ganache --global`
- Replace the `mnemonic` with a ganache private key.
- To run the test case, you can use `truffle test`

# Unit Test Coverage

```
Contract: ProposalContract
  init
    ✔ should set proposal count to 0
  createProposal
    ✔ should create a proposal (54ms)
  vote
    ✔ should vote for a proposal, yes (64ms)
    ✔ should vote for a proposal, no (70ms)
    ✔ should not vote for non-exist proposal (216ms)
    ✔ should not allow to vote twice (41ms)
  execute proposal
    ✔ should not execute proposal if not enough votes
    ✔ should execute proposal if enough votes (149ms)
    ✔ only owner can execute proposal
    ✔ should not execute proposal if already executed

10 passing (1s)
```

# Contact

For more inquiries and conversations, feel free to contact us at our [Discord Channel](https://discord.com/channels/789402563035660308/912296662834241597)Give feedback