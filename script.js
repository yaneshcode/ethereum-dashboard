
const TOKEN = "FYN6DQJ8XWIQXXVYBJU9QNKY56KC9MMB5E";

const API_URL_ETHPRICE = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${TOKEN}`;
const API_URL_ETHSUPPLY = `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${TOKEN}`;
const API_URL_LASTBLOCK = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${TOKEN}`;
const API_URL_GASPRICE = `https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=${TOKEN}`;

// template literal to build url string with block Number
const API_URL_BLOCK = (blockNumber) => `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${TOKEN}`;

// load event in order to start modifying DOM
window.addEventListener("load", () => {
    refresh();
});

// auto refresh function will fetch new data every 10s
function autoRefresh() {
        setInterval(refresh, 10000);
}

// main control function
function refresh() {
    // update timestamp
    let currentTime = new Date();
    document.querySelector("#date").innerHTML = currentTime.toDateString();
    
    document.querySelector("#last-update").innerHTML = "Last updated: " + currentTime.toTimeString();
    
    // fetch data
    getEthPrice();
    getGasPrice();
    getTotalSupply();
    getLastBlock();
}

// fetch block information by block number
function getBlockInfo(blockNumber) {
    
    fetch(API_URL_BLOCK(blockNumber))
        .then(function(res) {
            console.log(res);
            // check if status is ok
            if (res.status == 200) {
                
                 // go through the result promise and update display
                res.json().then(function (data) {
                    let value = data.result;

                    document.querySelector("#difficulty").innerHTML = parseInt(value.difficulty, 16) / 1000000000 + " TH";
                    document.querySelector("#block-timestamp").innerHTML = parseInt(value.timestamp, 16);
                    document.querySelector("#block-gas-limit").innerHTML = value.gasLimit;
                    document.querySelector("#block-gas-used").innerHTML = value.gasUsed;
                    document.querySelector("#block-nonce").innerHTML = value.nonce;
                    document.querySelector("#block-miner").innerHTML = value.miner;
                    document.querySelector("#num-tx").innerHTML =value.transactions.length;
                });
            } else {
                // return status is not OK
               console.log(res);  
            }        
        })
        .catch(function(err){
            //network error
            console.log(err);
        });
}

// fetch ether price
function getEthPrice() {

    fetch(API_URL_ETHPRICE)
        .then(function(res) {
           
            // check if status is ok
            if (res.status == 200) {
                
                // go through the result promise and update display
                let result = res.json();
                result.then(function(data){
                    let price = document.querySelector("#eth-price");
                    let ethbtc = data.result.ethbtc;
                    let ethusd = data.result.ethusd;
                    price.innerHTML = "$" + ethusd + " @ " + ethbtc + " BTC/ETH"
                })
            } else {
                // return status is not OK
               console.log(res);  
            }
        })
        .catch(function(err) {
            // network error
            console.log(err);
        });
}

// fetch total supply
function getTotalSupply() {

    fetch(API_URL_ETHSUPPLY)
        .then(function(res) {
            
            // check if status is ok
            if (res.status == 200) {
                
                // go through result promise and update display
                let result = res.json();
                
                result.then(function(data){
                    let supply = document.querySelector("#supply");
                    let weiSupply = data.result;
                    
                    // covert wei to ETH
                    supply.innerHTML = weiSupply / 1000000000000000000 + " ETH";
                })
            } else {
                // return status is not OK
                console.log(res);
            }
        })
        .catch(function(err) {
            // network error
            console.log(err);
        });
}

// fetch gas price
function getGasPrice() {

    fetch(API_URL_GASPRICE)
        .then(function(res) {
            
            // check if status is OK
            if (res.status == 200) {
                
                // go through result promise and update display
                let result = res.json();
                
                result.then(function(data){
                    let element = document.querySelector("#gas-price");
                    let value = data.result;
                    console.log(data.result);
                    element.innerHTML = parseInt(value, 16) / 1000000000 + " gwei";
                })
            } else {
                // return status is not OK
                console.log(res);
            }
        })
        .catch(function(err) {
            // network error
            console.log(err);
        });
}

// fetch last block number
function getLastBlock() {

    fetch(API_URL_LASTBLOCK)
        .then(function(res) {
            
            // check if status is OK
            if (res.status == 200) {
                
                // go through promise and update display
                let result = res.json();
                
                result.then(function(data){
                    let block = document.querySelector("#last-block");
                    let block2 = document.querySelector("#last-block-tx");
                    let lastBlock = data.result;
    
                    console.log(data.result);
                    block.innerHTML = parseInt(lastBlock, 16);
                    block2.innerHTML = parseInt(lastBlock, 16);
                    
                    getBlockInfo(lastBlock);

                })
            } else {
                // return status is not OK
                console.log(res);
            }
        })
        .catch(function(err) {
            // network error
            console.log(err);
        });
}


