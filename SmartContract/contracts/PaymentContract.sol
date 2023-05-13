// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

error PaymentContract__NotOwner();
error PaymentContract__PaymentGraterThan0();
error PaymentContract__NotEnoughEth();
error PaymentContract__PaymentAlreadyMade();

contract PaymentContract {
  address private immutable i_projectOwner;
  uint256 private projectCost;
  uint256 private balance;
  bool private isPaid;

  event PaymentReceived(address indexed _from, uint256 _amount);

  receive() external payable {}

  fallback() external payable {}

  constructor(uint256 _projectCost) {
    i_projectOwner = msg.sender;
    projectCost = _projectCost;
    balance = 0;
    isPaid = false;
  }

  modifier onlyOwner() {
    if (msg.sender != i_projectOwner) revert PaymentContract__NotOwner();
    _;
  }

  function deposit() public payable {
    if (!(msg.value > 0)) revert PaymentContract__PaymentGraterThan0();
    emit PaymentReceived(msg.sender, msg.value);
    balance += msg.value;
  }

  function makePayment() public onlyOwner {
    if (!(balance >= projectCost)) revert PaymentContract__NotEnoughEth();
    if (isPaid) revert PaymentContract__PaymentAlreadyMade();
    payable(i_projectOwner).transfer(balance);
    isPaid = true;
  }

  function getProjectCost() public view returns (uint256) {
    return projectCost;
  }

  function getBalance() public view returns (uint256) {
    return balance;
  }

  function checkIfPaid() public view returns (bool) {
    return isPaid;
  }
}
