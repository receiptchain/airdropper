/* global artifacts */

// const HumanStandardToken = artifacts.require('./HumanStandardToken.sol');
// const fs = require('fs');
// const BN = require('bn.js');
//
// module.exports = (deployer) => {
//   const conf = JSON.parse(fs.readFileSync('./conf/development.json'));
//
//   return deployer.deploy(HumanStandardToken,
//     conf.initialAmount,
//     conf.tokenName,
//     conf.decimalUnits,
//     conf.tokenSymbol
//   )
//     .then((logs) => {
//       if (!fs.existsSync('logs')) {
//         fs.mkdirSync('logs');
//       }
//       fs.writeFileSync('logs/logs.json', JSON.stringify(logs, null, 2));
//     });
// };
