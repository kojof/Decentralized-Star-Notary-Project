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
        //const response = await blockChain.getBlocksByHash(starTokenId);
        let tokenAbi = require('./tokenContract.json');
      const abi = cjson.load(path.resolve(__dirname, '../ABI/abi.json'));
      const DataPassContract = web3js.eth.contract(abi);
      const dataPass = DataPassContract.at('0xb5459a99247fa36e6898d358b14ed8ceffb34a81');


        res.json(response);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
});

const port = process.env.port || 8000;
app.listen(port, () => console.log(`App listening on port ${port}...`));