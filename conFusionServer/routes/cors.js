const express = require('express')
const cors = require('cors')
const app = express()

var whiteList = ['http://localhost:3000','https://localhost:3443'];

var corsOptionDelegate = ((req,callback)=>{
    var corsOptions;
    if(whiteList.indexOf(req.header('Origin'))!==-1){
            corsOptions = {origin:true}
    }
    else{
            corsOptions = {origin:false}
    }

     callback(null,corsOptions)
})

exports.cors = cors();
exports.corsOptions = cors(corsOptionDelegate);