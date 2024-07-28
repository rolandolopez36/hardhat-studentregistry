// Import the 'network' object from hardhat, which contains information about the current network
const { network } = require("hardhat");

// Import 'developmentChains' from the hardhat-helper config, which lists the development chains
const { developmentChains } = require("../helper-hardhat-config");

// Import the 'verify' function from the utils/verify file to verify contracts on Etherscan
const { verify } = require("../utils/verify");

// Load environment variables from the .env file
require("dotenv").config();

// Export an asynchronous function to deploy the contract
module.exports = async ({ getNamedAccounts, deployments }) => {
  // Get the 'deploy' and 'log' functions from the 'deployments' object
  const { deploy, log } = deployments;

  // Get the 'deployer' account from the named accounts
  const { deployer } = await getNamedAccounts();

  // Get the 'chainId' of the current network from the network config
  const chainId = network.config.chainId;

  // Print a separator line in the console for clarity
  log("----------------------------------------------------");

  // Print a message indicating that the contract is being deployed and waiting for confirmations
  log("Deploying StudentRegistry and waiting for confirmations...");

  // Deploy the 'StudentRegistry' contract
  const studentRegistry = await deploy("StudentRegistry", {
    from: deployer, // Account from which the contract is deployed
    args: [], // Constructor arguments for the contract (empty in this case)
    log: true, // Enable logs for this deployment
    waitConfirmations: network.config.blockConfirmations || 1, // Number of block confirmations to wait
  });

  // Print the address of the deployed contract in the console
  log(`StudentRegistry deployed at ${studentRegistry.address}`);

  // Check if the network is not a development chain and if the Etherscan API key is provided
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    // Verify the contract on Etherscan
    await verify(studentRegistry.address, []);
  }
};

// Module tags to identify and group different deployment scripts
module.exports.tags = ["all", "studentRegistry"];
