import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const address = "0x3A963381bd0381671c5E73059041DCffE29c3284";
const stakingAbi = [
    "function stake(uint256 amount) external"
];

export const stake = async (amount) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, stakingAbi, signer);
    let stakeamount = ethers.utils.parseEther(amount.toString());   
	const tx = await contract.stake(stakeamount);
	const receipt = await tx.wait();
	console.log("receipt", receipt);
}

const claimRewardabi = [
    "function claimReward() external"
  ];
  
  
  export const claimReward = async () => { 
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, claimRewardabi, signer);   
    let  tx = await contract.claimReward();
    const receipt = await tx.wait();
	console.log("receipt", receipt);
  }