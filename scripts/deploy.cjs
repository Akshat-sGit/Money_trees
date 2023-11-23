require('dotenv').config();
const { ethers } = require('hardhat');

async function main() {
  const providerUrl = process.env.PROVIDER_URL; // Replace with your provider URL or use a default one
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  const [deployer] = await ethers.getSigners();

  console.log('Deploying EcommerceStock to Sepolia test network...');
  
  const EcommerceStock = await ethers.getContractFactory('EcommerceStock');
  const ecommerceStock = await EcommerceStock.connect(provider).deploy();

  await ecommerceStock.deployed(); // Wait for the contract deployment to be confirmed

  console.log('EcommerceStock deployed to:', ecommerceStock.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
