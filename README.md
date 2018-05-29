Effortless Ethereum Login via EIP-1077 & ERC-1078
================= 

This is a __React — Web3 — Solidity__ Proof of Concept signup / login design pattern with a minimal Ethereum native scheme that doesn't require passwords, backing up private keys nor typing seed phrases. It also allows for a user to sign messages to show intent of execution along similar guidelines.

Contributors:  
[tspoff](https://github.com/tspoff)  
[toledoal](https://github.com/toledoal)  
[rodocite](https://github.com/rodocite)  
[buck3000](https://github.com/buck3000)  
[cooganb](https://github.com/cooganb)  

Table of Contents
================= 
  * [Inspiration](#inspiration)  
  * [Pattern Overview:](#pattern-overview)  
      * [Client-Side](#client-side)  
      * [Solidity](#solidity)  
  * [Deployment](#deployment)  
  
  
 
Inspiration  
=====
The project is meant to propose creative solutions to UX challenges posed by naive users who are not familiar with private-public key pairs or the general Ethereum ecosystem.
  
The design follows many of the guidelines outlined in [EIP-1077](https://github.com/ethereum/EIPs/pull/1077) and [ERC-1078](https://github.com/ethereum/EIPs/pull/1078). It is directly modeled on use cases presented by [Alex Van de Sande at UX Unconference Toronto 2018](https://www.youtube.com/watch?v=qF2lhJzngto&feature=youtu.be).
  

Pattern Overview  
=====
The pattern is divided into two sections. The __React client-side__ presents a simple login  to the user while abstracting away Web 3 details happening on the back-end. The __Solidity codebase__, maintained by a centralized server or master contract, receives input from the client and dynamically renders a proxy Identity Contract specific to the user.
  

Client-side  
=====
Upon receiving a text input, the client generates a new Ethereum address, which will be context-specific and etherless. It also generates a private-public key pair from the Ethereum address. That information is stored in `localStorage` in this JSON format:
  
```
{ "sampleUserID":
  { account   : _account;
    privateKey: _privateKey;
    publicKey : _publicKey;
  }
}
```
  
  
The client then passes the new Ethereum account and key pair to a centralized server or master contract, which uses a factory pattern to generate an Identity Contract, which grants the user the permission to execute certain actions.
  
Last, the client allows the user to choose an action in-browser, which is wrapped in a format adhering to EIP-1077 / EIP-191 standards, and deployed to the previously-created Identity Contract for verification and, if allowed, execution.
  

Solidity  
=====
The Solidity codebase located in `./contracts` contains `EIP1077.sol`, which provides two essential functions:
  
* Generation of proxy Identity Contract
* Verification of Identity and Execution of Permissioned Actions
  
__`contract IdentityFactory`__ contains `createIdentity()`, which receives `account` (the new Ethereum address) and `pubKey` (the associated public key). *[Note: in the future, `r`, `s` and `v` will be extracted from pubKey before contract creation to optimize gas usage]* 
  
__`contract Identity`__ stores `account`, `r`, `s`, `v` and `pubKey` in state. When it receives the EIP-1077 compliant message containing `messageHash` and `signedHash` from the client, it first verifies the signature came from original account using elliptic cryptographic methods.
  
Once identity has been confirmed, `Identity` emits an event according to the `operationType` specified in the EIP-1077 payload. An event listener will register the event and render it client-side as desired.
  
  
Deployment  
=====

`npm install` from the directory then `npm start` to begin server. Solidity contracts deployed through Remix or another deployment framework.


This is a alpha Proof of Concept not meant to used on the Ethereum mainnet. Please fork, deploy locally or on testnet and submit PR or issues!
