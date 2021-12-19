// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;

contract SimpleStorage {
  struct Acta {
    bool exists;
    string ipfsHash;
    uint256 date;
    //string jrv;
    address sender;
  }

  mapping(string => mapping(string => Acta)) Actas;

  function addActa(string memory _ipfsHash, string memory _nivel, string memory _jrv) public {
    Actas[_jrv][_nivel] = Acta({exists: true, ipfsHash: _ipfsHash, date: block.timestamp, sender: msg.sender});
  }

  function get(string memory _jrv, string memory _nivel) public view returns (Acta memory) {
    return Actas[_jrv][_nivel];
  }
}
