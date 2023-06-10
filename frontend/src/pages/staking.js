import { useState } from 'react';
import { stake, claimReward } from '../utils/web3/stake';

const Staker = () => {
  const [amount, setAmount] = useState('');

  const amountChange = (e) => {
    setAmount(e.target.value);
  };

  const tempstake = async () => {
    await stake(amount);
  };

  const tempclaimReward = async () => {
    await claimReward();
  };


  return (
    <section className="w-full pt-24 md:pt-0 md:h-screen relative flex flex-row justify-center items-center">
      <div className="block md:flex container w-full items-center justify-center">
        <div className="w-full md:w-5/12 overflow-hidden shadow-2xl border-2 border-gray-100 rounded-xl mb-5">
          <div className="p-5">
            <div className="border-b w-full">
              <h1 className="text-xl font-bold text-center pb-2">Stake</h1>
            </div>
            <p className="pt-5">Amount of Stake</p>
            <input
              type="text"
              className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0"
              required
              onChange={(e) => amountChange(e)}
            />
            <button
              onClick={tempstake}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg align-center w-full mt-5"
            >
              Stake
            </button>
            <button
              onClick={tempclaimReward}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg align-center w-full mt-5"
            >
              Claim Rewards
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Staker;
