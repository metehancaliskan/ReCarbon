import { useEffect, useState } from 'react';
import Swap from '../components/Swap';
import Liquidity from '../components/Liquidity';
import { ethers } from "ethers";



function Exchange() {
  const [activeTabRC, setActiveTabRC] = useState('swapRC');
  const [activeTabCBRN, setActiveTabCBRN] = useState('swapCBRN');


const provider = new ethers.providers.JsonRpcProvider("https://rpc.testnet.mantle.xyz/");

const DexAddress = "0x207ce87A6E2cbcc082b65D6Da74f65C2C69c416C";
const totalSupplyabi = [
  "function totalSupply() view returns (uint256)"
];

async function totalSupply() {
	const contract = new ethers.Contract(DexAddress, totalSupplyabi,provider);
	let result = await contract.functions.totalSupply();
  result = result[0].toNumber();
	console.log("result", result);
}

const tokenRCAddressabi = [
  "function tokenRCAddress() view returns (address)"
];

async function tokenRCAddress() {
	const contract = new ethers.Contract(DexAddress, tokenRCAddressabi, provider);   
	const result = await contract.functions.tokenRCAddress();
  console.log("result", result[0]);
}



useEffect(() => {
  try {
  //totalSupply();
  //tokenRCAddress(); 
} catch (err) {
  console.log('error totalSupply ...', err)
}
}, [])


  return (
    <section className="w-full pt-24 md:pt-0 md:h-screen relative flex flex-col justify-center items-center">
      <div className="container w-full flex items-center justify-between">
        <div className="w-full max-w-lg shadow-2xl border-2 border-gray-100 rounded-lg">
          <nav className="block w-full border-b-2 border-gray-100">
            <ul className="flex">
              <li
                className={
                  'text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ' +
                  (activeTabRC === 'swapRC'
                    ? 'text-blue-500 border-b-2 font-medium border-blue-500'
                    : '')
                }
              >
                <a
                  href="/#"
                  className="cursor-pointer flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTabRC('swapRC');
                  }}
                >
                  Swap
                </a>
              </li>
              <li
                className={
                  'text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ' +
                  (activeTabRC === 'liquidity'
                    ? 'text-blue-500 border-b-2 font-medium border-blue-500'
                    : '')
                }
              >
                <a
                  href="/#"
                  className="cursor-pointer flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTabRC('liquidity');
                  }}
                >
                  Liquidity
                </a>
              </li>
            </ul>
          </nav>
          <div className="p-5">
            {activeTabRC === 'swapRC' && <Swap sdf={{ is_rc: true }} />}
            {activeTabRC === 'liquidity' && <Liquidity />}
          </div>
        </div>

        <div className="w-full max-w-lg shadow-2xl border-2 border-gray-100 rounded-lg">
          <nav className="block w-full border-b-2 border-gray-100">
            <ul className="flex">
              <li
                className={
                  'text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ' +
                  (activeTabCBRN === 'swapCBRN'
                    ? 'text-blue-500 border-b-2 font-medium border-blue-500'
                    : '')
                }
              >
                <a
                  href="/#"
                  className="cursor-pointer flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTabCBRN('swapCBRN');
                  }}
                >
                  Swap
                </a>
              </li>
              <li
                className={
                  'text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ' +
                  (activeTabCBRN === 'liquidity'
                    ? 'text-blue-500 border-b-2 font-medium border-blue-500'
                    : '')
                }
              >
                <a
                  href="/#"
                  className="cursor-pointer flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTabCBRN('liquidity');
                  }}
                >
                  Liquidity
                </a>
              </li>
            </ul>
          </nav>
          <div className="p-5">
            {activeTabCBRN === 'swapCBRN' && <Swap sdf={{ is_rc: false }} />}
            {activeTabCBRN === 'liquidity' && <Liquidity />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Exchange;
