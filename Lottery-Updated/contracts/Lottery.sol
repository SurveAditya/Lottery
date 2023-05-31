// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.9;

contract Lottery{
    address public manager;
    address payable[] public players;

    constructor(){
        manager = msg.sender;
    }

    function enter() public payable{
        require(msg.value > .01 ether);
        players.push(payable(msg.sender));
    }

    function random() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty , block.timestamp, players)));
    }
    //players[index].transfer(address(this).balance);: This line transfers the balance of the smart contract to the address stored in the players[index] element. 
    //The transfer function is used to send funds to the specified address.

    //players = new address payable[](0);: This line creates a new dynamic array of type address payable with a size of 0. 
    //By assigning it to the players variable, it effectively clears the array by discarding any existing elements.

    function pickWinner() public restricted{
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns(address payable[] memory){
        return players;
    }

}