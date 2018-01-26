/* global artifacts */

const airdrop = artifacts.require('./airdrop.sol');
const fs = require('fs');

module.exports = (deployer) => {
  const tokenAddress = '0xd6e49800dECb64C0e195F791348C1e87a5864FD7';
  const addresses = ["0xd6e49800dECb64C0e195F791348C1e87a5864FD7","0xd6e49800dECb64C0e195F791348C1e87a5864FD7"];//0xd6e49800dECb64C0e195F791348C1e87a5864FD7 fs.readFileSync('./conf/addresses.txt');
  const values = [234,234];//fs.readFileSync('./conf/values.txt');

  return deployer.deploy(airdrop)
    .then((logs) => {
      if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs');
      }
      fs.writeFileSync('logs/logs.json', JSON.stringify(logs, null, 2));
    });
};
