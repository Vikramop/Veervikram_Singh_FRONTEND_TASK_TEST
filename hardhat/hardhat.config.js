require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const { ETHERSCAN_API_KEY, PRIVATE_KEY, SEPOLIA_RPC_URL } = process.env;

module.exports = {
  solidity: '0.8.20',
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
