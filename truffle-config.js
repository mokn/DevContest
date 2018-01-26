//var HDWalletProvider = require("./src/node_modules/truffle-hdwallet-provider");

//var mnemonic = "YOUR ACCOUNT MENOMIC HERE"
// e.g. "lamp kitchen cotton van whip happy reflect coil reef advance grow adapt

//var infurakey = "YOUR INFURA KEY HERE"
// Register at infura for a key

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    live: {
      host: "localhost",
      port: 8545,
      network_id: "1",
      from: "0x2cd02c6bfb7d36be9c98be275c5c30aa8d3848b8",
      gas:5000000
    }
  //,
  //   ropsten: {
  //     provider: function() {
  //       return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infurakey)
  //     },
  //     network_id: 3,
  //     gas: 4612388
  //   },
  //   rinkeby: {
  //     provider: function() {
  //       return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/" + infurakey)
  //     },
  //     network_id: 4
  //   }
   }
};
