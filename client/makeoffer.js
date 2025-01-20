import Web3 from "web3";
import configuration from "../build/contracts/makeoffer.json";

// Replace '5777' with your actual network ID if different
const CONTRACT_ADDRESS = configuration.networks['5777']?.address || "0xC40f182932A07409CE217f440b51D28dA3eF16ef";
const CONTRACT_ABI = [
    {
        "inputs": [{ "internalType": "uint256", "name": "priceInEth", "type": "uint256" }],
        "name": "buyNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "buyer", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" },
            { "indexed": false, "internalType": "string", "name": "message", "type": "string" }
        ],
        "name": "BuyRequestSent",
        "type": "event"
    }
];

let web3;
let contract;
let account;

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", async () => {
    document.querySelector(".connect-wallet").addEventListener("click", connectWallet);
    document.querySelector(".make-offer-btn").addEventListener("click", makeOffer);

    // Optional: Handle like/share button styling
    document.querySelectorAll(".icon-btn").forEach(button => {
        button.addEventListener("click", () => {
            button.style.color = "#8B5CF6";
            button.style.borderColor = "#8B5CF6";
        });
    });
});

async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            account = accounts[0];
            contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

            alert(`Connected to MetaMask. Account: ${account}`);
        } catch (error) {
            console.error("Failed to connect to MetaMask:", error);
            alert("Failed to connect to MetaMask. See console for details.");
        }
    } else {
        alert("MetaMask not detected. Please install MetaMask.");
    }
}

async function makeOffer() {
    if (!web3 || !contract) {
        alert("Please connect your wallet first.");
        return;
    }

    const price = prompt("Enter your offer price in ETH:", "0.2");

    if (!price || isNaN(price) || price <= 0) {
        alert("Invalid price entered.");
        return;
    }

    const priceInWei = web3.utils.toWei(price, "ether");

    try {
        await contract.methods.buyNFT(priceInWei).send({ from: account });
        alert("Offer submitted successfully!");
    } catch (error) {
        console.error("Error making offer:", error);
        alert("Failed to submit offer. See console for details.");
    }
}
