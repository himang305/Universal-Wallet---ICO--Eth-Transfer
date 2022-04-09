pragma solidity ^0.5.0;

contract Token {
    string  public name = "DApp Token";
    string  public symbol = "DAPP";
    uint256 public totalSupply = 1000; 
    uint8   public decimals = 18;
    address public ownerAddress;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[address(this)] = totalSupply;
        ownerAddress = msg.sender;
    }

    function exchangeBalance() public view returns (uint256) {
        return balanceOf[address(this)];
    }

    function getBalance() public view returns (uint256) {
        return this.balanceOf(msg.sender);
    }

     modifier onlyOwner () {
       require(msg.sender == ownerAddress, "This can only be called by the contract owner!");
       _;
     }

     function withdraw() payable onlyOwner public {                     // wothdraw from contract address
         msg.sender.transfer(address(this).balance);
     }

      function sendEth( uint256 amount , address payable _To )public payable returns (bool)
    {
     _To.transfer(amount);
     return true;
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = exchangeBalance();     // contract address
        require(amountTobuy > 0, "You need to send some Ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        this.transfer(msg.sender, amountTobuy);
//        emit Bought(amountTobuy);
    }
    
    function sell(uint256 amount) payable public {
        require(amount > 0, "You need to sell at least some tokens");
//        uint256 allowance = token.allowance(msg.sender, address(this));
//        require(allowance >= amount, "Check the token allowance");
        transferFrom(msg.sender, ownerAddress, amount);
       msg.sender.transfer(amount);
    //    emit Sold(amount);
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
   //     allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}