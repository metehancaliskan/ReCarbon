// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking {
    IERC20 public stakingToken;
    IERC20 public rewardToken;
    uint256 public rewardPerBlock;
    mapping(address => uint256) public stakes;
    mapping(address => uint256) public lastClaimedBlock;

    event Staked(address indexed user, uint256 amount);
    event ClaimedReward(address indexed user, uint256 reward);

    constructor(IERC20 _stakingToken, IERC20 _rewardToken, uint256 _rewardPerBlock) {
        stakingToken = _stakingToken;
        rewardToken = _rewardToken;
        rewardPerBlock = _rewardPerBlock;
    }

    function stake(uint256 amount) external {
        stakingToken.transferFrom(msg.sender, address(this), amount);
        stakes[msg.sender] += amount;
        lastClaimedBlock[msg.sender] = block.number;
        emit Staked(msg.sender, amount);
    }

    function claimReward() external {
        uint256 blocks = block.number - lastClaimedBlock[msg.sender];
        uint256 reward = blocks * rewardPerBlock * stakes[msg.sender];

        uint256 stakedAmount = stakes[msg.sender];
        require(stakedAmount > 0, "No staked tokens to unstake");
        
        lastClaimedBlock[msg.sender] = block.number;
        stakes[msg.sender] = 0;

        stakingToken.transfer(msg.sender, stakedAmount);

        emit ClaimedReward(msg.sender, reward);
    }
}
