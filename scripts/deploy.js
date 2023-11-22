// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import { ethers } from "ethers"; // Importing ethers object correctly

async function deployLockContract() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/");
  const signer = provider.getSigner(); // Get the signer for transactions

  // Define your product-related data or remove the placeholder Product
  const product = {
    productId: 1,
    name: "Sample Product",
    price: ethers.utils.parseEther("1"), // Example price in Ether
    quantity: 10,
  };

  // Deploy the contract using the EcommerceStock ABI and bytecode
  const EcommerceStock = await ethers.getContractFactory("EcommerceStock");
  const lock = await EcommerceStock.deploy(product); // Passing product data to the constructor

  // Wait for the contract deployment transaction to be mined
  await lock.deployed();

  // Log deployment details
  console.log(
    `Lock with ${ethers.utils.formatEther(product.price)} ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

deployLockContract().catch((error) => console.error(error));
