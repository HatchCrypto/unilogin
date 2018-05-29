
import Web3 from 'web3';
import React, { Component } from 'react';
import EIP1077Credentials from '../libs/EIP1077Credentials';
import PrivateKeySign from './PrivateKeySign';

const ABI = [];

const web3 = new Web3(new Web3.providers.HttpProvider("https://localhost:8545"));

const CONTRACT_ADDRESS = "";


class Eip1077 extends Component {
    constructor(props) {
      super(props)
    }

    componentDidMount(){

        var { Account, PublicKey, PrivateKey} = EIP1077Credentials("coogan");
        console.log()
        const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS,{ from:Account });

        // var { transactionHash, signedTransactionHash } = PrivateKeySign(0,0,this.bufferPrivateKey);
    }

    sendTransaction = () => {
       alert("send");
    }
    render(){
    return(
      <div className="container">
        <div className="row">
          <h1>Create a new login ID:</h1>
          <input className="login-field" type="text" value=""/>
          <br/>
          <button className="login-btn" onClick={this.sendTransaction}>Send</button>
        </div>
        <div>
          <p>Send your new account and public key to the factory contract:</p>
          <input type="button" value="Create User ID contract"/>
        </div>
        <div>
          <p>What action would you like to send along?</p>
          <input className="action-btn" type="button" value="READ()"/>
          <input className="action-btn" type="button" value="WRITE()"/>
          <input className="action-btn" type="button" value="PING()"/>
        </div>
      </div>
      )
    }
}

  export default Eip1077;
