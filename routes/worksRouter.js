const express = require('express');
const bodyParser = require('body-parser');
const Work = require('../models/work');
const cors = require('./cors');
const authenticate = require('../authenticate');
const multer = require('multer');

const worksRouter = express.Router();

worksRouter.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let text = req.body;
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

worksRouter.route('/')
.get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /works');
})
.post(cors.cors, upload.single('imageFile'), authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Work.create(JSON.parse(req.body.work))
    .then(work => console.dir(`Work created: ${work}`));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})
.put((req, res) => {
    res.statusCode = 403;
    res.send('PUT operation not supported on /works');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Work.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.json(response);
        res.end('works deleted');
    });
});
  
module.exports = worksRouter;