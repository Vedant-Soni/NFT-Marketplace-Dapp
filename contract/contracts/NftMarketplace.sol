// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract NftMarketplace is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC2771Context
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor(
        address trustedForwarderAddress
    ) ERC721("Vector", "VXS") ERC2771Context(trustedForwarderAddress) {}

    struct NFT {
        address owner;
        uint256 price;
    }

    function _msgData()
        internal
        view
        override(ERC2771Context, Context)
        returns (bytes calldata)
    {
        return ERC2771Context._msgData();
    }

    function _msgSender()
        internal
        view
        override(ERC2771Context, Context)
        returns (address sender)
    {
        return ERC2771Context._msgSender();
    }

    mapping(uint256 => NFT) public nfts;

    modifier onlyNFTOwner(uint256 tokenId) {
        require(
            msg.sender == ownerOf(tokenId),
            "Only NFT owner can perform this action"
        );
        _;
    }

    function safeMint(string memory uri) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        nfts[tokenId] = NFT(msg.sender, 0);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function listNFTForSale(
        uint256 tokenId,
        uint256 price
    ) external onlyNFTOwner(tokenId) {
        nfts[tokenId].price = price;
    }

    function purchaseNFT(uint256 tokenId) external payable {
        NFT memory nft = nfts[tokenId];
        require(nft.price > 0, "NFT is not for sale");
        require(msg.value >= nft.price, "Insufficient funds");

        address seller = nft.owner;
        nfts[tokenId].owner = msg.sender;
        nfts[tokenId].price = 0;
        _transfer(seller, msg.sender, tokenId);

        payable(seller).transfer(msg.value);
    }

    function viewNFTsForSale() external view returns (uint256[] memory) {
        uint256 nftCount = _tokenIdCounter.current();
        uint256 resultIndex = 0;

        for (uint256 tokenId = 0; tokenId < nftCount; tokenId++) {
            if (nfts[tokenId].price > 0) {
                resultIndex++;
            }
        }
        uint256[] memory result = new uint256[](resultIndex);
        resultIndex = 0;

        for (uint256 tokenId = 0; tokenId < nftCount; tokenId++) {
            if (nfts[tokenId].price > 0) {
                result[resultIndex] = tokenId;
                resultIndex++;
            }
        }
        return result;
    }

    function viewOwnedNFTs() external view returns (uint256[] memory) {
        uint256 nftCount = balanceOf(msg.sender);
        uint256[] memory result = new uint256[](nftCount);

        for (uint256 i = 0; i < nftCount; i++) {
            result[i] = tokenOfOwnerByIndex(msg.sender, i);
        }

        return result;
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
