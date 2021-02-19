const jwtUtils = require("../utils/jwt.utils")
const { ethers } = require("ethers")

let { DIDContractAddress } = require('../configurations/constants')
const didLib = require("../lib/didLib")

let provider = new ethers.providers.InfuraProvider('rinkeby')
didLib.init(DIDContractAddress, provider)

exports.pre_authentication = function (req, res, next) {
  
  let did = req.body.did
  let randomBytes =  ethers.utils.randomBytes(64)
  let randomString =  ethers.utils.hexlify(randomBytes)


  let claims = {
    did : did,
    msgToSign : randomString
  }

  let token = jwtUtils.createToken(claims)
  res.status(200).set("Authorization",token).send({randomString : randomString,token})
  next()
}

exports.authentication = async function (req, res, next) {

    // retrieve data from token 

  let token = req.body.token

  if (!token) return res.status(401).send({ error: "Unauthorized" })
  let decoded = jwtUtils.isValid(token)
  if (!decoded) return res.status(401).send({ error: "Unauthorized" })

  //find the address that signed the message

  let messageSigned = req.body.messageSigned
  if(messageSigned == undefined || messageSigned == null || messageSigned == "") { return res.status(401).send({ error: "Unauthorized" }) }
  let address = await ethers.utils.verifyMessage(decoded.msgToSign, messageSigned)
  

  //find the address associated to the did in the public registry

  let didDocument = await didLib.getDIDDocument(decoded.did)

  let addressOnDIDregistry = didDocument.publicKey[0].controller

  
  //Check that the address retrieved from the signature is the same as the address associated to the did
  
  if(addressOnDIDregistry != "0x0000000000000000000000000000000000000000") {
    let claims = {}
    claims.did = decoded.did
    claims.role = "USER"
    let token = jwtUtils.createToken(claims)  
    return res.status(200).set("Authorization",token).send({ msg: "Authentication succesfull", didDocument })  
  
  }else{
    return res.status(401).send({ msg: "Unauthorized" })
  }  
}