
const API_URL = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken";
const TOKEN = "FYN6DQJ8XWIQXXVYBJU9QNKY56KC9MMB5E";

const FULL_URL = API_URL + TOKEN;

window.addEventListener("load", () => {
	request();	
});


function request() {
	fetch(FULL_URL)
		.then(function(result){
			return result.json();
		})
		.then(function (res)){
			console.log(res);
		})
		.catch(function(error)){
			console.log(error);
		})

}

