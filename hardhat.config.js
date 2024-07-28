require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("dotenv").config();
require("solidity-coverage");

const SEPOLIA_RPC_URL =
  process.env.SEPOLIA_RPC_URL ||
  "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "your-private-key";
const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || "your-etherscan-api-key";
// const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "your-coinmarketcap-api-key";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://sepolia.etherscan.io",
        },
      },
    ],
  },
  solidity: {
    compilers: [
      {
        version: "0.8.4",
      },
    ],
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // por defecto tomará la primera cuenta como deployer
      1: 0, // similarmente en mainnet tomará la primera cuenta como deployer
    },
  },
  mocha: {
    timeout: 500000,
  },
};
