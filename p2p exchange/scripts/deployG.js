const { ethers } = require("hardhat");

function getSelectors (contract) {
    // get the function signatures from the ABI of the contract:
    const signatures = Object.keys(contract.interface.functions)
    // convert from signature to selector:
    const selectors = signatures.reduce((acc, val) => {
      acc.push(contract.interface.getSighash(val))
      return acc
    }, [])
    return selectors
}

let diamond;
let diamondAddress;
let diamondCutFacet;
let diamondCutFacetAddress;
let diamondCutFacetSelectors;
let diamondLoupeFacet;
let diamondLoupeFacetAddress;
let diamondLoupeFacetSelectors;
let ownershipFacet;
let ownershipFacetAddress;
let ownershipFacetSelectors;    
let buyFacet;
let buyFacetAddreess;
let buyFacetSelectors;
let sellFacet;
let sellFacetAddress;
let sellFacetSelectors;
let withdrawFacet;
let withdrawFacetAddress;
let withdrawFacetSelectors;
let ownerActionFacet;
let ownerActionFacetAddress;
let ownerActionFacetSelectors;
let viewsFacet;
let viewsFacetAddress;
let viewsFacetSelectors;
let token
let tokenAddress
let ekoStable
let ekoStableAddress
let owner;
let ownerAddress;
let userOne;
let userOneAddress;
let userTwo;
let userTwoAddress;
let ekoBUSD
let ekoBUSDaddress
let ekoDAI
let ekoDAIaddress
let ekoUSDT
let ekoUSDTaddress

let ccST 
let ccSTAddress
let sdST
let sdSTaddress
let cmST
let cmSTaddress

async function scriptInit(){
    owner = ethers.provider.getSigner(0)
    ownerAddress = await owner.getAddress()
    console.log(`Owner address ${ownerAddress}`)
}


async function ownershipFacetDeploy(){
    ownershipFacet = await(await ethers.getContractFactory('OwnershipFacet', owner)).deploy()      
    await ownershipFacet.deployed()
    ownershipFacetAddress = ownershipFacet.address
    console.log(`Ownership facet deployed to: ${ownershipFacetAddress}`)

    ownershipFacetSelectors = getSelectors(ownershipFacet)
    console.log(`Ownership facet selectors: `,ownershipFacetSelectors)
}

async function diamondCutFacetDeploy(){
    diamondCutFacet = await(await ethers.getContractFactory('DiamondCutFacet', owner)).deploy()
    await diamondCutFacet.deployed()
    diamondCutFacetAddress = diamondCutFacet.address 
    console.log(`Diamond cut facet deployed to: ${diamondCutFacetAddress}`)

    diamondCutFacetSelectors = getSelectors(diamondCutFacet)
    console.log(`Diamond cut facet selectors: ${[diamondCutFacetSelectors]}`)    
}

async function diamondLoupeFacetDeploy(){
    diamondLoupeFacet = await(await ethers.getContractFactory(`DiamondLoupe`, owner)).deploy()
    await diamondLoupeFacet.deployed()
    diamondLoupeFacetAddress = diamondLoupeFacet.address
    console.log(`Diamond loupe facet deployed to address: ${diamondLoupeFacetAddress}`)

    diamondLoupeFacetSelectors = getSelectors(diamondLoupeFacet)
    console.log(`Diamond loupe facet selectos: ${diamondLoupeFacetSelectors}`)      
}

async function diamondContractDeploy(){
    let diamondCutFacetStruct = {
        facetAddress: diamondCutFacetAddress,
        functionSelectors: diamondCutFacetSelectors,
        action: 0,
    }

    let diamonLoupeFacetStruct = {
        facetAddress: diamondLoupeFacetAddress,
        functionSelectors: diamondLoupeFacetSelectors,
        action: 0,
    }

    let diamondOwnershipFacetStruct = {
        facetAddress: ownershipFacetAddress,
        functionSelectors: ownershipFacetSelectors,
        action: 0,
    }

    diamond = await(await ethers.getContractFactory('DiamondExchange', owner)).deploy([diamondCutFacetStruct, diamonLoupeFacetStruct, diamondOwnershipFacetStruct])
    await diamond.deployed()
    diamondAddress = diamond.address
    console.log(`Diamond deployed to: ${diamondAddress}`)
}

