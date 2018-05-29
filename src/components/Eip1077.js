
import Web3 from 'web3';
import React, { Component } from 'react';
import EIP1077Credentials from '../libs/EIP1077Credentials';
import PrivateKeySign from './PrivateKeySign';
import ethUtils from 'ethereumjs-util';

const ABI = [];

const web3 = new Web3(new Web3.providers.HttpProvider("https://localhost:8545"));

const CONTRACT_ADDRESS = "";


class Eip1077 extends Component {

    state = {
        account: null,
        publicKey: null,
        privateKey: null,
        data: "",
        contract: null,
        id: "",
      }

    constructor(props) {
      super(props)
      this.sendTransaction = this.sendTransaction.bind(this);
      this.createId = this.createId.bind(this);
      this.sendAction = this.sendAction.bind(this);
      
    }

    componentDidMount(){

       
        
    }

    createId(e){
        var { account, publicKey, privateKey} = EIP1077Credentials(this.state.id);
        const Contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS,{ from:account });
        this.setState({account: account, publicKey: publicKey, privateKey: privateKey, contract: Contract});
    }

    sendTransaction() {

        var bufferData = new Buffer(this.state.data);

        const header = '0x19'
        const version = '0'
        const transactionHash = ethUtils.keccak256(header, version, this.state.account, this.state.data);

       
        var vrs = ethUtils.ecsign(transactionHash, this.state.privateKey);
        var pubkey = ethUtils.ecrecover(transactionHash, vrs.v, vrs.r, vrs.s);
        var b64encoded = this.toHexString(pubkey);

        // Beware generated pubkey is Uncompressed and the publicKey is compressed
        var pub1 = pubkey.slice(0,32);
        var pub2 = this.state.publicKey.slice(1);
        if (pub1.toString() === pub2.toString()){
            console.log("They match!!");
        }
        
        // Send Transaction to Contract
    }

     toHexString(byteArray) {
        return Array.prototype.map.call(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
      }

    handleOnchangeId = (e) => {
        this.setState({id: e.target.value});

        // var { transactionHash, signedTransactionHash } = PrivateKeySign(0,0,this.bufferPrivateKey);
    }

    signUpToContract = () => {
       if (this.state.contract){
           this.state.contract.methods.signTo(this.state.account, this.state.publicKey)
           .call()
           .then( response => console.log(response));
       } else {
           alert("Create Account First");
       }
    }

    render(){
    return(
    <div>
    <h1>Send a signed transaction to Contract</h1>

    <div>
    <p>1. Create a new login ID:</p>
    <input type="text" value={this.state.id} onChange={this.handleOnchangeId}/>
    <button onClick={this.createId}>Generate Credentials</button>
    </div>

    <div>
    <h3>Your New Account Info:</h3>
    <p>Id : {this.state.id}</p>
    <p>Address : {this.state.account}</p>
    <p>Public Key : {this.state.publicKey}</p>
    <p>Private Key: {this.state.privateKey}</p>
    </div>

    <p>2. Sign up to Dapp:</p>
    <p style={{fontSize:"10px"}}>Sends your new account and public key to the factory contract:</p>
    <button onClick={this.signUpToContract}>Sign up</button>

 
    <p>3. Send Actions:</p>
    // 3) Using the options below, generate a data payload that contains the
    // desired 'action to execute', the hash of that payload, and the signed hash
    // of that payload.
    //
    // To complete this, you must use PrivateKeySign component along with the EIP1077 payload
    // component (still needs to be added)

    <div>
    <p>What action would you like to send along?</p>
    <input type="button" onClick={(e) => {this.sendAction("read")}} value="READ()"/>
    <input type="button" onClick={(e) => {this.sendAction("write")}} value="WRITE()"/>
    <input type="button" onClick={(e) => {this.sendAction("ping")}} value="PING()"/>
    </div>

  

    </div>
    )}
}

  export default Eip1077;
