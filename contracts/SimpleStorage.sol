// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;

contract SimpleStorage {
  //quien la esta subiendo
  string ipfsHash;
  uint256 date;
  string nivel;
  string jrv;

  function set(string memory xhash, string memory nvl, string memory xjrv) public {
    ipfsHash = xhash;
    date = now;
    nivel = nvl;
    jrv =xjrv;
  }

  function get() public view returns (string memory) {
    return ipfsHash;
  }
}
