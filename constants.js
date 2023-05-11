export const contractAddress = '0xdbd98fe71eba76e665c3a152fb7eae41e1c9eadb';
export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'filename',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'filehash',
        type: 'string',
      },
    ],
    name: 'FileTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
    ],
    name: 'getFile',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getFileCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_filename',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_filehash',
        type: 'string',
      },
    ],
    name: 'transferFile',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
