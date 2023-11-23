require('dotenv').config();
const { ethers } = require('hardhat');

async function main() {
  const { PRIVATE_KEY, PROVIDER_URL } = process.env;

  if (!PRIVATE_KEY || !PROVIDER_URL) {
    console.error("Please provide PRIVATE_KEY and PROVIDER_URL in your .env file");
    process.exit(1);
  }

  const [deployer] = await ethers.getSigners();

  console.log(`Deploying EcommerceStock to Sepolia test network using provider: ${PROVIDER_URL}`);

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