async function buyFacetDeploy(){
    buyFacet = await(await ethers.getContractFactory('BuyScoreTokenFacet', owner)).deploy()
    await buyFacet.deployed()
    buyFacetAddreess = buyFacet.address
    console.log(`Buy facet deployed to: ${buyFacetAddreess}`)
    buyFacetSelectors = getSelectors(buyFacet)
    console.log(`Buy Facet selectors ${buyFacetSelectors}`)
}

async function sellFacetDeploy(){
    sellFacet = await(await ethers.getContractFactory('SellScoreTokenFacet', owner)).deploy()
    await sellFacet.deployed()
    sellFacetAddress = sellFacet.address
    console.log(`Sell facet deployed to address: ${sellFacetAddress}`)
    sellFacetSelectors = getSelectors(sellFacet)
    console.log(`Sell facet selectors: ${sellFacetSelectors}`)
}

async function withdrawFacetDeploy(){
    withdrawFacet = await(await ethers.getContractFactory('WithdrawFacet', owner,)).deploy()
    await withdrawFacet.deployed()
    withdrawFacetAddress = withdrawFacet.address
    console.log(`withdraw facet deployed to ${withdrawFacetAddress}`)

    withdrawFacetSelectors = getSelectors(withdrawFacet)
    console.log(`Withdraw facet selectors: ${withdrawFacetSelectors}`)
}

async function ownerActionDeploy(){
    ownerActionFacet = await(await ethers.getContractFactory('OwnerActionFacet', owner)).deploy()
    ownerActionFacetAddress = ownerActionFacet.address
    console.log(`Owner action facet deployed to ${ownerActionFacetAddress}`)

    ownerActionFacetSelectors = getSelectors(ownerActionFacet)
    console.log(`Owner actions facet selectors: ${ownerActionFacetSelectors}`)
}

async function viewLibraryDeploy(){
    viewsFacet = await(await ethers.getContractFactory('ViewsFacet', owner)).deploy()
    await viewsFacet.deployed()
    viewsFacetAddress = viewsFacet.address
    console.log(`Views facet deployed to ${viewsFacetAddress}`)

    viewsFacetSelectors = getSelectors(viewsFacet)
    console.log(`View facet selectors: ${viewsFacetSelectors}`)
}

async function cutNewFacet(){
    let buyFacetStruct = {
        facetAddress: buyFacetAddreess,
        functionSelectors: buyFacetSelectors,
        action: 0,
    }
    let sellFacetStruct = {
        facetAddress: sellFacetAddress,
        functionSelectors: sellFacetSelectors,
        action: 0,
    }
    let ownerActionStruct = {
        facetAddress: ownerActionFacetAddress,
        functionSelectors: ownerActionFacetSelectors,
        action: 0,
    }
    let viewsFacetStruct = {
        facetAddress: viewsFacetAddress,
        functionSelectors: viewsFacetSelectors,
        action: 0,
    }
    let withdrawFacetStruct = {
        facetAddress: withdrawFacetAddress,
        functionSelectors: withdrawFacetSelectors,
        action: 0,
    }

    const diamCut = await ethers.getContractAt('DiamondCutFacet', diamondAddress, owner)
    await diamCut.diamondCut([buyFacetStruct, sellFacetStruct, ownerActionStruct, viewsFacetStruct, withdrawFacetStruct])
    console.log(`Diamond cut succesfully`)
}

