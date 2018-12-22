const web3 = require('web3');
const express = require('express');
const Tx = require('ethereumjs-tx');


var query = require("./query.js")
var deploy = require("./deployContract.js")


const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// redireact the call to the app folder acoundingly
app.post('/contractfunction', function (req, res) {
    console.log("---------------------------------Contract Function  API Started---------------------------------",req.body)

    //console.log("Aguments--------",req.body.arguments);
    var args = req.body.arguments;
    
    //contractFunction(_publicAddress,_privateKey,_contractAddress,contractType,operation, args)
        const result = query.contractFunction(req.body.contractAddress,req.body.operation,args).then(function(result,error){
           console.log("Result:", result)
           res.send(result)       
            });


    console.log("---------------------------------Contract Function  API END---------------------------------",result)

        });
       

app.post('/deploy',async function (req, res) {
    console.log("---------------------------------Deploy Contract API Started---------------------------------",req.body)
    const result1 =await deploy.deployContract(req.body.arguments);
    res.send(result1)


    console.log("---------------------------------Deploy Contract API END---------------------------------",result1)

  })

  
app.listen(3002, () => console.log('Example app listening on port 3002!'))