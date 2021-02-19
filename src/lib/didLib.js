const { ethers } = require("ethers");
const abi = require('../configurations/abi');

let didReg;

let KeyPurpose = {
    Authentication : 0,
    Signing : 1,
    Encryption : 2
}


//expects the smart contract address and a valid ethers signer
async function init(address, provider) {

    didReg = new ethers.Contract(address,abi.DIDAbi,provider);
  
}

async function getController(did) {
    return didReg.getController(did);
}

async function getDIDDocument(did) {
    let didArray = did.split(":")
    let id = didArray[3]

    let subject = id
    let controller = await getController(id) 

    let key0 = {
        id: did + '#key-0',
        type: 'secp256k1-koblitz',
        controller: controller,
        ethereumAddress: subject
    }
    
    let authentication = [];
    let pubKeys = []; 
    let keys = await getKeys(id);


    for(let i = 0; i < keys.length ; i++) {
        let pem = '0x'+ keys[i][0].toString('hex');
        let keyIndex=i+1
        let key = 
            {
                id: did + "#keys-" + keyIndex,
                "type": 'secp256k1-koblitz',
                "controller": controller,
                "publicKeyPem": pem
            };
        if (keys[i][1] == KeyPurpose.Authentication) authentication.push(key);
        else pubKeys.push(key);
    }

    let didDocument = {
        '@context': 'https://w3id.org/did/v1',
        did,
        publicKey: [
            key0
        ].concat(pubKeys),
        authentication
      }
    
    return didDocument
}


async function getKey(did, index) {
    let recKey = await didReg.getKey(did, index);
    let key = Buffer.from(recKey[0]);
    let purpose = recKey[1].toNumber();

    return [key, purpose];
}

async function getKeys(did) {
    let noKeys = await getKeysLength(did);

    let keys = [];

    for (i=0; i < noKeys; i++) {
        keys.push(await getKey(did, i)); 
    }

    return keys;
}

async function getKeysLength(did) {
    return didReg.getKeysLength(did);
}


module.exports = {
    init,
    getKeys,
    getDIDDocument,
    getController,
    getKeysLength,
    KeyPurpose
}