async function deployEkoStableAndScoreTokens(){
    token = await( await ethers.getContractFactory('scoreToken', owner)).deploy()
    await token.deployed()
    tokenAddress = token.address
    console.log(`scoreToken deployed to ${tokenAddress}`)

    ekoStable = await(await ethers.getContractFactory('ekoStable', owner)).deploy()
    await ekoStable.deployed()
    ekoStableAddress = ekoStable.address
    console.log(`ekoStable deployed to ${ekoStableAddress}`)

    ekoBUSD = await(await ethers.getContractFactory('ekoBUSD', owner)).deploy()
    await ekoBUSD.deployed()
    ekoBUSDaddress = ekoBUSD.address
    console.log(`ekoBUSD deployed to ${ekoBUSDaddress}`)

    ekoDAI = await(await ethers.getContractFactory('ekoDAI', owner)).deploy()
    await ekoDAI.deployed()
    ekoDAIaddress =ekoDAI.address
    console.log(`ekoDAI deployed to ${ekoDAIaddress}`)

    ekoUSDT = await(await ethers.getContractFactory('ekoUSDT', owner)).deploy()
    await ekoUSDT.deployed()
    ekoUSDTaddress = ekoUSDT.address
    console.log(`ekoUSDT deployed to ${ekoUSDTaddress}`)

    ccST = await(await ethers.getContractFactory('CCscoreToken', owner)).deploy()
    await ccST.deployed()
    ccSTAddress = ccST.address
    console.log(`Content Creator ST deployed to ${ccSTAddress}`)

    sdST = await(await ethers.getContractFactory('SDscoreToken', owner)).deploy()
    await sdST.deployed()
    sdSTaddress = sdST.address
    console.log(`Solidity Developer ST deployed to ${sdSTaddress}`)

    cmST = await(await ethers.getContractFactory('CMscoreToken', owner)).deploy()
    await cmST.deployed()
    cmSTaddress = cmST.address
    console.log(`Community Manager ST deployed to ${cmSTaddress}`)
}

async function createTwoUsers(){
    userOne = ethers.provider.getSigner(1)
    userOneAddress = await userOne.getAddress()
    console.log(`User one address ${userOneAddress}`)

    userTwo = ethers.provider.getSigner(2)
    userTwoAddress = await userTwo.getAddress()
    console.log(`User two address ${userTwoAddress}`)
}

