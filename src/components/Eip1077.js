
import Web3 from 'web3';
import React, { Component } from 'react';
import EIP1077Credentials, { toHexString } from '../libs/EIP1077Credentials';
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
      }

    constructor(props) {
      super(props)
      this.sendTransaction = this.sendTransaction.bind(this);
      
    }

    componentDidMount(){

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
    }

    render(){
    return(
    <div>
      <p>Send a signed transaction to Contract</p>
      <input type="text" value={this.state.data} onChange={this.handleOnchange}/>
      <button onClick={this.sendTransaction}>Send</button>
    </div>
    )}
}
  
  export default Eip1077;