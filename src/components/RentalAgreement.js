import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "../contractABI.json";
import contractAddress from "../contractAddress";

const RentalAgreement = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [rentAmount, setRentAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [lateFee, setLateFee] = useState("");
  const [rentPaid, setRentPaid] = useState(false);

  const contractAbi = contractABI.abi; 
  useEffect(() => {
    const initialize = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        setProvider(provider);
        setContract(contract);

        const rentAmount = await contract.rentAmount();
        const dueDate = await contract.dueDate();
        const lateFee = await contract.lateFee();
        const rentPaid = await contract.rentPaid();

        setRentAmount(ethers.formatEther(rentAmount));
        setDueDate(dueDate.toLocaleString());
        setLateFee(ethers.formatEther(lateFee));
        setRentPaid(rentPaid);
      } else {
        console.error("No Ethereum provider found. Please install MetaMask.");
      }
    };

    initialize();
  }, []);
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: "eth_requestAccounts" });
  
        // Create an ethers provider
        const provider = new ethers.BrowserProvider(window.ethereum);
  
        // Get the signer
        const signer = await provider.getSigner();
  
        // Get the address from the signer
        const address = await signer.getAddress();
  
        console.log(address);
        setAccount(address);
      } catch (error) {
        if (error.code === 4001) {
          console.error("User rejected the request.");
        } else {
          console.error("An error occurred:", error);
        }
      }
    } else {
      console.error("No Ethereum provider found. Please install MetaMask.");
    }
  };
  

  const payRent = async () => {
    if (!contract) return;

    try {
      const tx = await contract.payRent({ value: ethers.parseEther(rentAmount) });
      await tx.wait();
      setRentPaid(true);
      alert("Rent paid successfully!");
    } catch (error) {
      console.error("Error paying rent:", error);
    }
  };

  const payRentWithLateFee = async () => {
    if (!contract) return;

    try {
      const totalAmount = ethers.parseEther((parseFloat(rentAmount) + parseFloat(lateFee)).toString());
      const tx = await contract.payRentWithLateFee({ value: totalAmount });
      await tx.wait();
      setRentPaid(true);
      alert("Rent with late fee paid successfully!");
    } catch (error) {
      console.error("Error paying rent with late fee:", error);
    }
  };

  return (
    <div>
      <h1>Rental Agreement</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <p><strong>Account:</strong> {account}</p>
      <p><strong>Rent Amount:</strong> {rentAmount} ETH</p>
      <p><strong>Due Date:</strong> {dueDate}</p>
      <p><strong>Late Fee:</strong> {lateFee} ETH</p>
      <p><strong>Rent Paid:</strong> {rentPaid ? "Yes" : "No"}</p>
      {!rentPaid && (
        <div>
          <button onClick={payRent}>Pay Rent</button>
          <button onClick={payRentWithLateFee}>Pay Rent with Late Fee</button>
        </div>
      )}
    </div>
  );
};

export default RentalAgreement;
