let DIDAbi =  [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "id",
        "type": "address"
      }
    ],
    "name": "CreatedDID",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "id",
        "type": "address"
      }
    ],
    "name": "DeletedDID",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "id",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newController",
        "type": "address"
      }
    ],
    "name": "SetController",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "id",
        "type": "address"
      },
      {
        "internalType": "bytes1[65]",
        "name": "key",
        "type": "bytes1[65]"
      },
      {
        "internalType": "enum DIDRegistry.KeyPurpose",
        "name": "_purpose",
        "type": "uint8"
      }
    ],
    "name": "addKey",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_subject",
        "type": "address"
      }
    ],
    "name": "createDID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "id",
        "type": "address"
      }
    ],
    "name": "deleteDID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "dids",
    "outputs": [
      {
        "internalType": "address",
        "name": "controller",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "created",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "updated",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "id",
        "type": "address"
      }
    ],
    "name": "getController",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "id",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getKey",
    "outputs": [
      {
        "internalType": "bytes1[65]",
        "name": "",
        "type": "bytes1[65]"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "id",
        "type": "address"
      }
    ],
    "name": "getKeysLength",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "id",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "removeKey",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "id",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "newController",
        "type": "address"
      }
    ],
    "name": "setController",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

module.exports = {
  DIDAbi
}