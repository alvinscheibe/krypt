import { createContext } from 'react';
import { ethers } from 'ethers';

export const TransactionContext = createContext('');

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
}