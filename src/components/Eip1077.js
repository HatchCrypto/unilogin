
import Web3 from 'web3';
import React, { Component } from 'react';
import EIP1077Credentials from '../libs/EIP1077Credentials';
import PrivateKeySign from '../libs/PrivateKeySign';
import EIP1077Payload from '../libs/EIP1077Payload';
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
        transactionInfo : {},
        action: 0,
      }

    constructor(props) {
      super(props)
      this.createId = this.createId.bind(this);
      this.sendAction = this.sendAction.bind(this);
      
    }

    createId(e){
        var { account, publicKey, privateKey} = EIP1077Credentials(this.state.id);
        const Contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS,{ from:account });
        this.setState({account: account, publicKey: publicKey, privateKey: privateKey, contract: Contract});
    }

    sendAction(action, e) {

        this.setState({transactionInfo: {}, action: 0});  
        // actions: 1=read,2=write,3=ping
        var payload = EIP1077Payload(this.state.account, CONTRACT_ADDRESS, action);

        // Gets transaction and signed transaction hashes
        var hashes = PrivateKeySign(payload, this.state.account, this.state.privateKey);
        
        // Objet to send to Server/Contract
        const jsonObject = {
            _account: this.state.account,
            _operationType: action,
            _gas: 0,
            _messageHash: hashes.transactionHash,
            _signedHash:hashes.signedTransactionHash, 
            _payload: payload,
        }

        // Send info to Contract
        if (this.state.contract.methods){
            if (this.state.contract.methods.EIP1077Request !== undefined){
            this.state.contract.methods.EIP1077Request(
                this.state.account, 
                action, 
                0, 
                hashes.transactionHash, 
                hashes.signedTransactionHash)
            .call()
            .then( response => console.log(response));
            }   else {
                alert("EIP1077Request method not available in contract");
            }
        } else {
            alert("Create Account First");
        }

        this.setState({transactionInfo: jsonObject, action: action});         
    }

     toHexString(byteArray) {
        return Array.prototype.map.call(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
      }

    handleOnchangeId = (e) => {
        this.setState({id: e.target.value});
    }

    signUpToContract = () => {
       if (this.state.contract && this.state.contract.methods){
           if (this.state.contract.methods.signTo !== undefined){
           this.state.contract.methods.signTo(this.state.account, this.state.publicKey)
           .call()
           .then( response => console.log(response));
            } else {
                alert("Account: " + this.state.account + " with public key: " + this.toHexString(this.state.publicKey) + " wants to sign up. But 'Sign up' method not available in server or solidity contract");
        }
       } else {
           alert("Create Account First");
       }
    }



    render(){
    return(
    <div className="container">
    <h1>Send a signed transaction to Contract</h1>

    <div className="row">
    <p>1. Create a new login ID:</p>
    <input className="login-field" type="text" value={this.state.id} onChange={this.handleOnchangeId}/>
    <button className="login-btn" onClick={this.createId}>Generate Credentials</button>
    </div>

    <div className="row">
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
    <div>
    <p>What action would you like to send along?</p>
    <input type="button" onClick={(e) => {this.sendAction(11111)}} value="READ()"/>
    <input type="button" onClick={(e) => {this.sendAction(22222)}} value="WRITE()"/>
    <input type="button" onClick={(e) => {this.sendAction(32222)}} value="PING()"/>
    </div>
    <div>
       <textarea value={JSON.stringify(this.state.transactionInfo)} style={{width:"400px", height:"200px"}}/>
    </div>
  

    </div>
    )}
}

  export default Eip1077;
