// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Recover{

    function recover(uint256 amount,bytes memory signature)public pure returns(address){
        bytes32 hash =  keccak256(abi.encodePacked(amount));
        bytes32 signedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32",hash));

        return ECDSA.recover(signedHash,signature);
    }

    struct Test{
        string name;
        uint256 age;
    }

    // // Test a = Test("yap",40);

    function recover2(bytes memory _data,bytes memory signature)public pure returns(address){
        bytes32 signedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32",_data));
        return ECDSA.recover(signedHash,signature);
    }

    function recover3(Test calldata t,bytes memory signature)public pure returns(address){
        bytes32 hash = keccak256(abi.encodePacked(string(t.name),uint256(t.age)));
        bytes32 signedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32",hash));
        return ECDSA.recover(signedHash,signature);
    }





}


