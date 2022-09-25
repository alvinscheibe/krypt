import React, { useContext } from 'react';
import dummyData from '../utils/dummyData';
import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';

type TransactionCardProps = {id: number, url: string, message: string, timestamp: string, addressFrom: string, amount: string, addressTo: string};

const TransactionCard = (props: TransactionCardProps) => {
  return (
    <div className={'bg-gray-900 m-4 flex flex-1 flex-col p-3 rounded-md hover:shadow-2xl ' +
      '2xl:min-w-[450px] ' +
      '2xl:max-w-[500px] ' +
      'sm:min-w-[270px] ' +
      'sm:max-w-[300px]'}>
      <div className={'flex flex-col items-center w-full mt-3'}>
        <div className={'w-full mb-6 p-2'}>
          <a href={'https://ropsten.etherscan.io/address/' + props.addressFrom} target={'_blank'} rel={'noopener noreferrer'}>
            <p className={'text-white text-base'}>
              From: {shortenAddress(props.addressFrom)}
            </p>
          </a>
          <a href={'https://ropsten.etherscan.io/address/' + props.addressTo} target={'_blank'} rel={'noopener noreferrer'}>
            <p className={'text-white text-base'}>
              To: {shortenAddress(props.addressTo)}
            </p>
          </a>
          <p className={'text-white text-base'}>
            Amount: {props.amount} ETH
          </p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount } = useContext(TransactionContext);

  return (
    <div className={'flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'}>
      <div className={'flex flex-col md:p-12 py-12 px-4'}>
        {currentAccount? (
          <h3 className={'text-white text-3xl text-center my-2'}>
            Latest transactions
          </h3>
        ) : (
          <h3 className={'text-white text-3xl text-center my-2'}>
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className={'flex flex-wrap justify-center items-center items-center mt-10'}>
          {dummyData.reverse().map((transaction, index) => (
            <TransactionCard key={index} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;