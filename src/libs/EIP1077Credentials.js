
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
        const PrivateKey = KeyStore.privateKey.toString();
        const Account = KeyStore.privateKey.toAddress().toString(); 
        const PublicKey = KeyStore.privateKey.toPublicKey().toString();
        var item = {account:Account, privateKey: PrivateKey, publicKey: PublicKey};
        window.localStorage.setItem("", JSON.stringify(item));
        return item;
    } else {
        return JSON.parse(window.localStorage.getItem("EIP1077Credentials"));
    }
}

export default EIP1077Credentials;