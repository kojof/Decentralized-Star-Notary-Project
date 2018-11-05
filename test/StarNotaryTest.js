const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => { 

    beforeEach(async function() { 
        this.contract = await StarNotary.new({from: accounts[0]})
    })
    
    describe('can create a star', () => { 
        it('can create a star and get its name', async function () { 
            
            let name = "awesome star!";     
            let story ="I love my wonderful star"; 
            let dec ="121.874";
            let mag ="245.978";
            let cent ="032.1552";
            let tokenId = 1;          

           let starCoordinates = dec +  mag + cent;
           let starCoordinatesBytes = web3.sha3(starCoordinates);
            
           //check if star exists, otherwise don't save it
           let checkIfStarExists = await this.contract.checkIfStarExist(starCoordinatesBytes);
           assert.equal(checkIfStarExists, true);   

            const createStarEvent  = await this.contract.createStar(name, story, dec, mag, cent, tokenId,  {from: accounts[0]});
            assert.equal(createStarEvent.logs[1].event,'starCreated');

            let star = await this.contract.tokenIdToStarInfo(tokenId);  
            assert.deepEqual(star, [name, story, `ra_${cent}`, `dec_${dec}`, `mag_${mag}`]);   
            
            //check again if the star exists after it has been created
            let checkIfStarExistsAgain = await this.contract.checkIfStarExist(starCoordinatesBytes);           
            assert.equal(checkIfStarExistsAgain, false);                 
        })
    })

    describe('buying and selling stars', () => { 
        let user1 = accounts[1]
        let user2 = accounts[2]
        let randomMaliciousUser = accounts[3]
        
        let name = "awesome star!";     
        let story ="I love my wonderful star"; 
        let dec ="dec_121.874";
        let mag ="mag_245.978";
        let cent ="ra_032.155";
        let tokenId = 1;
        let starPrice = web3.toWei(.01, "ether");
        

        beforeEach(async function () { 
          await this.contract.createStar(name, story, cent, dec, mag, tokenId, {from: user1})    
        })

        it('user1 can put up their star for sale', async function () { 
            assert.equal(await this.contract.ownerOf(tokenId), user1)             
            await this.contract.putStarUpForSale(tokenId, starPrice, {from: user1})
            
            assert.equal(await this.contract.starsForSale(tokenId), starPrice)
           
        })

        describe('user2 can buy a star that was put up for sale', () => { 
            beforeEach(async function () { 
                await this.contract.putStarUpForSale(tokenId, starPrice, {from: user1})
              
            })

            it('user2 is the owner of the star after they buy it', async function() {                 
                   await this.contract.buyStar(tokenId, {from: user2, value: starPrice, gasPrice: 0})
                    assert.equal(await this.contract.ownerOf(tokenId), user2)             
             
            })

            it('user2 ether balance changed correctly', async function () { 
                let overpaidAmount = web3.toWei(.05, 'ether')              
                const balanceBeforeTransaction = web3.eth.getBalance(user2)
               
                await this.contract.buyStar(tokenId, {from: user2, value: overpaidAmount, gasPrice: 0})
                const balanceAfterTransaction = web3.eth.getBalance(user2)

                 assert.equal(balanceBeforeTransaction.sub(balanceAfterTransaction), starPrice)
             })
        })
     })
})