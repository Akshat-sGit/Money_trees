require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: { 
    sepolia: { 
      url: process.env.PROVIDER_URL, 
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
