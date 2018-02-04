pragma solidity ^0.4.8;

import "./zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./zeppelin-solidity/contracts/token/ERC20.sol";

contract Airdrop is Ownable {
    /*
     * Storage
     */
    ERC20 public tokenReward;
    /// @dev Airdrop(): constructor for Airdrop contract
    /// @param _tokenAddress the address which owns the token
    function Airdrop(
        address _tokenAddress
    ) public {
        tokenReward = ERC20(_tokenAddress);
    }

    function adrop(address[] recipients, uint256[] values) public {
      for (uint256 i = 0; i < recipients.length; i++) {
        tokenReward.transfer(recipients[i], values[i]);
      }
    }


}
