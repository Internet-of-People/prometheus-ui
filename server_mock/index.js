var express = require("express");
var app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.listen(8080, () => {
	//console.log("MOCK Server running on port 8080");
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.post("/bip39/new", async (req, res) => {
	await sleep(2000);
	res.json(["Tony","Lisa","Michael","Ginger","Food","Tony","Lisa","Michael","Ginger","Food","Tony","Lisa","Michael","Ginger","Food","Tony","Lisa","Michael","Ginger","Food","Tony","Lisa","Michael","Ginger"]);
});

app.post("/bip39/validate", async (req, res) => {
	await sleep(2000);
	res.json(true);
});