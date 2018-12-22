const web3 = require('web3');
const express = require('express');
const Tx = require('ethereumjs-tx');
var fs = require('fs');
const app = express();

//Infura HttpProvider Endpoint
web3js = new web3(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/1fd2fa9bd0e648158a0af7bd341595dd"));

var contractFunction = async function(contractAddress,operation, args)
{
        var myAddress = "0x191d7932C467de7EC09055A415260633e1Cc9F18";
        var privateKey = Buffer.from("B57880E41AB6D8C9979553D9A74E674638A00CA4D35946D6B87E5E663321CDD7", 'hex')
        var toAddress = '';

            var contractABI=[
                {
                    "constant": true,
                    "inputs": [],
                    "name": "receptionList",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_doctorId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getDoctorDetails",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_pId",
                            "type": "uint256"
                        },
                        {
                            "name": "_pName",
                            "type": "string"
                        },
                        {
                            "name": "_pEmail",
                            "type": "string"
                        },
                        {
                            "name": "_pContNum",
                            "type": "uint256"
                        },
                        {
                            "name": "_paddress",
                            "type": "string"
                        },
                        {
                            "name": "_consultedDoctor",
                            "type": "string"
                        },
                        {
                            "name": "_patientAddress",
                            "type": "address"
                        }
                    ],
                    "name": "setPatientDetails",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "OwnerOfHospital",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_pid",
                            "type": "uint256"
                        }
                    ],
                    "name": "getPatientInfo",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "string"
                        },
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_doctorId",
                            "type": "uint256"
                        },
                        {
                            "name": "_doctorName",
                            "type": "string"
                        },
                        {
                            "name": "_doctorEmail",
                            "type": "string"
                        },
                        {
                            "name": "_doctorContNum",
                            "type": "uint256"
                        },
                        {
                            "name": "_doctorLocalAddress",
                            "type": "string"
                        },
                        {
                            "name": "_doctorAddress",
                            "type": "address"
                        }
                    ],
                    "name": "setDoctorDetails",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "name": "_receptionList",
                            "type": "address"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                }
            ];

     
      var contractAddress =_contractAddress;
        //creating contract object
        var contract = new web3js.eth.Contract(contractABI,contractAddress);

        var count;
        // get transaction count, later will used as nonce
        return web3js.eth.getTransactionCount(myAddress).then(function(v){
            console.log("Count: "+v);
            count = v;
            var amount = web3js.utils.toHex(1e16);
            //creating raw tranaction
            try {

                switch(operation)
                {
                    case "setDoctorDetails":
                        var rawTransaction = {"from":myAddress, "gasPrice":web3js.utils.toHex(20* 1e9),"gasLimit":web3js.utils.toHex(990000),"to":contractAddress,"value":"0x0","data":contract.methods.setDoctorDetails(args[0],args[1],args[2],args[3],args[4],args[5]).encodeABI(),"nonce":web3js.utils.toHex(count)}
                        console.log(rawTransaction);
                        break;

                    case "setPatientDetails":
                        var rawTransaction = {"from":myAddress, "gasPrice":web3js.utils.toHex(20* 1e9),"gasLimit":web3js.utils.toHex(990000),"to":contractAddress,"value":"0x0","data":contract.methods.setPatientDetails(args[0],args[1],args[2],args[3],args[4],args[5],args[6]).encodeABI(),"nonce":web3js.utils.toHex(count)}
                        console.log(rawTransaction);
                        break;                        
                    
                    case "getDoctorDetails":
                        var rawTransaction = {"from":myAddress, "gasPrice":web3js.utils.toHex(20* 1e9),"gasLimit":web3js.utils.toHex(990000),"to":contractAddress,"value":"0x0","data":contract.methods.getDoctorDetails(args[0]).encodeABI(),"nonce":web3js.utils.toHex(count)}
                        console.log(rawTransaction);
                        break;                        

                    case "getPatientInfo":
                        var rawTransaction = {"from":myAddress, "gasPrice":web3js.utils.toHex(20* 1e9),"gasLimit":web3js.utils.toHex(990000),"to":contractAddress,"value":"0x0","data":contract.methods.getPatientInfo(args[0]).encodeABI(),"nonce":web3js.utils.toHex(count)}
                        console.log("rawTransaction",rawTransaction);
                        break;                        
                    
                }                
            } catch (error) {
                console.log(error)
            }
            //creating tranaction via ethereumjs-tx
            var transaction = new Tx(rawTransaction);
            //signing transaction with private key
            transaction.sign(privateKey);
            //sending transacton via web3js module
            //on('transactionHash',console.log)
            try {
               return web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
                .then(function(result,err){
                    if (err) return err;
                    console.log("Inside Signed transaction",result)
                    return result;
                });
            } catch (error) {
                console.log(error)
                return "error";
            }                
        })
   
}
}

exports.contractFunction=contractFunction;   
