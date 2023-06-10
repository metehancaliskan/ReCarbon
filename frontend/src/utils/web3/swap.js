
import { BigNumber, ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const dexaddress = "0x207ce87A6E2cbcc082b65D6Da74f65C2C69c416C";

const tokenAddress = "0xD34D9E5009d6FbF489739e08AF79403790783f3f";
const RCtoMNTabi = [
    "function RCtoMNT(uint _RCamount, uint _minMNT)"
  ];

  const signer = provider.getSigner();

  export const RCtoMNT = async (_RCamount) => {
	const contract = new ethers.Contract(dexaddress, RCtoMNTabi, signer);  
  
  let num = ethers.utils.parseEther(_RCamount.toString());
	const tx = await contract.functions.RCtoMNT(num,1);
	const receipt = await tx.wait();

	console.log("receipt", receipt);
}
  
  const getAmountOfTokensabi = [
    "function getAmountOfTokens(uint256 inputAmount, uint256 inputReserve, uint256 outputReserve) pure returns (uint256)"
  ];
  
  export const getAmountOfTokens = async (inputAmount) => { 

    if(inputAmount===0){
      return 0;
    }
    inputAmount = inputAmount*100
    if(inputAmount>=52){
      return 0;
    }
let inputReserve =   52
let outputReserve = inputReserve-inputAmount;
    const contract = new ethers.Contract(dexaddress, getAmountOfTokensabi, provider);   
    let result = await contract.functions.getAmountOfTokens(inputAmount,inputReserve,outputReserve);
    result = Number(result);

    console.log("result", result/100);

    return result/100;
  }

const MNTtoRCabi = [
  "function MNTtoRC(uint _MNTamount, uint _minRC)"
];

export const MNTtoRC = async (_MNTamount ,) => { 

  const amount = Number(_MNTamount);
  if (isNaN(amount)) {
    console.error('Invalid _MNTamount');
    return;
  }

  const options = {value: ethers.utils.parseEther(_MNTamount.toString())}
	const contract = new ethers.Contract(dexaddress, MNTtoRCabi, signer);   
	const tx = await contract.functions.MNTtoRC(1,options);
  const receipt = await tx.wait();
	console.log("receipt", receipt);
}

const balanceOfabi = [
  "function balanceOf(address account) view returns (uint256)"
];


export const balanceOf = async () => { 

  const contract = new ethers.Contract(tokenAddress, balanceOfabi, signer);   
  let tempAdress = await signer.getAddress();
	let  result = await contract.functions.balanceOf(tempAdress);
  result = ethers.utils.formatEther(result.toString());


	// console.log("result", result);
  return result;
}