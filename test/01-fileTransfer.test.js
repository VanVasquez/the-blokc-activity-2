const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('FileTransfer', () => {
  let fileTransferContract;
  let owner, receiver;

  beforeEach(async () => {
    const FileTransfer = await ethers.getContractFactory('FileTransfer');
    fileTransferContract = await FileTransfer.deploy();

    [owner, receiver] = await ethers.getSigners();
  });

  it('should transfer a file and emit an event', async () => {
    const filename = 'test.txt';
    const filehash = '0x123abc';

    await expect(fileTransferContract.transferFile(receiver.address, filename, filehash))
      .to.emit(fileTransferContract, 'FileTransferred')
      .withArgs(owner.address, receiver.address, filename, filehash);

    const fileCount = await fileTransferContract.getFileCount(receiver.address);
    expect(fileCount).to.equal(1);

    // Retrieve the transferred file
    const [transferredFilename, transferredFilehash] = await fileTransferContract.getFile(
      receiver.address,
      0
    );
    // Check the correctness of the transferred file details
    expect(transferredFilename).to.equal(filename);
    expect(transferredFilehash).to.equal(filehash);
  });

  it('should revert when retrieving a file with an invalid index', async function () {
    const invalidIndex = 0;

    // Perform the file retrieval with an invalid index
    await expect(fileTransferContract.getFile(receiver.address, invalidIndex)).to.be.revertedWith(
      'Invalid Index'
    );
  });
});
