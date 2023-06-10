import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const address = "0xE88AE631F452844002879E14C1555dfF666E526e";
const voteAbi = [
    "function vote(address project, uint256 numberOfVotes)"
];

export const vote = async (projectAddress, numberOfVotes) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, voteAbi, signer);   
	const tx = await contract.vote(projectAddress, numberOfVotes);
	const receipt = await tx.wait();
	console.log("receipt", receipt);
}

const votesReceivedabi = [
    "function votesReceived(address) view returns (uint256)"
  ];
  
  
  export const votesReceived = async (projectAddress) => { 
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, votesReceivedabi, signer);   
    let  result = await contract.functions.votesReceived(projectAddress);
    console.log("Votes received: " + result.toString());
    return result;
  }