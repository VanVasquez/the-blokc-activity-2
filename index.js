import { abi, contractAddress } from './constants.js';
import { ethers } from './ethers-5.5.0.min.js';
const connectButton = document.getElementById('connectButton');
const transferButton = document.getElementById('transferButton');

// Connect to the contract
let provider;
let signer;
let contract;

connectButton.onclick = connect;
transferButton.onclick = transferFile;

async function connect() {
  console.log('connecting');
  if (typeof window.ethereum !== 'undefined') {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      console.log(err);
    }
    connectButton.innerHTML = 'Connected';
  } else {
    connectButton.innerHTML = 'Install Metamask';
  }
}
// Function to transfer a file
async function transferFile() {
  console.log('transfering file');
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);
  const receiver = document.getElementById('receiver').value;
  const filename = document.getElementById('filename').value;
  const filehash = document.getElementById('filehash').value;

  const transaction = await contract.transferFile(receiver, filename, filehash);
  await transaction.wait();
  console.log('File transferred successfully.');

  // Refresh the user files
  await getUserFiles();
}

// Function to get the user's files
async function getUserFiles() {
  console.log('getting user files');
  const userAddress = await signer.getAddress();
  const fileCount = await contract.getFileCount(userAddress);

  let filesHTML = '';
  for (let i = 0; i < fileCount; i++) {
    const [filename, filehash] = await contract.getFile(userAddress, i);
    filesHTML += `<p>File ${i + 1}: ${filename} hash:  (${filehash})</p>`;
  }

  document.getElementById('userFiles').innerHTML = filesHTML;
}

// Initialize the UI
async function initializeUI() {
  await getUserFiles();
}

// Run the UI initialization
initializeUI();
