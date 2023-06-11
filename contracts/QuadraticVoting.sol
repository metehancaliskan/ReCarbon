// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QuadraticVoting is Ownable {
    ERC20 public reCarbonToken;

    mapping(address => uint256) public votesReceived;
    mapping(address => mapping(address => uint256)) public votesCastByVoter;

    constructor(address _reCarbonTokenAddress) {
        reCarbonToken = ERC20(_reCarbonTokenAddress);
    }

    function vote(address project, uint256 numberOfVotes) public {
        require(reCarbonToken.balanceOf(msg.sender) >= numberOfVotes, "You must have enough tokens to cast your vote");
        require(votesCastByVoter[msg.sender][project] + numberOfVotes <= sqrt(reCarbonToken.balanceOf(msg.sender)), "The number of votes cast is more than the square root of your tokens");

        votesReceived[project] += sqrt(numberOfVotes);
        votesCastByVoter[msg.sender][project] += numberOfVotes;
    }

    //function getvote(address project) public return

    function sqrt(uint256 x) public pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}
