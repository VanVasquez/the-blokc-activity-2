const { ethers, network, deployments } = require('hardhat');
const fs = require('fs');

const FRONTEND_ADDRESS_FILE = '../paymentui/constants/contractAddress.json';
const FRONTEND_ABI_FILE = '../paymentui/constants/abi.json';

module.exports = async () => {
  if (process.env.UPDATE_FRONTEND) {
    updateContractAddresses();
    updateAbi();
  }
};

const updateAbi = async () => {
  const paymentContract = await ethers.getContractFactory('PaymentContract');
  fs.writeFileSync(
    FRONTEND_ABI_FILE,
    paymentContract.interface.format(ethers.utils.FormatTypes.json)
  );
};

const updateContractAddresses = async () => {
  const { PaymentContract } = await deployments.all();
  console.log(PaymentContract.address);
  const chainId = network.config.chainId;
  const currentAddress = JSON.parse(fs.readFileSync(FRONTEND_ADDRESS_FILE, 'utf8'));
  const paymentContractAddress = PaymentContract.address;
  if (chainId in currentAddress) {
    if (!currentAddress[chainId].includes(paymentContractAddress)) {
      currentAddress[chainId].push(paymentContractAddress);
    }
  }
  {
    currentAddress[chainId] = [paymentContractAddress];
  }
  fs.writeFileSync(FRONTEND_ADDRESS_FILE, JSON.stringify(currentAddress));
};

module.exports.tags = ['all', 'frontend'];
