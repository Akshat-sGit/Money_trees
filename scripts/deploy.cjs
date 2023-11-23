require('dotenv').config();
const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying EcommerceStock to Sepolia test network...');
  
  const EcommerceStock = await ethers.getContractFactory('EcommerceStock');
  const ecommerceStock = await EcommerceStock.deploy();

  await ecommerceStock.waitForDeployment();

  console.log('EcommerceStock deployed to:', ecommerceStock.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });