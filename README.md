# NFT Marketplace Project

This repository contains the implementation of an NFT Marketplace, consisting of a Solidity smart contract, a React frontend, and a Sequelize ORM and Postgresql database as backend. The project aims to provide users with the ability to mint new NFTs, list NFTs for sale, purchase listed NFTs using Ether, and view their owned NFTs. The smart contract has been deployed on the Polygon Mumbai testnet, with an additional implementation using Biconomy for gasless transactions in the `test-biconomy` branch.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Smart Contract](#smart-contract)
3. [Frontend](#frontend)
4. [Backend](#backend)
5. [Deployment Addresses](#deployment-addresses)
7. [Screenshots](#screenshots)
8. [Demo Video](#demo-video)
9. [Contributors](#contributors)
10. [License](#license)

## Project Overview

The NFT Marketplace project consists of three main components: the Solidity smart contract, the React frontend, and the Sequelize ORM backend. Users can mint new NFTs, list them for sale, purchase listed NFTs, and manage their owned NFTs through the user-friendly frontend interface. The smart contract has been deployed on the Polygon Mumbai testnet, with an alternative implementation in the `test-biconomy` branch using Biconomy for gasless transactions.

## Smart Contract

The smart contract `NFTMarketplace.sol` contains the core logic for minting NFTs, listing them for sale, purchasing NFTs, and querying information about NFTs and user ownership. It provides the foundation for the NFT Marketplace's functionality.

## Frontend

The React frontend located in the `frontend` folder allows users to interact with the NFT Marketplace. They can connect their MetaMask wallet, mint new NFTs, list NFTs for sale, and purchase listed NFTs. The frontend provides a user-friendly interface for seamless interactions.

## Backend

The Sequelize ORM backend, found in the `backend` folder, manages the persistence of user and NFT data. It is responsible for handling database operations related to user authentication, NFT ownership, and transaction history.

## Deployment Addresses

Main Branch (Without Biconomy):
Smart Contract Address: 0xed57a0AC449C040C43DA24455fA9d4CA92569000

Test-Biconomy Branch (With Biconomy):
Smart Contract Address: 0x8bD22C2981Cd0Ce46Dd1b3Cbf1EEFd8212b95BaD

## Usage

To use the NFT Marketplace:

1. Clone this repository.
2. Set up and deploy the smart contract using Hardhat (for the main branch) or Biconomy (for the `test-biconomy` branch).
3. Run the backend using Sequelize and PostgreSQL.
4. Start the React frontend to interact with the NFT Marketplace.

## Screenshots

![3](https://github.com/Vedant-Soni/NFT-Marketplace-Dapp/assets/64590530/a1f9d7b4-dbd1-4ad4-b59e-5d5767e7e9c4)
![1](https://github.com/Vedant-Soni/NFT-Marketplace-Dapp/assets/64590530/bf332841-97a5-4f84-aead-5e21c4b8d8b3)
![5](https://github.com/Vedant-Soni/NFT-Marketplace-Dapp/assets/64590530/0c0bba20-c907-4b15-bd84-b0bf2daa0e48)
![4](https://github.com/Vedant-Soni/NFT-Marketplace-Dapp/assets/64590530/d41fd305-7ce9-46d0-a1fd-34176d54a323)


## Demo Video

[https://www.loom.com/share/d6826ec45e53424c92c7342cd6bc03ee?sid=7c884822-d0e3-4e50-84ea-c177aac5a302](#)

## Contributors

- [Vedant Soni](https://github.com/Vedant-Soni)

## License

This project is licensed under the [MIT License](LICENSE).
