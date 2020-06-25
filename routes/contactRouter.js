const express = require('express');
const bodyParser = require('body-parser');
const Contact = require('../models/contact');
const cors = require('./cors');
const authenticate = require('../authenticate');

const contactRouter = express.Router();

contactRouter.use(bodyParser.json());

contactRouter.route('/')
.get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Contact.find()
    .then( messages => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(messages);
        })
    .catch(err => next(err));
})
.post(cors.cors, (req, res, next) => {
    Contact.create(req.body)
    .then(message => {
        console.log(`Message created: ${message}`)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(message);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.send('PUT operation not supported on /contact');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Contact.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});
  
module.exports = contactRouter;