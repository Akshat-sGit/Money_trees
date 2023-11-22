import Web3 from 'web3';


// Function to handle MetaMask connection
async function connectToMetaMask() {
  try {
    // Check if MetaMask is installed
    if (window.ethereum) {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Handle successful account access
      console.log('Connected accounts:', accounts);
      // Perform further actions or UI updates here after successful connection
    } else {
      console.error('MetaMask not detected');
      // Optionally, provide a message or UI indication that MetaMask is not installed
    }
  } catch (error) {
    // Handle errors or user rejections
    console.error(error);
  }
}

// Add event listener to the button
document.addEventListener('DOMContentLoaded', () => {
  const connectButton = document.getElementById('connectButton');
  connectButton.addEventListener('click', connectToMetaMask);
});
