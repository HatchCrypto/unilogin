pragma solidity ^0.4.20;

import { ECRecovery } from "./ECRecovery.sol";

//For testing verification
contract EIP1077Verifier {
    
    function verifySignature(address _account, bytes32 _pubKey, bytes32 _messageHash, bytes _signedHash) external pure returns (bool) {
        bytes32 prefixedHash = ECRecovery.toEthSignedMessageHash(_messageHash);
        return ECRecovery.recover(prefixedHash, _signedHash) == _account;
    }
    
    function verifySignatureNoPrefix(address _account, bytes32 _pubKey, bytes32 _messageHash, bytes _signedHash) external pure returns (bool) {
        return ECRecovery.recover(_messageHash, _signedHash) == _account;
    }
}

contract IdentityFactory {
    mapping (address => address) accountToIdentity;
    
    function createIdentity(address _account, bytes32 _pubKey) public returns(bool){
        
        //Identity already exists
        if (accountToIdentity[_account] != address(0)) {
            return false;
        }
        
        address newIdentity = new Identity(_account, _pubKey);
        accountToIdentity[_account] = newIdentity;
        return true;
    }
    
    function getIdentityForAccount(address _account) external view returns(address) {
        return accountToIdentity[_account];   
    }
}

contract Identity {

    string owner = "Coogan";
    address account;
    bytes32 pubKey;
    bytes32 r;
    bytes32 s;
    uint8 v;
    
    event Action1();
    event Action2();
    event Action3();
    
    constructor(address _account, bytes32 _pubKey) public {
        account = _account;
        pubKey = _pubKey;
    }
    
    function EIP1077Request(address _account, uint _operationType, uint _gas, bytes32 _messageHash, bytes _signedHash) external returns (bool) {
    //Verify the message sender is the owner
        require(ECRecovery.recover(_messageHash, _signedHash) == _account);
    
        //Parse operationType & execute actions
        //TODO: Use function signatures to clean up code
        if (_operationType == 1) {
            action1();
        } else if (_operationType == 2) {
            action2();
        } else if (_operationType == 3) {
            action3();
        } else {
            return false;
        }
        
        return true;
    }
    
    /*  Example Actions
        emit events for the server to listen to 
    */ 
    
    function action1() internal {
        emit Action1();
    }
    
    function action2() internal {
        emit Action2();
    }
    
    function action3() internal {
        emit Action3();
    }
}
