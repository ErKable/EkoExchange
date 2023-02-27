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

    async function scriptInit(){
        owner = ethers.provider.getSigner(1)
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
        console.log(`Token deployed to ${tokenAddress}`)

        ekoStable = await(await ethers.getContractFactory('ekoUSDT', owner)).deploy()
        await ekoStable.deployed()
        ekoStableAddress = ekoStable.address
        console.log(`ekoUSDT deployed to ${ekoStableAddress}`)
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
    }

    async function addAcceptedEkoStable(){
        const ownerActionFacet = await ethers.getContractAt('OwnerActionFacet', diamondAddress, owner)
        await ownerActionFacet.addEkostable(ekoStableAddress)

        const viewFacet = await ethers.getContractAt('ViewsFacet', diamondAddress, owner)
        let isAccepted = await viewFacet.getAcceptedEkoStable(ekoStableAddress)
        
    }

    async function setScoreTokenAddress(){
        const ownerActionFacet = await ethers.getContractAt('OwnerActionFacet', diamondAddress, owner)
        await ownerActionFacet.setScoreTokenAddress(tokenAddress)

        const viewFacet = await ethers.getContractAt('ViewsFacet', diamondAddress, owner)
        let stAddress = await viewFacet.getScoreTokenAddress()
           
    }

    async function createOneBuyOrderWithUserOne(){
        let scoreAmount = '1000'
        let ekoStableAmount = '10' 

        let userOneEkoStableAmountBef = await ekoStable.balanceOf(userOneAddress)
        let contractEkoAmountBef = await ekoStable.balanceOf(diamondAddress)
       
        console.log(`UserOne ekostable balance before: ${userOneEkoStableAmountBef}, Contract balance ${contractEkoAmountBef}`)

        let app = await ekoStable.connect(userOne).approve(diamondAddress, ekoStableAmount)
        await app.wait()
        const buyFacet = await ethers.getContractAt('BuyScoreTokenFacet', diamondAddress, userOne)
        
        /* let buyId = await buyFacet.callStatic.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, scoreAmount)
        console.log(buyId) */
        let tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, scoreAmount)
        await tx.wait()
       
        let userOneEkoStableAmountAf = await ekoStable.balanceOf(userOneAddress)
        let contractEkoAmountAf = await ekoStable.balanceOf(diamondAddress)
       
        console.log(`UserOne ekostable balance before: ${userOneEkoStableAmountAf}, Contract balance ${contractEkoAmountAf}`)
    }

    async function sellToUserOneWithUserTwo(){
        let scoreAmount = '1000'
        let ekoStableAmount = '10' 

        let userOneSTbalBef = await token.balanceOf(userOneAddress)
        let userOneESbalBef = await ekoStable.balanceOf(userOneAddress)
        console.log(`User one balances before ST: ${userOneSTbalBef}, ES: ${userOneESbalBef}`)
        
        let userTwoSTbalBef = await token.balanceOf(userTwoAddress)
        let userTwoESbalBef = await ekoStable.balanceOf(userTwoAddress)
        console.log(`User two balances before, ST: ${userTwoSTbalBef}, ES: ${userTwoESbalBef}`)

        let contractESbalbef = await ekoStable.balanceOf(diamondAddress)
        console.log(`Contract ekoUSDT bal bef: ${contractESbalbef}`)

        let app = await token.connect(userTwo).approve(diamondAddress, scoreAmount)
        await app.wait()

        const buyFacet = await ethers.getContractAt('BuyScoreTokenFacet', diamondAddress, userTwo)
        let tx = await buyFacet.sellScoreTokenToABuyOrder(0)
        await tx.wait()


        let userOneSTbalAf = await token.balanceOf(userOneAddress)
        let userOneESbalAf = await ekoStable.balanceOf(userOneAddress)
        console.log(`User one balances before ST: ${userOneSTbalAf}, ES: ${userOneESbalAf}`)
        
        let userTwoSTbalAf = await token.balanceOf(userTwoAddress)
        let userTwoESbalAf = await ekoStable.balanceOf(userTwoAddress)
        console.log(`User two balances before, ST: ${userTwoSTbalAf}, ES: ${userTwoESbalAf}`)

        let contractESbalAf = await ekoStable.balanceOf(diamondAddress)
        console.log(`Contract ekoUSDT bal bef: ${contractESbalAf}`)
    }
    async function createOneSellOrderWithUserOne(){
        let scoreAmount = '1000'
        let ekoStableAmount = '10' 

        let userSTAmBef = await token.balanceOf(userOneAddress)
        console.log(`User one st amount before: ${userSTAmBef}`)

        let contractSTAmbef = await token.balanceOf(diamondAddress)
        console.log(`contract ST amount before: ${contractSTAmbef}`)

        let app = await token.connect(userOne).approve(diamondAddress, scoreAmount)
        await app.wait()

        const sellFacet = await ethers.getContractAt('SellScoreTokenFacet', diamondAddress, userOne)
        let sell = await sellFacet.createSellScoreTokenOrder(scoreAmount, ekoStableAddress, ekoStableAmount)
        await sell.wait()

        let userSTAmAf = await token.balanceOf(userOneAddress)
        console.log(`User one ST balance after: ${userSTAmAf}`)

        let contractSTAmAf = await token.balanceOf(diamondAddress)
        console.log(`contract ST balance after: ${contractSTAmAf}`)
    }

    async function selleToUserOneSellOrderWithUserTwo(){
        let scoreAmount = '1000'
        let ekoStableAmount = '10' 

        let userOneSTbalBef = await token.balanceOf(userOneAddress)
        let userOneESbalBef = await ekoStable.balanceOf(userOneAddress)
        console.log(`User one balances before, ST: ${userOneSTbalBef}, ES: ${userOneESbalBef}`)

        let userTwoSTbalBed = await token.balanceOf(userTwoAddress)
        let userTwoESbalBef = await ekoStable.balanceOf(userTwoAddress)
        console.log(`User two balances before, ST: ${userTwoSTbalBed}, ES: ${userTwoESbalBef}`)

        let contractSTbalBef = await token.balanceOf(diamondAddress)
        console.log(`Contract balance before, ST: ${contractSTbalBef}`)

        let app = await ekoStable.connect(userTwo).approve(diamondAddress, ekoStableAmount)
        await app.wait()

        const sellFacet = await ethers.getContractAt('SellScoreTokenFacet', diamondAddress, userTwo)
        let buy = await sellFacet.buyScoreTokensFromSellOrder(1)
        await buy.wait()

        let userOneSTbalAf = await token.balanceOf(userOneAddress)
        let userOneESbalAf = await ekoStable.balanceOf(userOneAddress)
        console.log(`User one balances after, ST: ${userOneSTbalAf}, ES: ${userOneESbalAf}`)

        let userTwoSTbalAf = await token.balanceOf(userTwoAddress)
        let userTwoESbalAf = await ekoStable.balanceOf(userTwoAddress)
        console.log(`User two balances after, ST: ${userTwoSTbalAf}, ES: ${userTwoESbalAf}`)

        let contractSTbalAf = await token.balanceOf(diamondAddress)
        console.log(`Contract balance after, ST: ${contractSTbalAf}`)
    }

    async function createOneBuyOrderWithUserTwo(){
        let scoreAmount = '1000'
        let ekoStableAmount = '10' 

        let userTwoEkoStableAmountBef = await ekoStable.balanceOf(userTwoAddress)
        let contractEkoAmountBef = await ekoStable.balanceOf(diamondAddress)
       
        console.log(`User two ekostable balance before: ${userTwoEkoStableAmountBef}, Contract balance ${contractEkoAmountBef}`)

        let app = await ekoStable.connect(userTwo).approve(diamondAddress, ekoStableAmount)
        await app.wait()
        const buyFacet = await ethers.getContractAt('BuyScoreTokenFacet', diamondAddress, userTwo)
        
        /* let buyId = await buyFacet.callStatic.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, scoreAmount)
        console.log(buyId) */
        let tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, scoreAmount)
        await tx.wait()

        let userTwoEkoStableAmountAf = await ekoStable.balanceOf(userTwoAddress)
        let contractEkoAmountAf = await ekoStable.balanceOf(diamondAddress)
       
        console.log(`UserTwo ekostable balance before: ${userTwoEkoStableAmountAf}, Contract balance ${contractEkoAmountAf}`)
    }

    async function buyFromUserTwoOrderWithUserOne(){
        let scoreAmount = '1000'
        let ekoStableAmount = '10' 

        let userOneSTbalBef = await token.balanceOf(userOneAddress)
        let userOneESbalBef = await ekoStable.balanceOf(userOneAddress)
        console.log(`User one balances before ST: ${userOneSTbalBef}, ES: ${userOneESbalBef}`)
        
        let userTwoSTbalBef = await token.balanceOf(userTwoAddress)
        let userTwoESbalBef = await ekoStable.balanceOf(userTwoAddress)
        console.log(`User two balances before, ST: ${userTwoSTbalBef}, ES: ${userTwoESbalBef}`)

        let contractESbalbef = await ekoStable.balanceOf(diamondAddress)
        console.log(`Contract ekoUSDT bal bef: ${contractESbalbef}`)

        let app = await token.connect(userOne).approve(diamondAddress, scoreAmount)
        await app.wait()

        const buyFacet = await ethers.getContractAt('BuyScoreTokenFacet', diamondAddress, userOne)
        let sell = await buyFacet.sellScoreTokenToABuyOrder(2)
        await sell.wait()

        let userOneSTbalAf = await token.balanceOf(userOneAddress)
        let userOneESbalAf = await ekoStable.balanceOf(userOneAddress)
        console.log(`User one balances after ST: ${userOneSTbalAf}, ES: ${userOneESbalAf}`)
        
        let userTwoSTbalAf = await token.balanceOf(userTwoAddress)
        let userTwoESbalAf = await ekoStable.balanceOf(userTwoAddress)
        console.log(`User two balances after, ST: ${userTwoSTbalAf}, ES: ${userTwoESbalAf}`)

        let contractESbalAf = await ekoStable.balanceOf(diamondAddress)
        console.log(`Contract ekoUSDT bal after: ${contractESbalAf}`)
    }

    async function sellOrderWithUserTwo(){
        let scoreAmount = '1000'
        let ekoStableAmount = '10' 

        let userSTAmBef = await token.balanceOf(userTwoAddress)
        console.log(`User one st amount before: ${userSTAmBef}`)

        let contractSTAmbef = await token.balanceOf(diamondAddress)
        console.log(`contract ST amount before: ${contractSTAmbef}`)

        let app = await token.connect(userTwo).approve(diamondAddress, scoreAmount)
        await app.wait()

        const sellFacet = await ethers.getContractAt('SellScoreTokenFacet', diamondAddress, userTwo)
        let tx = await sellFacet.createSellScoreTokenOrder(scoreAmount, ekoStableAddress, ekoStableAmount)
        await tx.wait()

        let userSTAmAf = await token.balanceOf(userTwoAddress)
        console.log(`User one ST balance after: ${userSTAmAf}`)

        let contractSTAmAf = await token.balanceOf(diamondAddress)
        console.log(`contract ST balance after: ${contractSTAmAf}`)
    }

    async function buyFromUserTwoOrder(){
        let scoreAmount = '1000'
        let ekoStableAmount = '10' 

        let userOneSTbalBef = await token.balanceOf(userOneAddress)
        let userOneESbalBef = await ekoStable.balanceOf(userOneAddress)
        console.log(`User one balances before, ST: ${userOneSTbalBef}, ES: ${userOneESbalBef}`)

        let userTwoSTbalBed = await token.balanceOf(userTwoAddress)
        let userTwoESbalBef = await ekoStable.balanceOf(userTwoAddress)
        console.log(`User two balances before, ST: ${userTwoSTbalBed}, ES: ${userTwoESbalBef}`)

        let contractSTbalBef = await token.balanceOf(diamondAddress)
        console.log(`Contract balance before, ST: ${contractSTbalBef}`)

        let app = await ekoStable.connect(userOne).approve(diamondAddress, ekoStableAmount)
        await app.wait()
        const sellFacet = await ethers.getContractAt('SellScoreTokenFacet', diamondAddress, userOne)
        let tx=await sellFacet.buyScoreTokensFromSellOrder(3)
        await tx.wait()
        let userOneSTbalAf = await token.balanceOf(userOneAddress)
        let userOneESbalAf = await ekoStable.balanceOf(userOneAddress)
        console.log(`User one balances after, ST: ${userOneSTbalAf}, ES: ${userOneESbalAf}`)

        let userTwoSTbalAf = await token.balanceOf(userTwoAddress)
        let userTwoESbalAf = await ekoStable.balanceOf(userTwoAddress)
        console.log(`User two balances after, ST: ${userTwoSTbalAf}, ES: ${userTwoESbalAf}`)

        let contractSTbalAf = await token.balanceOf(diamondAddress)
        console.log(`Contract balance after, ST: ${contractSTbalAf}`)
    }

    async function fiveBuyOrdersUserOne(){
        var scoreAmount = '1000'
        var ekoStableAmount = '10'

        var app =await ekoStable.connect(userOne).approve(diamondAddress, ekoStableAmount)
        await app.wait()
        const buyFacet = await ethers.getContractAt('BuyScoreTokenFacet', diamondAddress, userOne)
        var tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, scoreAmount)
        await tx.wait()
        console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

        scoreAmount = '1500'
        ekoStableAmount = '10'

        app = await ekoStable.connect(userOne).approve(diamondAddress, ekoStableAmount)    
        await app.wait()  
        tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, scoreAmount)
        await tx.wait()
        console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

        scoreAmount = '2000'
        ekoStableAmount = '20'

        app = await ekoStable.connect(userOne).approve(diamondAddress, ekoStableAmount)   
        await app.wait()    
        tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, scoreAmount)
        await tx.wait()
        console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

        scoreAmount = '2500'
        ekoStableAmount = '25'

        app = await ekoStable.connect(userOne).approve(diamondAddress, ekoStableAmount)    
        await app.wait()    
        tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, scoreAmount)
        await tx.wait()
        console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

        scoreAmount = '3000'
        ekoStableAmount = '30'

        app = await ekoStable.connect(userOne).approve(diamondAddress, ekoStableAmount)   
        await app.wait()     
        tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, scoreAmount)
        await tx.wait()
        console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)
    }

    async function fiveSellOrderUserOne(){
        var scoreAmount = '1000'
        var ekoStableAmount = '10' 
       
        var app = await token.connect(userOne).approve(diamondAddress, scoreAmount)
        await app.wait()
        const sellFacet = await ethers.getContractAt('SellScoreTokenFacet', diamondAddress, userOne)
        var tx = await sellFacet.createSellScoreTokenOrder(scoreAmount, ekoStableAddress, ekoStableAmount)
        await tx.wait()
        console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)

        scoreAmount = '1500'
        ekoStableAmount = '15' 
       
        app = await token.connect(userOne).approve(diamondAddress, scoreAmount)
        await app.wait()
        tx = await sellFacet.createSellScoreTokenOrder(scoreAmount, ekoStableAddress, ekoStableAmount)
        await tx.wait()
        console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)
        
        scoreAmount = '2000'
        ekoStableAmount = '20' 
       
        app = await token.connect(userOne).approve(diamondAddress, scoreAmount)
        await app.wait()
        tx =await sellFacet.createSellScoreTokenOrder(scoreAmount, ekoStableAddress, ekoStableAmount)
        await tx.wait()
        console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)

        scoreAmount = '2500'
        ekoStableAmount = '25' 
       
        app = await token.connect(userOne).approve(diamondAddress, scoreAmount)
        await app.wait()
        tx =await sellFacet.createSellScoreTokenOrder(scoreAmount, ekoStableAddress, ekoStableAmount)
        await tx.wait()
        console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)

        scoreAmount = '3000'
        ekoStableAmount = '30' 
       
        app = await token.connect(userOne).approve(diamondAddress, scoreAmount)
        await app.wait()
        tx =await sellFacet.createSellScoreTokenOrder(scoreAmount, ekoStableAddress, ekoStableAmount)
        await tx.wait()
        console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)
    
    }

    async function fiveBuyOrdersUserTwo(){
        var scoreAmount = '1000'
        var ekoStableAmount = '10'

       var app = await ekoStable.connect(userTwo).approve(diamondAddress, ekoStableAmount)
        await app.wait()
        const buyFacet = await ethers.getContractAt('BuyScoreTokenFacet', diamondAddress, userTwo)
        var tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, scoreAmount)
        await tx.wait()
        console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

        scoreAmount = '1500'
        ekoStableAmount = '10'

        app = await ekoStable.connect(userTwo).approve(diamondAddress, ekoStableAmount) 
        await app.wait()     
        tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, scoreAmount)
        await tx.wait()
        console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

        scoreAmount = '2000'
        ekoStableAmount = '20'

        app =  await ekoStable.connect(userTwo).approve(diamondAddress, ekoStableAmount)     
        await app.wait()  
        tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, scoreAmount)
        await tx.wait()
        console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

        scoreAmount = '2500'
        ekoStableAmount = '25'

        app = await ekoStable.connect(userTwo).approve(diamondAddress, ekoStableAmount)     
        await app.wait()   
        tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, scoreAmount)
        await tx.wait()
        console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)

        scoreAmount = '3000'
        ekoStableAmount = '30'

        app = await ekoStable.connect(userTwo).approve(diamondAddress, ekoStableAmount)      
        await app.wait()  
        tx = await buyFacet.createBuyScoreTokensOrder(ekoStableAddress, ekoStableAmount, scoreAmount)
        await tx.wait()
        console.log(`buy order created: requesting ST: ${scoreAmount} giving ES: ${ekoStableAmount}`)  
    
    }

    async function fiveSellOrderUserTwo(){
        var scoreAmount = '1000'
        var ekoStableAmount = '10' 
       
        var app = await token.connect(userTwo).approve(diamondAddress, scoreAmount)
        await app.wait()
        const sellFacet = await ethers.getContractAt('SellScoreTokenFacet', diamondAddress, userTwo)
        var tx = await sellFacet.createSellScoreTokenOrder(scoreAmount, ekoStableAddress, ekoStableAmount)
        await tx.wait()
        console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)

        scoreAmount = '1500'
        ekoStableAmount = '15' 
       
        app = await token.connect(userTwo).approve(diamondAddress, scoreAmount)
        await app.wait()
        tx = await sellFacet.createSellScoreTokenOrder(scoreAmount, ekoStableAddress, ekoStableAmount)
        await tx.wait()
        console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)
        
        scoreAmount = '2000'
        ekoStableAmount = '20' 
       
        app = await token.connect(userTwo).approve(diamondAddress, scoreAmount)
        await app.wait()
        tx = await sellFacet.createSellScoreTokenOrder(scoreAmount, ekoStableAddress, ekoStableAmount)
        await tx.wait()
        console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)

        scoreAmount = '2500'
        ekoStableAmount = '25' 
       
        app = await token.connect(userTwo).approve(diamondAddress, scoreAmount)
        await app.wait()
        tx = await sellFacet.createSellScoreTokenOrder(scoreAmount, ekoStableAddress, ekoStableAmount)
        await tx.wait()
        console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)

        scoreAmount = '3000'
        ekoStableAmount = '30' 
       
        app = await token.connect(userTwo).approve(diamondAddress, scoreAmount)
        await app.wait()
        tx =  await sellFacet.createSellScoreTokenOrder(scoreAmount, ekoStableAddress, ekoStableAmount)
        await tx.wait()
        console.log(`Sell order created: giving ST: ${scoreAmount} requesting ES: ${ekoStableAmount}`)
    
    }



    

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
            await setScoreTokenAddress()
            await createOneBuyOrderWithUserOne()
            await sellToUserOneWithUserTwo()
            await createOneSellOrderWithUserOne()
            await selleToUserOneSellOrderWithUserTwo()
            await createOneBuyOrderWithUserTwo()
            await buyFromUserTwoOrderWithUserOne()
            await sellOrderWithUserTwo()
            await buyFromUserTwoOrder()
            await fiveBuyOrdersUserOne()
            await fiveSellOrderUserOne()
            await fiveBuyOrdersUserTwo()
            await fiveSellOrderUserTwo()
           
    }
}

async function run(){
    await scriptInit()

    const stepToExe = [2]
    for (let i = 0; i < stepToExe.length; i++) {
        currentStep = stepToExe[i];
        await runAction(currentStep);
      }
      console.log("all done");
}

run();
