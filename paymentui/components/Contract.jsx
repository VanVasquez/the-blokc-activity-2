import { ABI, CONTRACT_ADDRESS } from '@/constants';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';

const Contract = () => {
  const [isPaid, setIsPaid] = useState();
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const paymentContractAddress = chainId in CONTRACT_ADDRESS ? CONTRACT_ADDRESS[chainId][0] : null;
  const [projectCost, setProjectCost] = useState('0');
  const [currentBalance, setCurrentBalance] = useState('0');
  const [value, setValue] = useState('0');

  const { runContractFunction: deposit } = useWeb3Contract({
    abi: ABI,
    contractAddress: paymentContractAddress,
    functionName: 'deposit',
    params: {},
    msgValue: ethers.utils.parseEther(value.toString() || '0').toString(),
  });

  const { runContractFunction: checkIfPaid } = useWeb3Contract({
    abi: ABI,
    contractAddress: paymentContractAddress,
    functionName: 'checkIfPaid',
    params: {},
    msgValue: '',
  });

  const { runContractFunction: getProjectCost } = useWeb3Contract({
    abi: ABI,
    contractAddress: paymentContractAddress,
    functionName: 'getProjectCost',
    params: {},
    msgValue: '',
  });

  const { runContractFunction: getBalance } = useWeb3Contract({
    abi: ABI,
    contractAddress: paymentContractAddress,
    functionName: 'getBalance',
    params: {},
    msgValue: '',
  });

  const { runContractFunction: makePayment } = useWeb3Contract({
    abi: ABI,
    contractAddress: paymentContractAddress,
    functionName: 'makePayment',
    params: {},
    msgValue: '',
  });

  const handleOnDeposit = async () => {
    await deposit({
      onComplete: handleSuccess,
      onError: (err) => console.log(err),
    });

    const balanceResponse = (await getBalance({ onError: (err) => console.log(err) })).toString();
    setCurrentBalance(balanceResponse);
  };

  const handleOnMakePayment = async () => {
    await makePayment({
      onComplete: handleSuccess,
      onError: (err) => console.log(err),
    });
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      if (!paymentContractAddress) return;
      const updateUI = async () => {
        const checkIfPaidResponse = await checkIfPaid({ onError: (err) => console.log(err) });

        setIsPaid(checkIfPaidResponse);
        const projectResponse = (
          await getProjectCost({ onError: (err) => console.log(err) })
        ).toString();

        setProjectCost(projectResponse);

        const balanceResponse = (
          await getBalance({ onError: (err) => console.log(err) })
        ).toString();
        setCurrentBalance(balanceResponse);
      };

      updateUI();
    }
  }, [isWeb3Enabled, handleOnDeposit, handleOnMakePayment]);

  return (
    <div>
      <div>Project Cost: {ethers.utils.formatUnits(projectCost, 'ether')} eth</div>
      <div>Current Balance: {ethers.utils.formatUnits(currentBalance, 'ether')} eth</div>
      <br />
      {paymentContractAddress ? (
        isPaid ? (
          <div>Project already paid</div>
        ) : (
          <>
            <label htmlFor="depositBalance">Enter Value</label>
            <br />
            <input
              id="depositBalance"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={handleOnDeposit}>DEPOSIT</button>
            <button onClick={handleOnMakePayment}>Make Payment</button>
          </>
        )
      ) : (
        <div>No Address detected</div>
      )}
    </div>
  );
};

export default Contract;
