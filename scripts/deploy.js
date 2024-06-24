const hre = require("hardhat");

async function main() {

  const RentalAgreement = await hre.ethers.getContractFactory("RentalAgreement");

  const tenantAddress = "0xAB62b4be9Df6993e38AE06B21cc6068451f45E5C"; 
  const rentAmount = ethers.parseEther(".001"); 
  const dueDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; 
  const lateFee = ethers.parseEther("0.0001");
  // Deploy the contract
  const rentalAgreement = await RentalAgreement.deploy(tenantAddress, rentAmount, dueDate, lateFee);

  // Wait for deployment to finish
  await rentalAgreement.waitForDeployment();

  const address = await rentalAgreement.getAddress();
  console.log(`Contract Address: ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
