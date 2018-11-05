# Decentralised Star Notary Project

Create smart contract that add and also provide lookup access to star notary data onto the ethereum block chain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

### Configuring your project

- Use NPM to initialize your project and create package.json to store project dependencies.
```
npm init
```
npm install truffle-hdwallet-provider --save
```
- Install -g truffle 
```
- Install Express with --save flag
```
npm install express --save
```
- Install body-parser
```
npm install body-parser
```
- Install openzeppelin-solidity with 
```
npm install truffle-hdwallet-provider --save
```
- Install truffle-hdwallet-provider 
```
npm install web3
```
- Install web3
```


## Testing

To test code:
1: Open a command prompt or shell terminal after install node.js.
2: Enter a node session, also known as REPL (Read-Evaluate-Print-Loop).
```
node
```
3: Run Unit Tests in test/StarNotaryTest.js

## EndPoints

GET star/:starTokenId
GET StarByTokenId Endpoint
Return a star by the star token ID. The endpoint must utilize a GET method with URL path for star token ID.

Response
The response for the endpoint should provide a star notary object in JSON format. 
eg. ["Star power 103!", "I love my wonderful star", "ra_032.155", "dec_121.874", "mag_245.978"]

Example POST response
For URL: http://localhost:8000/star/{starTokenId}

## Run WebService
Use starNotaryWebService.js. This runs on port 8000
