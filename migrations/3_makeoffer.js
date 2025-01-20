const makeoffer = artifacts.require("makeoffer");

module.exports = async function (deployer) {
  console.log("Starting deployment...");
  try {
    await deployer.deploy(makeoffer);
    console.log("Migrations deployed successfully!");
  } catch (error) {
    console.error("Error deploying Migrations:", error);
  }
};