async function fundingUsers(){
    var tx = await token.connect(owner).transfer(userOneAddress, '100000000000')
    await tx.wait()
    tx = await ekoStable.connect(owner).transfer(userOneAddress, '1000000000')
    await tx.wait()
    console.log(`User one scoreToken balance: ${await token.balanceOf(userOneAddress)}, ekoUSDT balance: ${await ekoStable.balanceOf(userOneAddress)}`)
    
    tx = await token.connect(owner).transfer(userTwoAddress, '100000000000')
    await tx.wait()
    tx = await ekoStable.connect(owner).transfer(userTwoAddress, '1000000000')
    await tx.wait()
    console.log(`User two scoreToken balance: ${await token.balanceOf(userTwoAddress)}, ekoUSDT balance: ${await ekoStable.balanceOf(userTwoAddress)}`)
    
    tx = await ekoBUSD.connect(owner).transfer(userOneAddress, '1000000')
    await tx.wait()
    tx = await ekoDAI.connect(owner).transfer(userOneAddress, '1000000')
    await tx.wait()
    tx = await ekoUSDT.connect(owner).transfer(userOneAddress, '1000000')
    await tx.wait()

    tx = await ccST.connect(owner).transfer(userOneAddress, '10000000000')
    await tx.wait()
    tx = await sdST.connect(owner).transfer(userOneAddress, '10000000000')
    await tx.wait()
    tx = await cmST.connect(owner).transfer(userOneAddress, '10000000000')
    await tx.wait()
        
    let busdbal = await ekoBUSD.balanceOf(userOneAddress)
    let daibal = await ekoDAI.balanceOf(userOneAddress)
    let usdtbal = await ekoUSDT.balanceOf(userOneAddress)
    let ccbal = await ccST.balanceOf(userOneAddress)
    let sdbal = await sdST.balanceOf(userOneAddress)
    let cmbal = await cmST.balanceOf(userOneAddress)
    console.log(`User 1 balances ekoBUSD: ${busdbal}, ekoDAI: ${daibal}, usdtBal: ${usdtbal}, CCST bal: ${ccbal}, SDST bal: ${sdbal}, CMST bal: ${cmbal}`)

    tx = await ekoBUSD.connect(owner).transfer(userTwoAddress, '1000000')
    await tx.wait()
    tx = await ekoDAI.connect(owner).transfer(userTwoAddress, '1000000')
    await tx.wait()
    tx = await ekoUSDT.connect(owner).transfer(userTwoAddress, '1000000')
    await tx.wait()

    tx = await ccST.connect(owner).transfer(userTwoAddress, '10000000000')
    await tx.wait()
    tx = await sdST.connect(owner).transfer(userTwoAddress, '10000000000')
    await tx.wait()
    tx = await cmST.connect(owner).transfer(userTwoAddress, '10000000000')
    await tx.wait()

    let busdbalz = await ekoBUSD.balanceOf(userTwoAddress)
    let daibalz = await ekoDAI.balanceOf(userTwoAddress)
    let usdtbalz = await ekoUSDT.balanceOf(userTwoAddress)
    let ccbalz = await ccST.balanceOf(userTwoAddress)
    let sdbalz = await sdST.balanceOf(userTwoAddress)
    let cmbalz = await cmST.balanceOf(userTwoAddress)
    console.log(`User 2 balances ekoBUSD: ${busdbalz}, ekoDAI: ${daibalz}, usdtBal: ${usdtbalz}, CCST bal: ${ccbalz}, SDST bal: ${sdbalz}, CMST bal: ${cmbalz}`)
}

async function addAcceptedEkoStable(){
    const ownerActionFacet = await ethers.getContractAt('OwnerActionFacet', diamondAddress, owner)
    await ownerActionFacet.addEkostable(ekoStableAddress)
    await ownerActionFacet.addEkostable(ekoBUSDaddress)
    await ownerActionFacet.addEkostable(ekoUSDTaddress)
    await ownerActionFacet.addEkostable(ekoDAIaddress)

    const viewFacet = await ethers.getContractAt('ViewsFacet', diamondAddress, owner)
    let acceptedStables = await viewFacet.getAcceptedEkoStables()
    console.log(`Accepted stables: ${acceptedStables}`)     
}

async function addScoreTokens(){
    const ownerActionFacet = await ethers.getContractAt('OwnerActionFacet', diamondAddress, owner)
    await ownerActionFacet.addScoreToken(tokenAddress)
    await ownerActionFacet.addScoreToken(cmSTaddress)
    await ownerActionFacet.addScoreToken(sdSTaddress)
    await ownerActionFacet.addScoreToken(ccSTAddress)

    const viewFacet = await ethers.getContractAt('ViewsFacet', diamondAddress, owner)
    let acceptedST = await viewFacet.getAcceptedScoreTokens()
    console.log(`Accepted score tokens: ${acceptedST}`)       
}

