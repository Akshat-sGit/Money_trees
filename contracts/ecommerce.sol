// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EcommerceStock {
    address payable public owner;
    
    struct Product {
        uint256 productId;
        string name;
        uint256 price;
        uint256 quantity;
    }
    
    mapping(uint256 => Product) public products;
    uint256 public productCount;

    // Mapping to track customer rewards
    mapping(address => uint256) public customerRewards;

    event ProductAdded(uint256 productId, string name, uint256 price, uint256 quantity);
    event ProductUpdated(uint256 productId, uint256 newPrice, uint256 newQuantity);
    event Purchase(address indexed customer, uint256 productId);
    event RewardClaimed(address indexed customer, uint256 rewardAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = payable(msg.sender); // Declare owner as payable
    }

    function addProduct(string memory name, uint256 price, uint256 quantity) public onlyOwner {
        require(bytes(name).length > 0, "Product name cannot be empty");
        require(price > 0, "Price must be greater than zero");
        require(quantity > 0, "Quantity must be greater than zero");

        productCount++;
        products[productCount] = Product(productCount, name, price, quantity);

        emit ProductAdded(productCount, name, price, quantity);
    }

    function updateProduct(uint256 productId, uint256 newPrice, uint256 newQuantity) public onlyOwner {
        require(productId > 0 && productId <= productCount, "Invalid product ID");
        require(newPrice > 0, "Price must be greater than zero");
        require(newQuantity > 0, "Quantity must be greater than zero");

        Product storage product = products[productId];
        product.price = newPrice;
        product.quantity = newQuantity;

        emit ProductUpdated(productId, newPrice, newQuantity);
    }

    function purchaseProduct(uint256 productId) public payable {
        require(productId > 0 && productId <= productCount, "Invalid product ID");
        Product storage product = products[productId];

        require(msg.value >= product.price, "Insufficient payment for the product");

        // Calculate the reward amount (e.g., 0.001 Ether)
        uint256 rewardAmount = 0.001 ether;

        // Update the customer's reward balance
        customerRewards[msg.sender] += rewardAmount;

        // Transfer the product price to the owner
        owner.transfer(product.price);

        // Emit purchase and reward events
        emit Purchase(msg.sender, productId);
        emit RewardClaimed(msg.sender, rewardAmount);
    }

    function claimReward() public {
        uint256 reward = customerRewards[msg.sender];
        require(reward > 0, "No rewards to claim");

        customerRewards[msg.sender] = 0; // Reset the customer's reward balance
        payable(msg.sender).transfer(reward); // Transfer the reward to the customer

        emit RewardClaimed(msg.sender, reward);
    }

    function getProduct(uint256 productId) public view returns (uint256, string memory, uint256, uint256) {
        require(productId > 0 && productId <= productCount, "Invalid product ID");

        Product storage product = products[productId];
        return (product.productId, product.name, product.price, product.quantity);
    }

    // Fallback function to accept Ether transfers
    receive() external payable {}
}