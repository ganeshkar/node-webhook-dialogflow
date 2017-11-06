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
    const assistant = new DialogflowApp({request: req, response: res});

    const PRODUCT_DETAILS_INTENT = 'getProductDeatils';  
    const AGE_ARGUMENT = 'age'; 
    
    function carousel (assistant) {
        assistant.askWithCarousel('Alright! Here are a few products you can check',
        // Build a carousel
        assistant.buildCarousel()
        // Add the first item to the carousel
        .addItems(assistant.buildOptionItem('PROD_LEVEL1',
             ['dream_prod', 'product of mars', 'test prod'])
             .setTitle('Product level - 1')
             .setDescription('This is a product of mars')
             .setImage('http://i.ndtvimg.com/progold/304342_thumb.jpg', 'Product of Mars'))
        // Add the second item to the carousel
        .addItems(assistant.buildOptionItem('PROD_LEVEL7',
            ['product of universe', 'old id gold', 'we care for you'])
            .setTitle('Product level - 7')
            .setDescription('This product is very very popular...')
            .setImage('http://www.medimanage.com/health-insurance-experts-blog/image.axd?picture=2011%2f10%2fNew-Health-Insurance-Product.jpg', 'Product of Universe')
        )
      );
    }
    
    
    function optionIntent (assistant) {
    	if (assistant.getSelectedOption() === 'PROD_LEVEL1') {
    		assistant.tell('Product level - 1 is a great choice!');
    	} else {
    		assistant.tell('Product level - 7 is a great choice!');
    	}
    }
  
    let actionMap = new Map();
    actionMap.set(PRODUCT_DETAILS_INTENT, carousel);
    actionMap.set(assistant.StandardIntents.OPTION, optionIntent);
    // actionMap.set(assistant.StandardIntents.MAIN, basicCard);
    // actionMap.set(assistant.StandardIntents.TEXT, basicCard);
    assistant.handleRequest(actionMap);
  }
  
  
  app.post('/webhook', function (req, res) {
    console.log(JSON.stringify(req.body));
    handleIntent(req, res);
  })
  

  app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
  });  
