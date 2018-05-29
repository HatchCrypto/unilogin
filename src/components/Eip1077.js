
import Web3 from 'web3';
import React, { Component } from 'react';
<<<<<<< HEAD
import EIP1077Credentials, { toHexString } from '../libs/EIP1077Credentials';
import ethUtils from 'ethereumjs-util';

=======
import EIP1077Credentials from '../libs/EIP1077Credentials';
import PrivateKeySign from './PrivateKeySign';
>>>>>>> 36c19c94e103fa5b5a0080b37d203a8156e43de1

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
      }

    constructor(props) {
      super(props)
      this.sendTransaction = this.sendTransaction.bind(this);
      
    }

    componentDidMount(){

<<<<<<< HEAD
        var { account, publicKey, privateKey} = EIP1077Credentials();
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

    handleOnchange = (e) => {
        this.setState({data: e.target.value});
=======
        var { Account, PublicKey, PrivateKey} = EIP1077Credentials("coogan");
        console.log()
        const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS,{ from:Account });

        // var { transactionHash, signedTransactionHash } = PrivateKeySign(0,0,this.bufferPrivateKey);
    }

    sendTransaction = () => {
       alert("send");
>>>>>>> 36c19c94e103fa5b5a0080b37d203a8156e43de1
    }

    render(){
    return(
    <div>
<<<<<<< HEAD
      <p>Send a signed transaction to Contract</p>
      <input type="text" value={this.state.data} onChange={this.handleOnchange}/>
      <button onClick={this.sendTransaction}>Send</button>
=======

    //  1) Using the styling of EIP1077Credentials-Name, please make the input below a "sign-up" button
    //  that intiates the creation of the EIP1077 Credentials using the inputted string as the localStorage
    // setItem name.

    <div>
    <p>Create a new login ID:</p>
    <input type="text" value=""/>
    <button onClick={this.sendTransaction}>Send</button>
    </div>

   // 2) Below, display a JSON object containing login ID, the Ethereum address and public key
   // that will be used to generate a user ID contract

     <div>
     <p>Send your new account and public key to the factory contract:</p>
     <input type="button" value="Create User ID contract"/>
     </div>

    // 3) Using the options below, generate a data payload that contains the
    // desired 'action to execute', the hash of that payload, and the signed hash
    // of that payload.
    //
    // To complete this, you must use PrivateKeySign component along with the EIP1077 payload
    // component (still needs to be added)

    <div>
    <p>What action would you like to send along?</p>
    <input type="button" value="READ()"/>
    <input type="button" value="WRITE()"/>
    <input type="button" value="PING()"/>
    </div>

>>>>>>> 36c19c94e103fa5b5a0080b37d203a8156e43de1
    </div>
    )}
}

  export default Eip1077;
