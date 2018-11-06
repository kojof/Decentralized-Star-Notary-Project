const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const web3 = require('web3');


app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));
app.use(express.json());
app.use(express.urlencoded());

web3js = new web3(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/654f6ad901824b248264bfd3e8b67972"));


app.get('/', (req, res) => res.send('hello world'));

app.get('/star/:starTokenId', async function (req, res) {

  try {

    if (!req.params.starTokenId) {
      res.status(400).send('star token id parameter is required');
    }
    const starTokenId = req.params.starTokenId;
    let response = '';
    let abi = require('./abiContract.json');
    const contractAddress = "0x4e9b01b5013143c19135dd510fe37ea8e2ad4ac1";
    const address = "0x909379E9681fBD044902F0833aBB395D70b5A3Bb";

    const starDeployContract = web3js.eth.contract(abi, contractAddress);
    console.log(starDeployContract.methods);
    starDeployContract.methods.tokenIdToStarInfo(starTokenId).call({
      from: address
    }, function (error, result) {
      if (!error) {
        response = result;
      } else {
        console.log(error);
      }

    });

    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: error.toString()
    });
  }
});

const port = process.env.port || 8000;
app.listen(port, () => console.log(`App listening on port ${port}...`));