import React from "react";
import SimpleStorageContract from './contracts/SimpleStorage.json'
import getWeb3 from "./getWeb3";
import ipfs from "./ipfs";
import { Grid, Button } from "@mui/material";
import Diag from "./Diag";
import MiniDiag from "./MiniDiag";
import "./App.css";

function App() {
  const [account, setAccount] = React.useState(null);
  const cInstance = React.useRef(null);
  //const [simpleStorageInstance, setSimpleStorageInstance] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openUp, setOpenUp] = React.useState(false);
  const [jrv, setJrv] = React.useState('');
  const [nivel, setNivel] = React.useState('');
  const [imgBuffer, setImgBuffer] = React.useState(null);


  const opcionesNivel = [
    { value: "Pre", label: "Presidencial" },
    { value: "Mun", label: "Municipal" },
    { value: "Dip", label: "Diputados" },
];

  React.useEffect(() => {
    getWeb3().then(results => {
      console.log(results)
      setWeb3(results);
    })
  }, []);

  React.useEffect(() => {
    if (!web3) {
      return;
    }
    const contract = require('@truffle/contract');
    const simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(web3.currentProvider);

    // Get accounts.
    web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        setAccount(accounts[0]);
        console.log('inst: ', instance);
        cInstance.current = instance;
        // Get the value from the contract to prove it worked.
      })
    });
  }, [web3])


  function onImgSubmit() {
    //event.preventDefault(); 
    ipfs.files.add(imgBuffer, (error, result) => {
      if(error) {
        console.log('ERROR', error);
        return;
      }
      cInstance.current.addActa(result[0].hash, nivel, jrv, {from: account})
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


    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div className="App">
      <Diag open={openSearch} setOpen={setOpenSearch} contractInstance={cInstance.current} 
      type ={''} options={opcionesNivel}/>
      <MiniDiag options ={opcionesNivel} open={openUp} setDiagOpen={setOpenUp}
      jrv={jrv} setJrv={setJrv} nivel={nivel} setNivel={setNivel} account={account} setImgBuffer={setImgBuffer}
      handleImage ={handleImage} onImgSubmit={onImgSubmit} color={'black'} imgBuffer={imgBuffer}/>
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <Grid item md={6} xs={6}>
          <Button color="primary" variant="contained" 
          onClick={() => {setOpenUp(true)}}>
            Cargar Acta
          </Button>
        </Grid>
        <Grid item md={6} xs={6}>
          <Button color="info" variant="contained" 
          onClick={() => {setOpenSearch(true)}}>
            Buscar
          </Button>
        </Grid>
      </Grid>
      </div>
    );
}

export default App;
