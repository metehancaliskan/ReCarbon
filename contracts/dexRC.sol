// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DEX is ERC20 {
    address public tokenRCAddress;
    address public tokenMNTAddress;

    constructor(address _tokenRC, address _tokenMNT) ERC20("DEX LP Token", "DEX-LP") {
        require(_tokenRC != address(0), "Token A address passed is a null address");
        require(_tokenMNT != address(0), "Token B address passed is a null address");
        tokenRCAddress = _tokenRC;
        tokenMNTAddress = _tokenMNT;
    }

    function getReserve(address token) public view returns (uint) {
        return ERC20(token).balanceOf(address(this));
    }

    function getbalance(address token) public view returns (uint) {
        return ERC20(token).balanceOf(msg.sender);
    }

    function addLiquidity(uint _amountRC, uint _amountMNT) public returns (uint) {
        uint liquidity;
        uint tokenRCReserve = getReserve(tokenRCAddress);
        uint tokenMNTReserve = getReserve(tokenMNTAddress);
        ERC20 tokenRC = ERC20(tokenRCAddress);
        ERC20 tokenMNT = ERC20(tokenMNTAddress);

        if(tokenRCReserve == 0 && tokenMNTReserve == 0) {
            tokenRC.transferFrom(msg.sender, address(this), _amountRC);
            tokenMNT.transferFrom(msg.sender, address(this), _amountMNT);
            liquidity = _amountRC;
            _mint(msg.sender, liquidity);
        } else {
            uint ratioRC = _amountRC / tokenRCReserve;
            uint ratioMNT = _amountMNT / tokenMNTReserve;
            require(ratioRC == ratioMNT, "Ratios must be the same");
            tokenRC.transferFrom(msg.sender, address(this), _amountRC);
            tokenMNT.transferFrom(msg.sender, address(this), _amountMNT);
            liquidity = (totalSupply() * _amountRC) / tokenRCReserve;
            _mint(msg.sender, liquidity);
        }
        return liquidity;
    }

    function removeLiquidity(uint _liquidity) public {
        ERC20 tokenA = ERC20(tokenRCAddress);
        ERC20 tokenB = ERC20(tokenMNTAddress);
        uint tokenABalance = tokenA.balanceOf(address(this));
        uint tokenBBalance = tokenB.balanceOf(address(this));
        uint tokenAAmount = (_liquidity * tokenABalance) / totalSupply();
        uint tokenBAmount = (_liquidity * tokenBBalance) / totalSupply();
        _burn(msg.sender, _liquidity);
        tokenA.transfer(msg.sender, tokenAAmount);
        tokenB.transfer(msg.sender, tokenBAmount);
    }

    function getAmountOfTokens(
        uint256 inputAmount,
        uint256 inputReserve,
        uint256 outputReserve
    ) public pure returns (uint256) {
        require(inputReserve > 0 && outputReserve > 0, "invalid reserves");
        uint256 inputAmountWithFee = inputAmount * 99;
        uint256 numerator = inputAmountWithFee * outputReserve;
        uint256 denominator = (inputReserve * 100) + inputAmountWithFee;
        return numerator / denominator;
    }

    function RCtoMNT(uint _RCamount, uint _minMNT) public {
        uint256 RCReserve = getReserve(tokenRCAddress);
        uint256 MNTReserve = getReserve(tokenMNTAddress);

        uint256 MNTbought = getAmountOfTokens(_RCamount, RCReserve, MNTReserve);

        require(MNTbought >= _minMNT, "insufficient output amount");

        ERC20(tokenRCAddress).transferFrom(msg.sender, address(this), _RCamount);
        ERC20(tokenMNTAddress).transfer(msg.sender, MNTbought);
    }

    function MNTtoRC(uint _MNTamount, uint _minRC) public {
        uint256 RCReserve = getReserve(tokenRCAddress);
        uint256 MNTReserve = getReserve(tokenMNTAddress);

        uint256 RCbought = getAmountOfTokens(_MNTamount, MNTReserve, RCReserve);

        require(RCbought >= _minRC, "insufficient output amount");

        ERC20(tokenMNTAddress).transferFrom(msg.sender, address(this), _MNTamount);
        ERC20(tokenRCAddress).transfer(msg.sender, RCbought);
    }
}
