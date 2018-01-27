module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    main: {
      host: "127.0.0.1",
      port: 8545,
      from: '0x93D5Cd69C3D51DEd913BD0c6Bfb9474Fc5a5c352',
      gas: 4500000,
      gasPrice: 20000000000
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 4500000,
      gasPrice: 20000000000,
      from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'
    }
  }
};
