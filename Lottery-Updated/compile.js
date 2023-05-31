const path = require('path');
const solc = require('solc');
const fs = require('fs');

// Get the path of the contract
const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');

// Read the contract and store it in a variable
const source = fs.readFileSync(lotteryPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: source
        }
    },
    settings: {
        //Indicate that all elements at all levels of the output should be selected. 
        //This means that the tool should produce output for all possible aspects of the analyzed Solidity code.
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Lottery.sol'].Lottery;



