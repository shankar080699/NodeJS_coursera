//REst APi
/*
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const promoRouter  = express.Router();
promoRouter.use(bodyParser.json());
const Promotions = require('../models/promotions');
promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotions    to you!');
})
.post((req,res,next)=>{
    res.end('Will add the promotion :'+req.body.name+' with details : '+req.body.description)
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('Put operation not supported on /promotions')
})
.delete((req,res,next)=>{
    res.end('Deleting all promotions')
})

promoRouter.route('/:promoId')
.all((req,res,next)=>{
    res.statusCode=200
    res.setHeader('Content-Type','text/plain')
    next()
})
.get((req,res,next)=>{
    res.end('Will send details of the promotion : '+req.params.promoId+' to you!')
})
.post((req,res,next)=>{
    res.statusCode=403
    res.end('POST operation not supported on /promotions/'+req.params.promoId)
    
})
.put((req,res,next)=>{
    res.write('Updating the promotion : '+ req.params.promoId + '\n' );
    res.end('Will update the promotion : '+req.body.name+' with details:'+req.body.description)
})
.delete((req,res,next)=>{
    res.end('Deleting  the promotion : '+req.params.promoId)
})

module.exports = promoRouter;
*/
// rest api mongo
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const promoRouter  = express.Router();
promoRouter.use(bodyParser.json());
const Promotions = require('../models/promotions');
var authenticate = require('../authenticate');
const cors = require('./cors');

promoRouter.route('/')
.options(cors.corsOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    Promotions.find({})
    .then((promotions)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(promotions);
    },(err)=>next(err))
    .catch((err)=>{next(err)})
})
.post(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Promotions.create(req.body)
    .then((promotion)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>{next(err)})
})
.put(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('Put operation not supported on /promotions')
})
.delete(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
},(err)=>next(err))
.catch((err)=>{next(err)})

    
})

promoRouter.route('/:promoId')
.get(cors.cors,(req,res,next)=>{
        Promotions.findById(req.params.promoId)
        .then((promotion)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(promotion);
        },(err)=>next(err))
        .catch((err)=>next(err))
})
.post(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403
    res.end('POST operation not supported on /promotions/'+req.params.promoId)
    
})
.put(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Promotions.findByIdAndUpdate(req.params.promoId,{$set:req.body},{new: true})
    .then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.delete(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

module.exports = promoRouter;
