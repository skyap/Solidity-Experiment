const { ethers } = require("hardhat");
const { expect } = require("chai");


describe("Test signing",async()=>{
    let contract;
    before("Deploy contract",async()=>{
        const r = await ethers.getContractFactory("Recover");
        contract = await r.deploy();
    });
    it("sign simple",async()=>{
        const [signer] = await ethers.getSigners();
        // console.log(signer.address);
        const abiCoder = new ethers.utils.AbiCoder();
        const encoded = ethers.utils.keccak256(abiCoder.encode(["uint256"], [1234]));
        // console.log(encoded);
        const signature = await signer.signMessage(ethers.utils.arrayify(encoded));
        // console.log(signature);

        expect(await contract.recover(1234,signature)).to.equal(signer.address);
    });

    it("sign 2",async()=>{
        const [signer] = await ethers.getSigners();
        // console.log(signer.address);
        const abiCoder = new ethers.utils.AbiCoder();
        const encoded = ethers.utils.keccak256(abiCoder.encode(["string","uint256"], ["yap",40]));
        const signature = await signer.signMessage(ethers.utils.arrayify(encoded));
        // console.log(signature);
        // console.log(await contract.recover2(encoded,signature));
        expect(await contract.recover2(encoded,signature)).to.equal(signer.address);
    })


    it("sign 3",async()=>{
        const [signer] = await ethers.getSigners();
        // console.log(signer.address);
        const abiCoder = new ethers.utils.AbiCoder();
        // const encoded = ethers.utils.keccak256(abiCoder.encode(["string","uint256"], ["yap",40]));
        const encoded = ethers.utils.keccak256(ethers.utils.solidityPack(["string","uint256"], ["yap",40]));
        const signature = await signer.signMessage(ethers.utils.arrayify(encoded));
        // console.log(signature);
        // console.log(await contract.recover3({name:"yap",age:40},signature));
        expect(await contract.recover3({name:"yap",age:40},signature)).to.equal(signer.address);
    })


});