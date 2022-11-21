// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LionToken is ERC20, Ownable {

    mapping(address => bool) admins;

    constructor() ERC20("Alpha Lions Finance", "ALF") {}

    function mint(address _to, uint _amount) external {
        require(admins[msg.sender], "Cannot mint it not admin");
        _mint(_to, _amount);
    }

    function addAdmin(address _admin) external onlyOwner {
        admins[_admin] = true;
    }

    function removeAdmin(address _admin) external onlyOwner {
        admins[_admin] = false;
    }

}