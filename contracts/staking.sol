// SPDX-License-Identifier: MIT
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol"; 

contract StakingContract is ERC20 {
    address public owner;
    ERC20 public token; // Reference to the ERC20 token contract

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 duration;
    }

    mapping(address => Stake) public stakes;

    event Staked(address indexed staker, uint256 amount, uint256 duration);
    event Unstaked(address indexed staker, uint256 amount, uint256 reward);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(address _tokenAddress) ERC20("Staked Token", "STK") {
        owner = msg.sender;
        token = ERC20(_tokenAddress);
    }

    function stake(uint256 amount, uint256 duration) public {
        require(amount > 0, "Amount must be greater than 0");
        require(stakes[msg.sender].amount == 0, "You already have an active stake");

        // Transfer the staked tokens to this contract
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");

        uint256 startTime = block.timestamp;
        stakes[msg.sender] = Stake(amount, startTime, duration);

        _mint(msg.sender, amount); // Mint staking tokens

        emit Staked(msg.sender, amount, duration);
    }

    function unstake() public {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No active stake");

        uint256 stakedAmount = userStake.amount;
        uint256 startTime = userStake.startTime;
        uint256 duration = userStake.duration;
        uint256 endTime = startTime + duration;

        require(block.timestamp >= endTime, "Staking duration not completed");

        uint256 reward = calculateReward(stakedAmount, duration);

        // Transfer the staked amount and reward back to the user
        require(token.transfer(msg.sender, stakedAmount), "Token transfer failed");
        _burn(msg.sender, stakedAmount); // Burn staking tokens

        // Clear the user's stake
        delete stakes[msg.sender];

        emit Unstaked(msg.sender, stakedAmount, reward);
    }

    function calculateReward(uint256 amount, uint256 duration) internal view returns (uint256) {
        // In this example, the reward is calculated based on a simple fixed rate per second
        uint256 ratePerSecond = 1; // Adjust the rate per second as needed
        return amount * ratePerSecond * duration;
    }
}
