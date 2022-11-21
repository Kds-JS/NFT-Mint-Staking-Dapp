
const hre = require("hardhat");

async function main() {
  
  const LionStaking = await hre.ethers.getContractFactory("LionStaking");
  const lionstaking = await LionStaking.deploy('0x2f0AE90811f0367b388c3196dE9AcfB5f46ba9c5', '0xa9ABD93032E9f2e3E0177bf52aee4c1CC69B8Cec');

  await lionstaking.deployed();

  console.log("LionStaking deployed to:", lionstaking.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });