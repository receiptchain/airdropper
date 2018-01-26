/* global artifacts */

const airdrop = artifacts.require('./airdrop.sol');
const fs = require('fs');

module.exports = (deployer) => {
  const tokenAddress = 0xd6e49800dECb64C0e195F791348C1e87a5864FD7;
  const addresses = ['0xeE8ca0526072DEE744c390e6970551C09CECe34F',"0xd6e49800dECb64C0e195F791348C1e87a5864FD7"];//fs.readFileSync('./conf/addresses.txt');
  const values = ['6000','453'];//fs.readFileSync('./conf/values.txt');

  return deployer.deploy(airdrop,
    tokenAddress,
    addresses,
    values
  )
    .then((logs) => {
      if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs');
      }
      fs.writeFileSync('logs/logs.json', JSON.stringify(logs, null, 2));
    });
};
