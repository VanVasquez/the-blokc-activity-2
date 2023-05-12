const { expect } = require('chai');
const { ethers, network } = require('hardhat');
const { developmentChains } = require('../helper.hardhat.config');

!developmentChains.includes(network.name)
  ? describe.skip
  : describe('PaymentContract', () => {
      let paymentContract;
      let owner, nonOwner;
      const projectCost = 2;
      const depositAmount = 5;

      beforeEach(async () => {
        const PaymentContract = await ethers.getContractFactory('PaymentContract');
        [owner, nonOwner] = await ethers.getSigners();
        paymentContract = await PaymentContract.deploy(projectCost);
        await paymentContract.deployed();
      });

      it('should deposit funds', async () => {
        await paymentContract.deposit({ value: depositAmount });
        const balance = await paymentContract.getBalance();
        expect(balance).to.equal(depositAmount);
      });

      it('should have the expected cost', async () => {
        await paymentContract.deposit({ value: projectCost });
        const response = await paymentContract.getProjectCost();
        expect(response).to.equal(projectCost);
      });

      it('should make a payment', async () => {
        await paymentContract.deposit({ value: projectCost });
        await paymentContract.connect(owner).makePayment();
        const balance = await paymentContract.getBalance();
        expect(Number(balance)).to.be.greaterThanOrEqual(projectCost);
      });

      it('should not allow non-owner to make a payment', async () => {
        await paymentContract.deposit({ value: projectCost });
        await expect(paymentContract.connect(nonOwner).makePayment()).to.be.revertedWith(
          'PaymentContract__NotOwner'
        );
      });

      it('should not allow payment if insufficient funds', async () => {
        await paymentContract.deposit({ value: 1 });
        await expect(paymentContract.connect(owner).makePayment()).to.be.revertedWith(
          'PaymentContract__NotEnoughEth'
        );
      });

      it('should not allow duplicate payment', async () => {
        await paymentContract.deposit({ value: projectCost });
        await paymentContract.connect(owner).makePayment();
        await expect(paymentContract.connect(owner).makePayment()).to.be.revertedWith(
          'PaymentContract__PaymentAlreadyMade'
        );
      });
      ``;
    });
