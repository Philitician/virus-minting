const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Greeter', function () {
  it("Should return the new greeting once it's changed", async function () {
    const MintExample = await ethers.getContractFactory('MintExample');
    const mintExample = await MintExample.deploy('Minter', 'MINT');
    await mintExample.deployed();

    expect(await mintExample.name()).to.equal('Minter');

    const mintTx = await mintExample.mint(1);
    await mintTx.wait();
    expect(await mintExample.balances(await mintExample.owner())).to.equal(1);

    // const setGreetingTx = await mintExample.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await mintExample.greet()).to.equal("Hola, mundo!");
  });
});
