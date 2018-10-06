
const API_URL = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken";
const TOKEN = "FYN6DQJ8XWIQXXVYBJU9QNKY56KC9MMB5E";

const API_URL_ETHPRICE = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" + TOKEN;
const API_URL_ETHSUPPLY = "https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=" + TOKEN;
const API_URL_LASTBLOCK = "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=" + TOKEN;

const FULL_URL = API_URL + TOKEN;

window.addEventListener("load", () => {
	request();	
});


function request() {
    // price
    fetch(API_URL_ETHPRICE)
        .then(function(res) {
            console.log(res);
            let result = res.json();
            
            result.then(function(data){
                let price = document.querySelector("#price");
                let ethbtc = data.result.ethbtc;
                let ethusd = data.result.ethusd;
                price.innerHTML = "$" + ethusd + " @ " + ethbtc + " BTC/ETH"
            })

        })
        .catch(function(err) {
            console.log(err);
        });
        
    // total supply
    fetch(API_URL_ETHSUPPLY)
        .then(function(res) {
            console.log(res);
            let result = res.json();
            
            result.then(function(data){
                let supply = document.querySelector("#supply");
                let weiSupply = data.result;
                
                supply.innerHTML = weiSupply / 1000000000000000000 + " ETH";
            })

        })
        .catch(function(err) {
            console.log(err);
        });
        
    // last block
    fetch(API_URL_LASTBLOCK)
        .then(function(res) {
            console.log(res);
            let result = res.json();
            
            result.then(function(data){
                let block = document.querySelector("#last-block");
                let lastBlock = data.result;
                console.log(data.result);
                block.innerHTML = lastBlock;
            })

        })
        .catch(function(err) {
            console.log(err);
        });
}

