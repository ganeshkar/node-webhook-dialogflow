'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const DialogflowApp = require('actions-on-google').DialogflowApp;

const app = express();

const EXT_API_URL = "https://gk-testapi.herokuapp.com/api/products";


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


function handleIntent(req, res) {

    console.log(req.body);
    console.log("Customer no. is "+req.body.queryResult.parameters["CustomerNo"]);
    console.log("Last name is "+req.body.queryResult.parameters["last-name"]);
    console.log("First name is "+req.body.queryResult.parameters["given-name"]);
    //Persist this in some database
    //Send out an email that new feedback has come in
    res.status(200).json({
          speech: "Thank you. Please check the details from Application screen",
          displayText: "Thank you. Please check the details from Application screen",
          source: 'Insurance System'});
 }
  
  
  app.post('/webhook', function (req, res) {
    //console.log(JSON.stringify(req.body));
    handleIntent(req, res);
  })
  

  app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
  });  
