contract BlockIPO {
    
    address public owner;
    //
    mapping (address => uint) shares;
    mapping (uint => address) owners;
    uint public ownerCount;
    
    Issuer[] public issued;

    struct Issuer {
        bytes32 name;
        bytes32 company;
        uint shares;
    }

    function BlockIPO() {
    }

    function addIssued(bytes32 _name, bytes32 _company, address _to, uint _shares) returns (bool success) {
        Issuer memory newIssuer;
        newIssuer.name = _name;
        newIssuer.company = _company;
        newIssuer.shares = _shares;
        shares[_to] += _shares;
        
        
        // Would add these fields into production to addIssued objectand push them to chart 
        /*
        newIssuer.price = _price;
        newIssuer.ticker = _ticker;
        newIssuer.date = _date;
        newIssuer.market = _market;
        */
        
        issued.push(newIssuer);
        return true;
    }

    //simple transfer function
    function transfer(address _to, uint _shares) {
        if (shares[msg.sender] < _shares) {
            throw;
        }
        shares[msg.sender] -= _shares;
        shares[_to] += _shares;
    }

    //split number of securities issued
    function split(uint times) {
        for (uint i=0; i < ownerCount; i++) {
            shares[owners[i]] = shares[owners[i]] * times;
        }
    }
    
    // query blockchain to return values
    function getIssued() constant returns (bytes32[], bytes32[], uint[], bytes32[]) {
        
        //make sure bytes32 array is the same length
        uint length = issued.length;
        
        bytes32[] memory names = new bytes32[](length);
        bytes32[] memory companys = new bytes32[](length);
        uint[] memory shares = new uint[](length);

        for (uint i=0; i < issued.length; i++) {
            Issuer memory currentIssuer;
            currentIssuer = issued[i];
            
            names[i] = currentIssuer.name;
            companys[i] = currentIssuer.company;
            shares[i] = currentIssuer.shares;

        }
        
        // return values
        return (names, companys, shares);
    
    }
    
    function () {
        throw;
    }
}