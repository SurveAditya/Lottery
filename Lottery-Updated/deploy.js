const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi , evm } = require('./compile');

const provider = new HDWalletProvider(

	"cereal test flower pelican gym squeeze pride sustain load water easy glad",
	"https://sepolia.infura.io/v3/0c0fb5ae7d3b40ed83fa9e49c829e00f"
         
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract( abi )
        .deploy({ data: evm.bytecode.object })
        .send({ from: accounts[0], gas: '1000000' });
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
}
deploy();

//ALWAYS COPY THE ABI FROM REMIX AND DEPLOY FROM HERE
