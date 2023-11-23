import { useState } from 'react';
import { ethers } from 'ethers';

  const [account, setAccount] = useState('');
  const [contractData, setContractData] = useState(null);

  const { ethereum } = window;

  const connectMetamask = async () => {
    if (ethereum) {
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        await ConnectContract();
      } catch (err) {
        console.error('Error connecting to MetaMask:', err);
      }
    } else {
      console.error('MetaMask not installed or not enabled');
    }
  };

  export const ConnectContract = async () => {
    const Address = '0xd9145CCE52D386f254917e481eB44e9943F39138';
    const ABI = [
      // ...ABI definition
    ];

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(Address, ABI, signer);
    setContractData(contract); 
    return contract; 
    
  };

  const getProducts = async () => {
    if (contractData) {
      try {
        const products = await contractData.productCount();
        console.log(products);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    } else {
      console.error('Contract not connected');
    }
  };

  const addProduct = async () => {
    if (contractData) {
      try {
        const tx = await contractData.addProduct('test', 1, 1);
        console.log(tx);
      } catch (err) {
        console.error('Error adding product:', err);
      }
    } else {
      console.error('Contract not connected');
    }
  };

  const purchaseProduct = async () => {
    if (contractData) {
      try {
        const tx = await contractData.purchaseProduct(1, { value: 1 });
        console.log(tx);
      } catch (err) {
        console.error('Error purchasing product:', err);
      }
    } else {
      console.error('Contract not connected');
    }
  };

  const updateProduct = async () => {
    if (contractData) {
      try {
        const tx = await contractData.updateProduct(1, 1, 1);
        console.log(tx);
      } catch (err) {
        console.error('Error updating product:', err);
      }
    } else {
      console.error('Contract not connected');
    }
  };

  const claimReward = async () => {
    if (contractData) {
      try {
        const tx = await contractData.claimReward();
        console.log(tx);
      } catch (err) {
        console.error('Error claiming reward:', err);
      }
    } else {
      console.error('Contract not connected');
    }
  };

