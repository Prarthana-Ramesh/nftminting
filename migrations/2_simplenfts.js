const SimpleNFT = artifacts.require("SimpleNFT");

module.exports = async function (deployer) {
  console.log("Starting deployment...");
  try {
    await deployer.deploy(SimpleNFT);
    console.log("Migrations deployed successfully!");
  } catch (error) {
    console.error("Error deploying Migrations:", error);
  }
};
