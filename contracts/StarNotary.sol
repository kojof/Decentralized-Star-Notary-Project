pragma solidity ^ 0.4 .23;

import '/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 {

	struct Star {
		string name;
		string story;
		string dec;
		string mag;
		string cent;
	}

event starCreated(
       string name,
		string story,
		string dec,
		string mag,
		string cent
    );
	
	mapping(uint256 => Star) public tokenIdToStarInfo;	
	mapping(bytes32 => bool) public savedTokens;
    mapping(uint256 => uint256) public starsForSale;

	function createStar(string _name, string _story, string _dec, string _mag, string _cent, uint256 _tokenId) public {
		Star memory newStar = Star(_name, _story, _dec, _mag, _cent);
		bytes32 starCoordinates = concatenateStarCoordinates(_dec, _mag, _cent);

		require(checkIfStarExist(starCoordinates), "these star coordinates are already in use");

		tokenIdToStarInfo[_tokenId] = newStar;
		savedTokens[starCoordinates] = true;	
		_mint(msg.sender, _tokenId);
		emit starCreated(_name, _story, _dec,  _mag, _cent);	
	}

	function checkIfStarExist(bytes32 starCoordinates) public view returns(bool) {
		return !savedTokens[starCoordinates];
	}

	function concatenateStarCoordinates(string _dec, string _mag, string _cent) private pure returns(bytes32) {
		bytes32 starCoordinates = keccak256(abi.encodePacked(_dec, _mag, _cent));
		return starCoordinates;
	}

	function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
		require(this.ownerOf(_tokenId) == msg.sender);

		starsForSale[_tokenId] = _price;        
	}

	function buyStar(uint256 _tokenId) public payable {
		 require(starsForSale[_tokenId] > 0);

		 uint256 starCost = starsForSale[_tokenId];
		 address starOwner = this.ownerOf(_tokenId);
		 require(msg.value >= starCost);

		 _removeTokenFrom(starOwner, _tokenId);
		 _addTokenTo(msg.sender, _tokenId);

		 starOwner.transfer(starCost);

		if (msg.value > starCost) {
			msg.sender.transfer(msg.value - starCost);
		}
	}

	function mint(address _to, uint256 _tokenId) public {
		require(this.ownerOf(_tokenId) == msg.sender);
		super._mint(_to, _tokenId);
	}

	function approve(address _to, uint256 _tokenId) public {
		require(this.ownerOf(_tokenId) == msg.sender);
		this.approve(_to, _tokenId);
	}

	function safeTransferFrom(address _from, address _to, uint256 _tokenId) public {

		require(this.ownerOf(_tokenId) == msg.sender);
		this.safeTransferFrom(_from, _to, _tokenId);
	}


	function setApprovalForAll(address _to, bool _approved) public {
		this.setApprovalForAll(_to, _approved);
	}

	function getApproved(uint256 _tokenId) public view returns(address) {
		address approvedAddress = this.getApproved(_tokenId);
		return approvedAddress;
	}

	function isApprovedForAll(address _owner, address _operator) public view returns(bool) {
		bool isApproved = this.isApprovedForAll(_owner, _operator);
		return isApproved;
	}

	function ownerOf(uint256 _tokenId) public view returns(address) {
		address owner = super.ownerOf(_tokenId);
		return owner;
	}

    function starsForSale(uint256 _tokenId) public view returns(uint256) {		
		return starsForSale[_tokenId];
	}

      function tokenIdToStarInfo(uint256 _tokenId) public view returns( string, string, string, string, string) {
		Star memory star = tokenIdToStarInfo[_tokenId];
		string memory name = star.name;
		string memory story = star.story;
		string memory cent = getString("ra_", star.cent);
		string memory dec = getString("dec_", star.dec);
		string memory mag = getString("mag_", star.mag);		
		return (name, story, cent, dec, mag);
	}

	function getString(string stringToAppend1, string stringToAppend2) private pure returns(string)
	{
		string memory s = string(abi.encodePacked(stringToAppend1, stringToAppend2));
		return s;
	}
}