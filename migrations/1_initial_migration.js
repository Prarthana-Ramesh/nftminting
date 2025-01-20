const Migrations = artifacts.require("Migrations");

module.exports = async function (deployer) {
  console.log("Starting deployment...");
  try {
    await deployer.deploy(Migrations);
    console.log("Migrations deployed successfully!");
  } catch (error) {
    console.error("Error deploying Migrations:", error);
  }
};
