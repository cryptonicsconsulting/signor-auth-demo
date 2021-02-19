 //buttons and display id's


  var provider = null
  var signer = null


window.addEventListener('load', async () => {

  // Modern dapp browsers...
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum)

  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider)
  }
  // Non-dapp browsers...
  else {
    alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    window.location.href = "https://metamask.io/"
    return
  }

})


async function login() {
  try {

    //Will Start the MetaMask Extension
    await window.ethereum.enable()

    //Disable autorefreshing on network changes
    ethereum.autoRefreshOnNetworkChange = false


    signer = provider.getSigner()

    let currentAccount = await signer.getAddress((error,result) => {
        if(error) {
          console.log("error al recuperar la cuenta")
        } else {
          return result[0]
        }
    })

    let did = "signor:did:mainet:"+ currentAccount

    postData('http://localhost:5000/auth/pre_authentication', { did })
    .then(async data => {
     // sign the data received from server 
        let messageSigned = await signer.signMessage(data.randomString)
        let token = data.token
        postData('http://localhost:5000/auth/authentication', { did, messageSigned, token })
        .then(async data => {      
            if(data.msg.includes('succesfull')) {
                alert("You logged succesfully. Your DIDdocument is: \n " + JSON.stringify(data.didDocument,null,2))
            } else {
                alert("Authorization was not given")
            }
        })

    })

  } catch (error) {
    console.error(error)
  }
}

function networkChange(netID){
  switch(netID){
    case 1 : return "Main Ethereum Network"
    case 3 : return "Ropstern Test Network"
    case 4 : return "Rinkeby Test Network"
    case 5 : return "Goerli Test Network"
    case 42 : return "Kovan Test Network"
    default : return netID
  }
}

async function getAccount(){
  return  await signer.getAddress()
}


async function postData(url = '', data = {}) {
    
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })

    return response.json()
}