
const hre = require("hardhat");

async function main() {
  
  const LionNFT = await hre.ethers.getContractFactory("LionNFT");
  const lionnft = await LionNFT.deploy(["0x3A098505103CcF5e5Cc21B60DF7aaD9DaF7a6241"], [100], "ipfs://bafybeid2we7m4rff2vrxwhb3ofdbb3zhsqgelhrzpjyy34ignxc3ryjlcm/");

  await lionnft.deployed();

  console.log("LionNFT deployed to:", lionnft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });