// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleNFT {
    struct BlockData {
        address minter;
        string imageHash;
        uint timestamp;
    }

    BlockData[] public blocks;

    event FakeMint(address indexed minter, string imageHash, uint timestamp);

    function fakeMint() external {
        // Add fake data directly
        blocks.push(BlockData(msg.sender, "FakeHash1234567890", block.timestamp));
        emit FakeMint(msg.sender, "FakeHash1234567890", block.timestamp);
    }

    // Function to get all blocks
    function getBlock(uint index) external view returns (BlockData memory) {
        require(index < blocks.length, "Index out of bounds");
        return blocks[index];
    }

    // Get total number of blocks
    function getBlockCount() external view returns (uint) {
        return blocks.length;
    }
}