async function fiveBuyOrdersUserOne(){
    var scoreAmount = '1000'
    var ekoStableAmount = '10'

    var app =await ekoStable.connect(userOne).approve(diamondAddress, ekoStableAmount)
    await app.wait()
    const buyFacet = await ethers.getContractAt('BuyScoreTokenFacet', diamondAddress, userOne)
    var tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, tokenAddress, scoreAmount)
    await tx.wait()
    console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

    scoreAmount = '1500'
    ekoStableAmount = '10'

    app = await ekoStable.connect(userOne).approve(diamondAddress, ekoStableAmount)    
    await app.wait()  
    tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, tokenAddress, scoreAmount)
    await tx.wait()
    console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

    scoreAmount = '2000'
    ekoStableAmount = '20'

    app = await ekoStable.connect(userOne).approve(diamondAddress, ekoStableAmount)   
    await app.wait()    
    tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, tokenAddress, scoreAmount)
    await tx.wait()
    console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

    scoreAmount = '2500'
    ekoStableAmount = '25'

    app = await ekoStable.connect(userOne).approve(diamondAddress, ekoStableAmount)    
    await app.wait()    
    tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, tokenAddress, scoreAmount)
    await tx.wait()
    console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

    scoreAmount = '3000'
    ekoStableAmount = '30'

    app = await ekoStable.connect(userOne).approve(diamondAddress, ekoStableAmount)   
    await app.wait()     
    tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, tokenAddress, scoreAmount)
    await tx.wait()
    console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)
}

async function fiveSellOrderUserOne(){
    var scoreAmount = '1000'
    var ekoStableAmount = '10' 
   
    var app = await token.connect(userOne).approve(diamondAddress, scoreAmount)
    await app.wait()
    const sellFacet = await ethers.getContractAt('SellScoreTokenFacet', diamondAddress, userOne)
    var tx = await sellFacet.createSellScoreTokenOrder(tokenAddress, scoreAmount, ekoStableAddress, ekoStableAmount)
    await tx.wait()
    console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)

    scoreAmount = '1500'
    ekoStableAmount = '15' 
   
    app = await token.connect(userOne).approve(diamondAddress, scoreAmount)
    await app.wait()
    tx = await sellFacet.createSellScoreTokenOrder(tokenAddress, scoreAmount, ekoStableAddress, ekoStableAmount)
    await tx.wait()
    console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)
    
    scoreAmount = '2000'
    ekoStableAmount = '20' 
   
    app = await token.connect(userOne).approve(diamondAddress, scoreAmount)
    await app.wait()
    tx =await sellFacet.createSellScoreTokenOrder(tokenAddress, scoreAmount, ekoStableAddress, ekoStableAmount)
    await tx.wait()
    console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)

    scoreAmount = '2500'
    ekoStableAmount = '25' 
   
    app = await token.connect(userOne).approve(diamondAddress, scoreAmount)
    await app.wait()
    tx =await sellFacet.createSellScoreTokenOrder(tokenAddress, scoreAmount, ekoStableAddress, ekoStableAmount)
    await tx.wait()
    console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)

    scoreAmount = '3000'
    ekoStableAmount = '30' 
   
    app = await token.connect(userOne).approve(diamondAddress, scoreAmount)
    await app.wait()
    tx =await sellFacet.createSellScoreTokenOrder(tokenAddress, scoreAmount, ekoStableAddress, ekoStableAmount)
    await tx.wait()
    console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)

}

async function fiveBuyOrdersUserTwo(){
    var scoreAmount = '1000'
    var ekoStableAmount = '10'

   var app = await ekoStable.connect(userTwo).approve(diamondAddress, ekoStableAmount)
    await app.wait()
    const buyFacet = await ethers.getContractAt('BuyScoreTokenFacet', diamondAddress, userTwo)
    var tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, tokenAddress, scoreAmount)
    await tx.wait()
    console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

    scoreAmount = '1500'
    ekoStableAmount = '10'

    app = await ekoStable.connect(userTwo).approve(diamondAddress, ekoStableAmount) 
    await app.wait()     
    tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, tokenAddress, scoreAmount)
    await tx.wait()
    console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

    scoreAmount = '2000'
    ekoStableAmount = '20'

    app =  await ekoStable.connect(userTwo).approve(diamondAddress, ekoStableAmount)     
    await app.wait()  
    tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, tokenAddress, scoreAmount)
    await tx.wait()
    console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

    scoreAmount = '2500'
    ekoStableAmount = '25'

    app = await ekoStable.connect(userTwo).approve(diamondAddress, ekoStableAmount)     
    await app.wait()   
    tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, tokenAddress, scoreAmount)
    await tx.wait()
    console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

    scoreAmount = '3000'
    ekoStableAmount = '30'

    app = await ekoStable.connect(userTwo).approve(diamondAddress, ekoStableAmount)      
    await app.wait()  
    tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, tokenAddress, scoreAmount)
    await tx.wait()
    console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)  

}

