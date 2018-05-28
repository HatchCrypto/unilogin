
import Web3 from 'web3';
import React, { Component } from 'react';
import EIP1077Credentials from '../libs/EIP1077Credentials';


const ABI = [];

const web3 = new Web3(new Web3.providers.HttpProvider("https://localhost:8545"));

const CONTRACT_ADDRESS = "";


class Eip1077 extends Component {
    constructor(props) {
      super(props)
    }

    componentDidMount(){

        var { Account, PublicKey, PrivateKey} = EIP1077Credentials();

        const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS,{ from:Account });

        //const vrs = ethUtils.ecsign(data, privkey);
        const header = '0x19'
        const version = '0'
        //const transactionHash = ethUtils.sha3(header, version, account, ...data);
    }

    sendTransaction = () => {
       alert("send it");
    }

    render(){
    return(
    <div>
      <p>Send a signed transaction to Contract</p>
      <input type="text" value=""/>
      <button onClick={this.sendTransaction}>Send</button>
    </div>
    )}
}
  
  export default Eip1077;