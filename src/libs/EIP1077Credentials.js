
/**
 * @EIP1077Credentials 
 * Generates a random Ethereum account and stores the public and the private key to the localStorage
 *
 * Returns the new Account, the Private Key and the Public Key.
 */
var bitcore = require("bitcore-lib");

const EIP1077Credentials = () => {
    if (window.localStorage.getItem("EIP1077Credentials") === null) {
        const KeyStore = new bitcore.HDPrivateKey();
        const PrivateKey = KeyStore.privateKey.toBuffer();
        const Account = toHexString(KeyStore.privateKey.toAddress().hashBuffer); 
        const PublicKey = KeyStore.privateKey.toPublicKey({compressed:false}).toBuffer();
        var item = {account:Account, privateKey: PrivateKey, publicKey: PublicKey};
        window.localStorage.setItem("", JSON.stringify(item));
        return item;
    } else {
        return JSON.parse(window.localStorage.getItem("EIP1077Credentials"));
    }
}

function toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
  }

export default EIP1077Credentials;