'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const ActionsSdkApp = require('actions-on-google').ActionsSdkApp;

const app = express();

const EXT_API_URL = "https://gk-testapi.herokuapp.com/api/products";


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


function getProductDeatils(req, res) {
    const app = new ActionsSdkApp({request: req, response: res});

    const PRODUCT_DETAILS_INTENT = 'getProductDeatils';  
    const AGE_ARGUMENT = 'age'; 

    function basicCard () {
        app.ask(app.buildRichResponse()
          // Create a basic card and add it to the rich response
          .addSimpleResponse('Math and prime numbers it is!')
          .addBasicCard(app.buildBasicCard('42 is an even composite number. It' +
            'is composed of three distinct prime numbers multiplied together. It' +
            'has a total of eight divisors. 42 is an abundant number, because the' +
            'sum of its proper divisors 54 is greater than itself. To count from' +
            '1 to 42 would take you about twenty-one…')
            .setTitle('Math & prime numbers')
            .addButton('Read more', 'https://example.google.com/mathandprimes')
            .setImage('https://example.google.com/42.png', 'Image alternate text')
          )
        );
      }
  
    let actionMap = new Map();
    actionMap.set(PRODUCT_DETAILS_INTENT, basicCard);
    actionMap.set(app.StandardIntents.MAIN, basicCard);
    actionMap.set(app.StandardIntents.TEXT, basicCard);
    app.handleRequest(actionMap);
  }
  
  
  app.post('/webhook', function (req, res) {
    console.log(JSON.stringify(req.body));
    getProductDeatils(req, res);
  })
  

  app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
  });  
  
  
