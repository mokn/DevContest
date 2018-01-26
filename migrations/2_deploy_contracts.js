var DevContest = artifacts.require("./DevContest.sol");
//var MPToken = artifacts.require("./MPToken.sol");

module.exports = function(deployer) {

  // deployer.deploy(MPToken).then(function() {
  //   return deployer.deploy(DevContest, MPToken.address, 1524106, 1723968, {gas:1000000});
  // }

  deployer.deploy(DevContest, "0xf7B098298f7C69Fc14610bf71d5e02c60792894C", 4942901, 4977461, {gas:5000000});
};
