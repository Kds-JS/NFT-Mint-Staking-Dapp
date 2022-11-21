// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

//@author KDS
//@Alpha Lion NFT

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Library/ERC721A.sol";
import "./Library/ERC721AQueryable.sol";

contract LionNFT is Ownable, ERC721A, PaymentSplitter, ERC721AQueryable {

    using Strings for uint;

    string public baseURI;

    uint public mintPrice = 0.003 ether;

    uint private teamLength;


    constructor(address[] memory _team, uint[] memory _teamShares, string memory _baseURI) ERC721A("Alpha Lions NFT v2", "ALION")
    PaymentSplitter(_team, _teamShares) {
        baseURI = _baseURI;
        teamLength = _team.length;
    }

    modifier callerIsUser() {
        require(tx.origin == msg.sender, "The caller is another contract");
        _;
    }

    function publicSaleMint(address _account, uint _quantity) external payable callerIsUser {
        require(totalSupply() < 333, "Sold out");
        require(mintPrice != 0, "Price is 0");
        require(msg.value >= mintPrice * _quantity, "Not enought funds");
        _safeMint(_account, _quantity);
    }

    function setBaseUri(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    function tokenURI(uint _tokenId) public view virtual override(ERC721A,IERC721A) returns (string memory) {
        require(_exists(_tokenId), "URI query for nonexistent token");

        return string(abi.encodePacked(baseURI, _tokenId.toString(), ".json"));
    }

    //ReleaseALL
    function releaseAll() external {
        for(uint i = 0 ; i < teamLength ; i++) {
            release(payable(payee(i)));
        }
    }

    receive() override external payable {
        revert('Only if you mint');
    }

}
