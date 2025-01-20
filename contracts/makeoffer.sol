// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract makeoffer {
    // Event to notify that a buy request has been sent
    event BuyRequestSent(address indexed buyer, uint256 price, string message);

    // Function to fake buy an NFT
    function buyNFT(uint256 priceInEth) external {
        require(priceInEth > 0, "Price must be greater than zero.");

        // Emit an event to simulate sending a request
        emit BuyRequestSent(msg.sender, priceInEth, "Request sent, please wait for the response from the seller.");
    }
}