async function fiveSellOrderUserTwo(){
    var scoreAmount = '1000'
    var ekoStableAmount = '10' 
   
    var app = await token.connect(userTwo).approve(diamondAddress, scoreAmount)
    await app.wait()
    const sellFacet = await ethers.getContractAt('SellScoreTokenFacet', diamondAddress, userTwo)
    var tx = await sellFacet.createSellScoreTokenOrder(tokenAddress, scoreAmount, ekoStableAddress, ekoStableAmount)
    await tx.wait()
    console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)

    scoreAmount = '1500'
    ekoStableAmount = '15' 
   
    app = await token.connect(userTwo).approve(diamondAddress, scoreAmount)
    await app.wait()
    tx = await sellFacet.createSellScoreTokenOrder(tokenAddress, scoreAmount, ekoStableAddress, ekoStableAmount)
    await tx.wait()
    console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)
    
    scoreAmount = '2000'
    ekoStableAmount = '20' 
   
    app = await token.connect(userTwo).approve(diamondAddress, scoreAmount)
    await app.wait()
    tx = await sellFacet.createSellScoreTokenOrder(tokenAddress, scoreAmount, ekoStableAddress, ekoStableAmount)
    await tx.wait()
    console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)

    scoreAmount = '2500'
    ekoStableAmount = '25' 
   
    app = await token.connect(userTwo).approve(diamondAddress, scoreAmount)
    await app.wait()
    tx = await sellFacet.createSellScoreTokenOrder(tokenAddress, scoreAmount, ekoStableAddress, ekoStableAmount)
    await tx.wait()
    console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)

    scoreAmount = '3000'
    ekoStableAmount = '30' 
   
    app = await token.connect(userTwo).approve(diamondAddress, scoreAmount)
    await app.wait()
    tx =  await sellFacet.createSellScoreTokenOrder(tokenAddress, scoreAmount, ekoStableAddress, ekoStableAmount)
    await tx.wait()
    console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)

}

async function sellOrderForEachSTuserone(){
    var scoreAmount = '1000'
    var ekoStableAmount = '10' 
    const sellFacet = await ethers.getContractAt('SellScoreTokenFacet', diamondAddress, userOne)
    var app = await ccST.connect(userOne).approve(diamondAddress, scoreAmount)
    await app.wait()
    var ord = await sellFacet.createSellScoreTokenOrder(ccSTAddress, scoreAmount, ekoBUSDaddress, ekoStableAmount)
    await ord.wait()
    app = await sdST.connect(userOne).approve(diamondAddress, scoreAmount)
    await app.wait()
    ord = await sellFacet.createSellScoreTokenOrder(sdSTaddress, scoreAmount, ekoDAIaddress, ekoStableAmount)
    await ord.wait()
    app = await cmST.connect(userOne).approve(diamondAddress, scoreAmount)
    await app.wait()
    ord = await sellFacet.createSellScoreTokenOrder(cmSTaddress, scoreAmount, ekoUSDTaddress, ekoStableAmount)
    await ord.wait()
    const viewFacet = await ethers.getContractAt('ViewsFacet', diamondAddress, owner)
        let sellOrders = await viewFacet.getLatestSellOrders(3)
        for(let i = 0; i < sellOrders.length; i++){
            console.log(await viewFacet.getOrderByOrderId(sellOrders[i]))            
        }  
}

