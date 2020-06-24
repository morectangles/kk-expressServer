const express = require('express');
const bodyParser = require('body-parser');

const contactRouter = express.Router();

contactRouter.get('/', function(req, res, next) {
    res.statusCode = 200;
    res.render('index', { title: 'Express' });
});
  
module.exports = contactRouter;