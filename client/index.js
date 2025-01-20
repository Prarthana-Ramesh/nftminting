import Web3 from 'web3';
import configuration from '../build/contracts/SimpleNFT.json';
import 'bootstrap/dist/css/bootstrap.css';

const CONTRACT_ADDRESS = configuration.networks['5777'].address; // Replace '5777' with your Ganache network ID if different
const CONTRACT_ABI = configuration.abi;

let web3;
let contract;
let account;

const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            account = accounts[0];
            contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

            document.getElementById('status').textContent = 'Connected to MetaMask';
            document.getElementById('account').textContent = `Connected Account: ${account}`;
            document.getElementById('connectWallet').textContent = 'Connected';
            document.getElementById('connectWallet').classList.add('bg-green-500');
        } catch (error) {
            console.error('Failed to connect to MetaMask:', error);
            document.getElementById('status').textContent = 'Failed to connect to MetaMask';
        }
    } else {
        document.getElementById('status').textContent = 'MetaMask not detected';
    }
};

const handleAction = async (action, ...args) => {
    if (!contract || !account) {
        Swal.fire('Error', 'Please connect your wallet first', 'error');
        return;
    }

    try {
        await contract.methods[action](...args).send({ from: account });
        Swal.fire('Success', `${action} successful`, 'success');
    } catch (error) {
        console.error(`${action} failed:`, error);
        Swal.fire('Error', `${action} failed: ${error.message}`, 'error');
    }
};
document.getElementById('connectWallet').addEventListener('click', connectWallet);

const generateNFT = async (imageHash) => {
    if (!contract || !account) {
        Swal.fire('Error', 'Please connect your wallet first', 'error');
        return;
    }

    try {
        await contract.methods.fakeMint().send({ from: account });
        Swal.fire('Success', 'NFT minted successfully', 'success');
    } catch (error) {
        console.error('Minting failed:', error);
        Swal.fire('Error', `Minting failed: ${error.message}`, 'error');
    }
};

document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('file-input');
    if (!fileInput.files || fileInput.files.length === 0) {
        Swal.fire('Error', 'Please upload an image file', 'error');
        return;
    }

    const file = fileInput.files[0];

    try {
        // Convert the image to a hash (simulate hashing for now)
        const reader = new FileReader();
        reader.onload = async (event) => {
            const imageHash = btoa(event.target.result); // Simulated hash, replace with actual IPFS or hash function

            // Call the smart contract function to mint the NFT
            await generateNFT(imageHash);
        };
        reader.readAsDataURL(file);
    } catch (error) {
        console.error('Error uploading file:', error);
        Swal.fire('Error', 'Failed to upload file', 'error');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file-input');
    const fileName = document.getElementById('file-name');

    fileInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            fileName.textContent = this.files[0].name;
        } else {
            fileName.textContent = 'No file chosen';
        }
    });

    document.getElementById('status').textContent = 'Please connect your wallet';
});
