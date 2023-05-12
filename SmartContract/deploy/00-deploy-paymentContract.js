const { network, ethers } = require('hardhat');
const { developmentChains } = require('../helper.hardhat.config');
const verifiy = require('../utils/verifiy');

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { log, deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const projectCost = ethers.utils.parseEther('0.2');

  log('=================================================================================');
  log('Deploying PaymentContract.sol');
  const PaymentContract = await deploy('PaymentContract', {
    from: deployer,
    args: [projectCost],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log('VERIFRING CONTRACT');
    await verifiy(PaymentContract.address, [projectCost]);
  }
  log('=================================================================================');
};

module.exports.tags = ['all', 'paymentcontracts'];
