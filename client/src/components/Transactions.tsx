import React, { useContext } from 'react';
import dummyData from '../utils/dummyData';
import { TransactionContext, TransactionType } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';
import useFetch from '../hooks/useFetch';

type TransactionCardProps = TransactionType;

const TransactionCard = (props: TransactionCardProps) => {
  const gifUrl = useFetch(props.keyword?? '');

  return (
    <div className={'bg-gray-900 m-4 flex flex-1 flex-col p-3 rounded-md hover:shadow-2xl ' +
      '2xl:min-w-[450px] ' +
      '2xl:max-w-[500px] ' +
      'sm:min-w-[270px] ' +
      'sm:max-w-[300px]'}>
      <div className={'flex flex-col items-center w-full mt-3'}>
        <div className={'w-full mb-6 p-2'}>
          <a href={'https://goerli.etherscan.io/address/' + props.addressFrom} target={'_blank'} rel={'noopener noreferrer'}>
            <p className={'text-white text-base hover:underline duration-500 ease-in-out'}>
              From: {shortenAddress(props.addressFrom)}
            </p>
          </a>
          <a href={'https://ropsten.etherscan.io/address/' + props.addressTo} target={'_blank'} rel={'noopener noreferrer'}>
            <p className={'text-white text-base hover:underline'}>
              To: {shortenAddress(props.addressTo)}
            </p>
          </a>
          <p className={'text-white text-base'}>
            Amount: {props.amount} ETH
          </p>
          {props.message && (
            <>
              <br />
              <p className={'text-white text-base'}>
                Message: {props.message}
              </p>
            </>
          )}
        </div>

        <img src={gifUrl || props?.url} alt={'gif'} className={'w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover'} />

        <div className={'bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl'}>
          <p className={'text-indigo-700 font-bold'}>
            {props.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);

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
          {transactions.reverse().map((transaction, index) => (
            <TransactionCard key={index} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;