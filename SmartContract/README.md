# the-blokc-activity-2

1.  Create a simple smart contract either for utilizing cryptocurrency as a payment or NFT for your project.
2.  Make a repository of your activity and share it in your team channels

# About

Our project is Mediblokc, it is an EHR system that allows healthcare professionals to access, manage, and share patient's health informations securely. We plan to add a smart contract for payment method, our plan is to save medical records to patients profile to make this accessbile, this also includes security like data encryptions and access tokens. but first the patient should make payment first so that he/she can own the record.

# PaymentContract

This payment contract will let the Doctor to add a contract with a project cost. so that the non-owner (patient) can payup

```bash
$ hh coverage

Version
=======
> solidity-coverage: v0.7.22

Instrumenting for coverage...
=============================

> PaymentContract.sol

Compilation:
============

Compiled 2 Solidity files successfully

Network Info
============
> HardhatEVM: v2.9.3
> network:    hardhat



  PaymentContract
    ✔ should deposit funds (55ms)
    ✔ should have the expected cost
    ✔ should make a payment (65ms)
    ✔ should not allow non-owner to make a payment (137ms)
    ✔ should not allow payment if insufficient funds
    ✔ should not allow duplicate payment (40ms)


  6 passing (1s)

----------------------|----------|----------|----------|----------|----------------|
File                  |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------------------|----------|----------|----------|----------|----------------|
 contracts/           |      100 |     87.5 |    85.71 |      100 |                |
  PaymentContract.sol |      100 |     87.5 |    85.71 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|
All files             |      100 |     87.5 |    85.71 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|

> Istanbul reports written to ./coverage/ and ./coverage.json
```

deployment:

```bash
$ hh deploy
Nothing to compile
=================================================================================
Deploying PaymentContract.sol
deploying "PaymentContract" (tx: 0xbb6765197f95f419cb265419a2b89e3803c0fc706771616c6dbf1fc7e692ffd4)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 293751 gas
=================================================================================
```

our contract was deployed correctly and passed the tests that we created. we were able to create a transaction correctly, now we also deployed it in network SEPOLIA

and here are the following results:

```
$ hh deploy --network sepolia
Compiled 2 Solidity files successfully
=================================================================================
Deploying PaymentContract.sol
deploying "PaymentContract" (tx: 0x3ce9946a2c77ff5551c245a87205a6a0e114a064b581765c8f9c93f5cc16d514)...: deployed at 0xb676eE92D2Ee85A18C73B8B35277b6a15d0E43cC with 293833 gas
VERIFRING CONTRACT
Verifying contract...
Nothing to compile
Successfully submitted source code for contract
contracts/PaymentContract.sol:PaymentContract at 0xb676eE92D2Ee85A18C73B8B35277b6a15d0E43cC
for verification on the block explorer. Waiting for verification result...

Successfully verified contract PaymentContract on Etherscan.
https://sepolia.etherscan.io/address/0xb676eE92D2Ee85A18C73B8B35277b6a15d0E43cC#code
```
