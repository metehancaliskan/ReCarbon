
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const dexaddress = "0x58da26461730bE52e8791E896b99587E08b2d5bA";

const tokenAddressRC = "0xAA36f53E71A011105D7CFb22738a7DD2bB465De6";
const tokenAddressCRBN = "0xF55D19a5720fCe56d97B4fB24F615c86333c977d";


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

const CRBNtoMNTabi = [
  "function CRBNtoMNT(uint _CRBNamount, uint _minMNT)"
];

export const CRBNtoMNT = async (_CRBNamount) => {
const contract = new ethers.Contract(dexaddress, CRBNtoMNTabi, signer);  

let num = ethers.utils.parseEther(_CRBNamount.toString());
const tx = await contract.functions.CRBNtoMNT(num,1);
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

const MNTtoCRBNabi = [
  "function MNTtoCRBN(uint _MNTamount, uint _minCRBN)"
];

export const MNTtoCRBN = async (_MNTamount ,) => { 

  const amount = Number(_MNTamount);
  if (isNaN(amount)) {
    console.error('Invalid _MNTamount');
    return;
  }

  const options = {value: ethers.utils.parseEther(_MNTamount.toString())}
	const contract = new ethers.Contract(dexaddress, MNTtoCRBNabi, signer);   
	const tx = await contract.functions.MNTtoCRBN(1,options);
  const receipt = await tx.wait();
	console.log("receipt", receipt);
}

const balanceOfabi = [
  "function balanceOf(address account) view returns (uint256)"
];


export const balanceOfRC = async () => { 

  const contract = new ethers.Contract(tokenAddressRC, balanceOfabi, signer);   
  let tempAdress = await signer.getAddress();
	let  result = await contract.functions.balanceOf(tempAdress);
  result = ethers.utils.formatEther(result.toString());


	// console.log("result", result);
  return result;
}

export const balanceOfCRBN = async () => { 

  const contract = new ethers.Contract(tokenAddressCRBN, balanceOfabi, signer);   
  let tempAdress = await signer.getAddress();
	let  result = await contract.functions.balanceOf(tempAdress);
  result = ethers.utils.formatEther(result.toString());


	// console.log("result", result);
  return result;
}