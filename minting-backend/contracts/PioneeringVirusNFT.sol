// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract PioneeringVirusNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string baseURI;
    uint256 maxSupply;
    bool paused = false;
    mapping(address => uint256) public whitelistIndexes;
    address[] whitelist;

    constructor(string memory _name, string memory _symbol, uint256 _maxSupply, string memory _initBaseURI) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
        maxSupply = _maxSupply;
        setWhitelisted(msg.sender);
    }

    function mint() public {
        require(isWhitelisted());
        if (msg.sender != owner()) {
            require(!hasMinted());
        }
        require(maxSupply >= _tokenIds.current() + 1);
        _tokenIds.increment();
        _safeMint(msg.sender, _tokenIds.current());
    }

    function setWhitelisted(address _address) public onlyOwner {
        require(!isWhitelisted(_address));
        whitelistIndexes[_address] = whitelist.length;
        whitelist.push(_address);
    }

    function isWhitelisted() public view returns (bool) {
        return isWhitelisted(msg.sender);
    }

    function isWhitelisted(address _address) private view returns (bool) {
        return whitelistIndexes[_address] > 0;
    }

    function setPaused() public onlyOwner {
        paused = true;
    }

    function setUnpaused() public onlyOwner {
        paused = false;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return bytes(_baseURI()).length > 0
            ? string(abi.encodePacked(_baseURI(), Strings.toString(tokenId), ".json"))
            : "";
    }

    function getBalanceOfAccount() private view returns (uint256) {
        return balanceOf(msg.sender);
    }

    function hasMinted() public view returns (bool) {
        return getBalanceOfAccount() == 1 ? true : false;
    }

    function getTotalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
}