async function buyOrderForEachESusertwo(){
    var scoreAmount = '1000'
    var ekoStableAmount = '10'
    const buyFacet = await ethers.getContractAt('BuyScoreTokenFacet', diamondAddress, userTwo)
    var app = await ekoBUSD.connect(userTwo).approve(diamondAddress, ekoStableAmount)
    await app.wait()
    var tx =await buyFacet.createBuyScoreTokensOrder(ekoBUSDaddress, ekoStableAmount, ccSTAddress, scoreAmount)
    await tx.wait()
    app = await ekoUSDT.connect(userTwo).approve(diamondAddress, ekoStableAmount)
    await app.wait()
    tx = await buyFacet.createBuyScoreTokensOrder(ekoUSDTaddress, ekoStableAmount, cmSTaddress, scoreAmount)
    await tx.wait()
    app = await ekoDAI.connect(userTwo).approve(diamondAddress, ekoStableAmount)
    await app.wait()
    tx = await buyFacet.createBuyScoreTokensOrder(ekoDAIaddress, ekoStableAmount, sdSTaddress, scoreAmount)
    await tx.wait()
    const viewFacet = await ethers.getContractAt('ViewsFacet', diamondAddress, owner)
    let buyOrders = await viewFacet.getLatestBuyOrders(3)
    for(let i = 0; i < buyOrders.length; i++){
        console.log(await viewFacet.getOrderByOrderId(buyOrders[i]))            
    } 
}

/* async function recoverSmartContract(){
    diamondAddress = '0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280'

    ekoBUSDaddress = '0xF36306e36bbB2880587880a7950C76dF5c46d91C'
    ekoDAIaddress = '0xE5e80dc8fC08814bAA652B126F71eA73213a261e'
    ekoUSDTaddress = '0x3a8A53F8fA76BCEA2e5500A297Ec57Ac0693a944'

    ccSTAddress = '0x2E26f9edFfbC827c6Ad956ca2630590b461FeA65'
    cmSTaddress = '0x38981DD4CC4f535591273d08BE11504572342E25'
    sdSTaddress = '0x7f90aA953958f8Ae58470a8015a21a1E432Df940'


    owner = ethers.provider.getSigner(0)
    userTwo = ethers.provider.getSigner(2)
    diamond = (await ethers.getContractFactory('DiamondExchange', owner)).attach(diamondAddress)    
    ekoBUSD = (await ethers.getContractFactory('ekoBUSD', owner)).attach(ekoBUSDaddress)
    ekoDAI = (await ethers.getContractFactory('ekoDAI', owner).attach(ekoDAIaddress))
    ekoUSDT = (await ethers.getContractFactory('ekoUSDT', owner)).attach(ekoUSDTaddress)
} */


async function runAction(steps){
    switch(steps){
        case 1:
            await ownershipFacetDeploy()
            await diamondCutFacetDeploy()
            await diamondLoupeFacetDeploy()
            await diamondContractDeploy()
            await buyFacetDeploy()
            await sellFacetDeploy()
            await withdrawFacetDeploy()
            await ownerActionDeploy()
            await viewLibraryDeploy()
            await cutNewFacet()
            await deployEkoStableAndScoreTokens()
            await createTwoUsers()
            await fundingUsers()
            await addAcceptedEkoStable()
            await addScoreTokens()
            await fiveBuyOrdersUserOne()
            await fiveSellOrderUserOne()
            await fiveBuyOrdersUserTwo()
            await fiveSellOrderUserTwo()
            await sellOrderForEachSTuserone()
            await buyOrderForEachESusertwo()
        case 2:
            await recoverSmartContract()
            await buyOrderForEachESusertwo()

    }
}

async function run(){
    await scriptInit()

    const stepToExe = [1]
    for (let i = 0; i < stepToExe.length; i++) {
        currentStep = stepToExe[i];
        await runAction(currentStep);
      }
      console.log("all done");
}

run();