// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import 'hardhat/console.sol';
error FileTransfer__InvalidIndex();

contract FileTransfer {
  struct File {
    string filename;
    string filehash;
  }

  mapping(address => File[]) private userFiles;

  event FileTransferred(
    address indexed sender,
    address indexed receiver,
    string filename,
    string filehash
  );

  function transferFile(
    address _receiver,
    string memory _filename,
    string memory _filehash
  ) public {
    console.log('Function: Transfering file %s to %s', _filename, _receiver);
    File memory newFile = File(_filename, _filehash);
    userFiles[_receiver].push(newFile);
    emit FileTransferred(msg.sender, _receiver, _filename, _filehash);
  }

  function getFileCount(address _user) public view returns (uint256) {
    return userFiles[_user].length;
  }

  function getFile(
    address _user,
    uint256 _index
  ) public view returns (string memory, string memory) {
    require(_index < userFiles[_user].length, 'Invalid Index');

    File memory file = userFiles[_user][_index];
    console.log(
      'Function: Getfile returned: filename: %s, filehash: %s',
      file.filename,
      file.filehash
    );
    return (file.filename, file.filehash);
  }
}
