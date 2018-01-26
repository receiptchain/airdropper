const Airdrop = artifacts.require('Airdrop');
const HumanStandardToken = artifacts.require('HumanStandardToken');

const fs = require(`fs`);
const BN = require(`bn.js`);
const HttpProvider = require('ethjs-provider-http');
const EthRPC = require('ethjs-rpc');
const EthQuery = require('ethjs-query');
const ethRPC = new EthRPC(new HttpProvider('http://localhost:7545'));
const ethQuery = new EthQuery(new HttpProvider('http://localhost:7545'));
const format = require('ethjs-format');

var getTotalSupply = function() {
  var promise = new Promise(function(resolve, reject) {
    HumanStandardToken
      .deployed()
      .then(function (instance) {
        return instance.totalSupply.call()
      })
      .then(function (result) {
        resolve(result.toNumber());
      })
      .catch(function(err) {
        reject(new Error(err));
      });
  });

  return promise;
}

var getEthereumBalanceOf = function(address) {
  return new Promise((resolve, reject) => {
    ethRPC.sendAsync(
      {
        method: 'eth_getBalance',
        params: [address, 'latest']
      }, function(err, res) {
      if (err !== undefined && err !== null) {
        reject(err);
      }

      var value = format.formatOutputs('eth_getBalance', res);
      resolve(value);
    });
  });
}

var getBalanceOf = function(address) {
  var promise = new Promise(function(resolve, reject) {
    HumanStandardToken
      .deployed()
      .then(function(token) {
        return token.balanceOf.call(address)
      })
      .then(function (result) {
        resolve(result.toNumber());
      })
      .catch(function(err) {
        reject(new Error(err));
      });
  });

  return promise;
}

var takeSnapshot = function() {
  return new Promise((resolve, reject) => {
    ethRPC.sendAsync({method: 'evm_snapshot'}, function(err, res) {
      if (err !== undefined && err !== null) {
        reject(err);
      }

      var id = parseInt(res, 16);
      resolve(id);
    });
  });
}

var resetSnapshot = function(id) {
  return new Promise((resolve, reject) => {
    ethRPC.sendAsync({method: 'evm_revert', params: [id]}, function(err) {
      if (err !== undefined && err !== null) {
        reject(err);
      }

      // console.log(err);
      resolve();
    });
  });
}

contract('Airdrop', function(accounts) {
  var tokenInstance;
  var instance;
  var snapshotId;
  var ownerAccount = accounts[0];
  var buyerAccount1 = accounts[1];
  var buyerAccount2 = accounts[2];
  var sendList = [accounts[1],accounts[2]];
  var sendAmounts = ['5000','5000'];
  var units = new BN('1000000000', 10);

  beforeEach(function(done) {
    takeSnapshot()
      .then(function(_snapshotId) {
        snapshotId = _snapshotId;

        HumanStandardToken
          .deployed()
          .then(function(_tokenInstance) {
            tokenInstance = _tokenInstance;

            Airdrop
              .new(
                tokenInstance.address,
                sendList,
                sendAmounts
              )
              .then(function(_instance) {
                instance = _instance;
                done();
              });
          });
      })
  });

  afterEach(function() {
    return resetSnapshot(snapshotId);
  });

  describe('when we call the airdrop again', function() {

    beforeEach(function() {
      return instance
        .adrop(
          tokenInstance.address,
          sendList,
          ['20','20'],
          {
            from: ownerAccount
          }
        );
    });

    it('should send 20 more to the two buyers', function() {
      return getBalanceOf(buyerAccount1)
        .then(function(result) {
          var expected = '5200';
          assert.equal(result, expected);
        });
    });
  });
});
