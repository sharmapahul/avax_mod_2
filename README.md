# Rental Agreement DApp

This project is a decentralized application (DApp) built using React and ethers.js for managing rental agreements on the Ethereum blockchain.

## Features

- Connect to MetaMask wallet
- Display rental agreement details (rent amount, due date, late fee, rent payment status)
- Pay rent
- Pay rent with a late fee if applicable

## Prerequisites

- Node.js
- MetaMask extension installed in your browser

## Installation

1. Clone the repository:

```sh
git clone https://github.com/your-repo/rental-agreement-dapp.git
cd rental-agreement-dapp
```

2. Install dependencies:

```sh
npm install
```

3. Set up your Ethereum smart contract:
   
   Ensure you have the smart contract deployed on the Ethereum blockchain. Update `contractAddress.js` with the deployed contract's address and `contractABI.json` with the contract's ABI.

4. Run the application:

```sh
npm start
```

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Connect your MetaMask wallet by clicking on the "Connect Wallet" button.
3. View the rental agreement details including rent amount, due date, and late fee.
4. Pay rent by clicking the "Pay Rent" button.
5. If the rent is overdue, pay rent with a late fee by clicking the "Pay Rent with Late Fee" button.

## Code Overview

The main component is `RentalAgreement`. Here is an overview of its functionalities:

- **State Variables**: Manages the state for account, provider, contract, rent amount, due date, late fee, and rent payment status.
- **useEffect Hook**: Initializes the DApp by connecting to the Ethereum provider and fetching the contract details.
- **connectWallet**: Connects to the user's MetaMask wallet and retrieves the user's account address.
- **payRent**: Interacts with the smart contract to pay the rent.
- **payRentWithLateFee**: Interacts with the smart contract to pay the rent along with a late fee.

## Important Files

- `src/components/RentalAgreement.js`: Main component for the rental agreement DApp.
- `src/contractABI.json`: ABI of the deployed smart contract.
- `src/contractAddress.js`: Address of the deployed smart contract.

## Smart Contract

Make sure the smart contract includes the following functions:

- `rentAmount()`: Returns the rent amount.
- `dueDate()`: Returns the due date for the rent.
- `lateFee()`: Returns the late fee amount.
- `rentPaid()`: Returns whether the rent has been paid.
- `payRent()`: Allows the tenant to pay the rent.
- `payRentWithLateFee()`: Allows the tenant to pay the rent along with the late fee.

## Troubleshooting

- Ensure MetaMask is installed and unlocked.
- Make sure you are connected to the correct Ethereum network.
- Verify that the contract address and ABI in `contractAddress.js` and `contractABI.json` match those of your deployed contract.

## License

This project is licensed under the MIT License.
