
let DIDContractAddress = '0xab732CE1b23b6d44bc3a3B87C7710A3f73E62b6d'

let deployer = "0x7F91554D2Cc6e44737672a542AaBa8C486Da738f"

let gasLimit = 1500000
let gasPrice = 60000000000

let ECCurve = 'secp256k1-koblitz'

let KeyPurpose = {
    Authentication : 0,
    Signing : 1,
    Encryption : 2
}

module.exports = {
    gasLimit,
    gasPrice,
    ECCurve,
    KeyPurpose,
    DIDContractAddress,
    deployer
}
