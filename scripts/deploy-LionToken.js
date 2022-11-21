
const hre = require("hardhat");

async function main() {
  
  const LionToken = await hre.ethers.getContractFactory("LionToken");
  const liontoken = await LionToken.deploy();

  await liontoken.deployed();

  console.log("LionToken deployed to:", liontoken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });