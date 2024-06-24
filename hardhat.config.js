require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config({ path: __dirname + "/.env" });

module.exports = {
  solidity: "0.8.20",
  sourcify: {
    enabled: true
  },
  etherscan: {
    apiKey: {
      fuji: "fuji", // apiKey is not required, just set a placeholder
    },
    customChains: [
      {
        network: "fuji",
        chainId: 43113,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://testnet.snowtrace.io"
        }
      }
    ]
  },
  networks: {
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      accounts: [process.env.PRIVATE_KEY]
    },
  },
};



// networks: {
//   fuji: {
//     url: 'https://api.avax-test.network/ext/bc/C/rpc',
//     accounts: [process.env.PRIVATE_KEY]
//   },
// },


// {
//   network: "fuji",
//   chainId: 43113,
//   urls: {
//     apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
//     browserURL: "https://c-chain.snowtrace.io"
//   }
// }

// etherscan: {
//   apiKey: {
//     snowtrace: "snowtrace", // apiKey is not required, just set a placeholder
//   },
//   customChains: [
//     {
//       network: "snowtrace",
//       chainId: 43114,
//       urls: {
//         apiURL: "https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan",
//         browserURL: "https://snowtrace.io"
//       }
//     }
//   ]
// },
// networks: {
//   snowtrace: {
//     url: 'https://api.avax.network/ext/bc/C/rpc',
//     accounts: [process.env.PRIVATE_KEY]
//   },
// },