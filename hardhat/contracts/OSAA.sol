// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ProjectOSAA is Ownable, ReentrancyGuard {
    // Token details
    string public name = "Project OSAA Token";
    string public symbol = "OSAA";
    uint8 public decimals = 18;

    constructor() Ownable(msg.sender) {}

    mapping(address => uint256) private balances;
    uint256 private totalSupply;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Mint(address indexed to, uint256 amount);

    /**
     * @notice Mint new tokens to a specified address
     * @dev Only the contract owner can mint tokens
     * @param to Recipient address
     * @param amount Number of tokens to be minted
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Mint to zero address");
        require(amount > 0, "Amount must be greater than zero");

        totalSupply += amount;
        balances[to] += amount;

        emit Mint(to, amount);
        emit Transfer(address(0), to, amount);
    }

    /**
     * @notice Transfer tokens to another address
     * @param to Recipient address
     * @param amount Number of tokens to transfer
     */
    function transfer(
        address to,
        uint256 amount
    ) external nonReentrant returns (bool) {
        address from = msg.sender;
        require(to != address(0), "Transfer to zero address");
        require(amount > 0, "Amount must be greater than zero");
        require(balances[from] >= amount, "Insufficient balance");

        balances[from] -= amount;
        balances[to] += amount;

        emit Transfer(from, to, amount);
        return true;
    }

    /**
     * @notice Get the token balance of an address
     * @param user Address to query
     */
    function balanceOf(address user) external view returns (uint256) {
        return balances[user];
    }

    /**
     * @notice Get the total token supply
     */
    function getTotalSupply() external view returns (uint256) {
        return totalSupply;
    }
}
