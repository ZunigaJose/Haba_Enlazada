import React, { Component, useState } from "react";
import SimpleStorageContract from './contracts/SimpleStorage.json'
import getWeb3 from "./getWeb3";
import ipfs from "./ipfs";


import "./App.css";

function App() {
  const [contract, setContract] = React.useState(null );
  const [account, setAccount] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);
  const [jrv, SetJrv] = React.useState(null);
  const [imgBuffer, setImgBuffer] = React.useState(null);
  const [ipfsHash, setIpfsHash] = React.useState('');



  async function getAccount() {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccount();
    
  }

  React.useEffect(() => {
    getWeb3().then(results => {
      console.log(results)
      setWeb3(results);
    })
    
//    async function fetchAll () {
//      try {
//      // Get network provider and web3 instance.
//        const web3 = await getWeb3();
//
// Use web3 to get the user's accounts.
//        const accounts = await web3.eth.getAccounts();
//
//      // Get the contract instance.
//        const networkId = await web3.eth.net.getId();
//        const deployedNetwork = SimpleStorageContract.networks[networkId];
//        const instance = new web3.eth.Contract(
//          SimpleStorageContract.abi,
//          deployedNetwork && deployedNetwork.address,
//        );
//
//      // Set web3, accounts, and contract to the state, and then proceed with an
//      // example of interacting with the contract's methods.
//        setState(value => ({...value, web3, accounts, contract: instance }));
//        runExample();
//      } catch (error) {
//        // Catch any errors for any of the above operations.
//        alert(
//          `Failed to load web3, accounts, or contract. Check console for details.`,
//        );
//        console.error(error);
//      }
//    }
  }, []);

  React.useEffect(() => {  
    console.log(3, web3)
    if (web3) {
      console.log('wuuuu')
      const contract = require('@truffle/contract')
      const simpleStorage = contract(SimpleStorageContract)
      simpleStorage.setProvider(web3.currentProvider)

      // Get accounts.
      web3.eth.getAccounts((error, accounts) => {
        simpleStorage.deployed().then((instance) => {
          setAccount(accounts[0]);
          console.log(accounts[0]);
          // Get the value from the contract to prove it worked.
          return instance.get.call(accounts[0])
        }).then((ipfsHash) => {
          // Update state with the result.
          return setIpfsHash(ipfsHash)
        })
      })
    }
  }, [web3])


  function onImgSubmit(event) {
    event.preventDefault();
    ipfs.files.add(imgBuffer, (error, result) => {
      if(error) {
        console.log('ERROR', error);
        return;
      }
      setIpfsHash(result[0].hash);
      console.log(result[0].hash);
    })
  }

  function handleImage(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setImgBuffer(Buffer(reader.result));
    };
  }

    if (web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <form onSubmit={(e) => onImgSubmit(e)}>
          <input type='file' onChange={(e) => handleImage(e)} />
          <input type='submit' />
        </form>
      </div>
    );
}

export default App;
