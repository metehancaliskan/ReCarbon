// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DEX is ERC20 {
    address public tokenRCAddress;
    address public tokenCRBNAddress;
    address public tokenMNTAddress;

    constructor(address _tokenRC, address _tokenCRBN, address _tokenMNT) ERC20("DEX LP Token", "DEX-LP") {
        require(_tokenRC != address(0), "Token RC address passed is a null address");
        require(_tokenCRBN != address(0), "Token CRBN address passed is a null address");
        require(_tokenMNT != address(0), "Token MNT address passed is a null address");
        tokenRCAddress = _tokenRC;
        tokenCRBNAddress = _tokenCRBN;
        tokenMNTAddress = _tokenMNT;
    }

    function getReserve(address token) public view returns (uint) {
        return ERC20(token).balanceOf(address(this));
    }

    function getbalance(address token) public view returns (uint) {
        return ERC20(token).balanceOf(msg.sender);
    }

    function addLiquidityRC(uint _amountRC, uint _amountMNT) public returns (uint) {
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

    function addLiquidityCRBN(uint _amountCRBN, uint _amountMNT) public returns (uint) {
        uint liquidity;
        uint tokenCRBNReserve = getReserve(tokenCRBNAddress);
        uint tokenMNTReserve = getReserve(tokenMNTAddress);
        ERC20 tokenCRBN = ERC20(tokenCRBNAddress);
        ERC20 tokenMNT = ERC20(tokenMNTAddress);

        if(tokenCRBNReserve == 0 && tokenMNTReserve == 0) {
            tokenCRBN.transferFrom(msg.sender, address(this), _amountCRBN);
            tokenMNT.transferFrom(msg.sender, address(this), _amountMNT);
            liquidity = _amountCRBN;
            _mint(msg.sender, liquidity);
        } else {
            uint ratioCRBN = _amountCRBN / tokenCRBNReserve;
            uint ratioMNT = _amountMNT / tokenMNTReserve;
            require(ratioCRBN == ratioMNT, "Ratios must be the same");
            tokenCRBN.transferFrom(msg.sender, address(this), _amountCRBN);
            tokenMNT.transferFrom(msg.sender, address(this), _amountMNT);
            liquidity = (totalSupply() * _amountCRBN) / tokenCRBNReserve;
            _mint(msg.sender, liquidity);
        }
        return liquidity;
    }

    function removeLiquidityRC(uint _liquidity) public {
        ERC20 tokenRC = ERC20(tokenRCAddress);
        ERC20 tokenMNT = ERC20(tokenMNTAddress);
        uint tokenRCBalance = tokenRC.balanceOf(address(this));
        uint tokenMNTBalance = tokenMNT.balanceOf(address(this));
        uint tokenRCAmount = (_liquidity * tokenRCBalance) / totalSupply();
        uint tokenMNTAmount = (_liquidity * tokenMNTBalance) / totalSupply();
        _burn(msg.sender, _liquidity);
        tokenRC.transfer(msg.sender, tokenRCAmount);
        tokenMNT.transfer(msg.sender, tokenMNTAmount);
    }

    function removeLiquidityCRBN(uint _liquidity) public {
        ERC20 tokenCRBN = ERC20(tokenCRBNAddress);
        ERC20 tokenMNT = ERC20(tokenMNTAddress);
        uint tokenCRBNBalance = tokenCRBN.balanceOf(address(this));
        uint tokenMNTBalance = tokenMNT.balanceOf(address(this));
        uint tokenCRBNAmount = (_liquidity * tokenCRBNBalance) / totalSupply();
        uint tokenMNTAmount = (_liquidity * tokenMNTBalance) / totalSupply();
        _burn(msg.sender, _liquidity);
        tokenCRBN.transfer(msg.sender, tokenCRBNAmount);
        tokenMNT.transfer(msg.sender, tokenMNTAmount);
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

    function CRBNtoMNT(uint _CRBNamount, uint _minMNT) public {
        uint256 CRBNReserve = getReserve(tokenCRBNAddress);
        uint256 MNTReserve = getReserve(tokenMNTAddress);

        uint256 MNTbought = getAmountOfTokens(_CRBNamount, CRBNReserve, MNTReserve);

        require(MNTbought >= _minMNT, "insufficient output amount");

        ERC20(tokenCRBNAddress).transferFrom(msg.sender, address(this), _CRBNamount);
        ERC20(tokenMNTAddress).transfer(msg.sender, MNTbought);
    }

    function MNTtoCRBN(uint _MNTamount, uint _minCRBN) public {
        uint256 CRBNReserve = getReserve(tokenCRBNAddress);
        uint256 MNTReserve = getReserve(tokenMNTAddress);

        uint256 CRBNbought = getAmountOfTokens(_MNTamount, MNTReserve, CRBNReserve);

        require(CRBNbought >= _minCRBN, "insufficient output amount");

        ERC20(tokenMNTAddress).transferFrom(msg.sender, address(this), _MNTamount);
        ERC20(tokenCRBNAddress).transfer(msg.sender, CRBNbought);
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
