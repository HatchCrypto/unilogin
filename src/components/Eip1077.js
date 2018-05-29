
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
      }

    constructor(props) {
      super(props)
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

    sendAction(action) {

        var bufferedAction = action.toBuffer();
        var payload = EIP1077Payload(this.state.account, CONTRACT_ADDRESS, bufferedAction);
        var {transactionHash, signedTransactionHash} = PrivateKeySign(payload, this.state.account, this.state.privateKey);
        
        // Send Transaction to Contract
        if (this.state.contract){
            this.state.contract.methods.sendActionToContract(
                this.state.account, 
                action, 
                0, 
                transactionHash, 
                signedTransactionHash)
            .call()
            .then( response => console.log(response));
        } else {
            alert("Create Account First");
        }
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
