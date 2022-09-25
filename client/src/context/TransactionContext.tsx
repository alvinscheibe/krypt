import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../utils/constants';

interface TransactionContextProps {
  children: ReactNode;
}

type TransactionContextData = {
  connectWallet: () => {};
  currentAccount: string;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => void;
  sendTransaction: () => {};
  transactions: TransactionType[];
  isLoading: boolean;
};

type FormDataType = {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
}

type TransactionStruct = {
  receiver: string;
  sender: string;
  amount: {
    _hex: string;
  };
  keyword: string;
  message: string;
  timestamp: {
    _hex: string;
    toNumber: () => number;
  };
};

export type TransactionType = {
  addressTo: string;
  addressFrom: string;
  amount: number;
  keyword: string;
  message: string;
  timestamp: string;
  url?: string;
};

export const TransactionContext = createContext({} as TransactionContextData);

const { ethereum } = window;

const getEthereumContract = (): ethers.Contract => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  return  new ethers.Contract(contractAddress, contractAbi, signer);
}

export const TransactionProvider = ({ children }: TransactionContextProps) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({} as FormDataType);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setFormData((prevState) => ({
      ...prevState, [name]: event.target.value
    }));
  }

  const getAllTransactions = async () => {
    try {
      if (!ethereum)
        return alert('Please, install Metamask wallet');

      const transactionContract = getEthereumContract();
      const availableTransactions = await transactionContract.getAllTransactions();

      let structuredTransactions: TransactionType[] = [];
      availableTransactions.forEach((transaction: TransactionStruct) => {
        structuredTransactions.push({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        });
      })

      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object.');
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum)
        return alert('Please, install Metamask wallet');

      // @ts-ignore
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else
        console.log('No accounts found.')
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object.');
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();

      window.localStorage.setItem('transactionCount', transactionCount);
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object.');
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum)
        return alert('Please, install Metamask wallet');

      // @ts-ignore
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object.');
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum)
        return alert('Please, install Metamask wallet');

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      //@ts-ignore
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 Gwei,
          value: parsedAmount._hex
        }]
      });

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object.');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }}>
      {children}
    </TransactionContext.Provider>
  );
};