/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "pilot essence camp habit treat idle deliver bomb another version ship act";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    },
     rinkeby: {
           provider: function() { 
             return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/654f6ad901824b248264bfd3e8b67972') 
           },
           network_id: '4',
           gas: 4500000,
           gasPrice: 10000000000,
         }
  }
};
