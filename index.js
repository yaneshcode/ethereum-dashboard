
const API_URL = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken";
const TOKEN = "FYN6DQJ8XWIQXXVYBJU9QNKY56KC9MMB5E";

const API_URL_ETHPRICE = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" + TOKEN;
const API_URL_ETHSUPPLY = "https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=" + TOKEN;
const API_URL_LASTBLOCK = "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=" + TOKEN;
const API_URL_GASPRICE = "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=" + TOKEN;


const FULL_URL = API_URL + TOKEN;

window.addEventListener("load", () => {
	refresh();	
});

function refresh() {

    getEthPrice();
    getGasPrice();
    getTotalSupply();
    getLastBlock();

}

function getBlockInfo(blockNumber) {
    // take this block number and get more info
    let url = "https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=" + blockNumber + "&boolean=true&apikey=" + TOKEN;
    
    fetch(url).then(function(res) {
        res.json().then(function (data) {
            let value = data.result;
            console.log(data.result);
            
            let numTx = value.transactions.length
            document.querySelector("#num-tx").innerHTML = numTx;
            
            document.querySelector("#difficulty").innerHTML = value.difficulty;
            document.querySelector("#block-timestamp").innerHTML = value.timestamp;
            document.querySelector("#block-gas-limit").innerHTML = value.gasLimit;
            document.querySelector("#block-gas-used").innerHTML = value.gasUsed;
            document.querySelector("#block-nonce").innerHTML = value.nonce;
            document.querySelector("#block-miner").innerHTML = value.miner;
        });
        
    });
}

function getEthPrice() {
        // price
    fetch(API_URL_ETHPRICE)
        .then(function(res) {
            console.log(res);
            let result = res.json();
            
            result.then(function(data){
                let price = document.querySelector("#eth-price");
                let ethbtc = data.result.ethbtc;
                let ethusd = data.result.ethusd;
                price.innerHTML = "$" + ethusd + " @ " + ethbtc + " BTC/ETH"
            })

        })
        .catch(function(err) {
            console.log(err);
        });
}

function getTotalSupply() {
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
}

function getGasPrice() {
                // gas price
    fetch(API_URL_GASPRICE)
        .then(function(res) {
            console.log(res);
            let result = res.json();
            
            result.then(function(data){
                let element = document.querySelector("#gas-price");
                let value = data.result;
                console.log(data.result);
                element.innerHTML = value + " gwei";
            })

        })
        .catch(function(err) {
            console.log(err);
        });
}

function getLastBlock() {
        // last block
    fetch(API_URL_LASTBLOCK)
        .then(function(res) {
            console.log(res);
            let result = res.json();
            
            result.then(function(data){
                let block = document.querySelector("#last-block");
                let block2 = document.querySelector("#last-block-tx");
                let lastBlock = data.result;
   
                console.log(data.result);
                block.innerHTML = lastBlock;
                block2.innerHTML = lastBlock;
                
                getBlockInfo(lastBlock);

            })

        })
        .catch(function(err) {
            console.log(err);
        });
}


