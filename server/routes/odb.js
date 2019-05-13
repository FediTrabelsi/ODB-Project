var express = require('express');
var router = express.Router();
const User = require('../models/user');
const carData = require('../models/carData.js')
const jwt= require('jsonwebtoken');
const config=require('../../config/database');
const Odb = require('../models/odb.js')



router.get('/showData', function (req, res) {
  res.send('register route');
});

router.post('/getData',(req,res)=>{
    if(!req.body.odbId){
        res.json({sucess : false , message : "you have to provide your odb Id"});
    }else{
        carData.find({odbId : req.body.odbId},(err,data)=>{
            if(err){
                res.json({sucess : false , message : "No data available for this odb"});
            }else{
                res.json({sucess : true , message : "fetching data",data : data});
            }
        })
    }
});

router.post('/getSpeed',(req,res)=>{
    carData.find({odbId : req.body.odbId}, function(err, docs) {
        var count = [];
        for(var i = 0; i<docs.length; i++) {
            count.push(Number(docs[i].speed));
        }
        res.json({sucess : true ,'speeds':count});
    });
})

router.post('/getOilTemp',(req,res)=>{
    carData.find({odbId : req.body.odbId}, function(err, docs) {
        var count = [];
        for(var i = 0; i<docs.length; i++) {
            count.push(Number(docs[i].OilTemp));
        }
        res.json({sucess : true ,'oil':count});
    });
})

router.post('/getFlow',(req,res)=>{
    carData.find({odbId : req.body.odbId}, function(err, docs) {
        var count = [];
        for(var i = 0; i<docs.length; i++) {
            count.push(Number(docs[i].fuelFlowRate));
        }
        res.json({sucess : true ,'flow':count});
    });
})

router.post('/getTime',(req,res)=>{
    carData.find({odbId : req.body.odbId}, function(err, docs) {
        var count = [];
        for(var i = 0; i<docs.length; i++) {
            count.push(docs[i].mesureTime)
        }
        res.json({sucess : true ,'times':count});
    });
})



router.post('/sendData',(req,res)=>{
    if(!req.body.odbId){
        res.json({succes : false, message :' you have to provide your odb Id'});
    }else{
        Odb.findOne({_id : req.body.odbId},(err,odb)=>{
            if(err){
                res.json({succes : false, message :'Odb Id does not exist'});
            }else{
                if(odb===null){
                    res.json({succes : false, message :'Odb Id does not exist'});
                }else{
                    if(req.body.fuelLevel){
                        fuelLevel= req.body.fuelLevel
                    }else{
                        fuelLevel="-1"
                    }

                    if(req.body.fuelFlowRate){
                        fuelFlowRate= req.body.fuelFlowRate
                    }else{
                        fuelFlowRate="-1"
                    }

                    if(req.body.speed){
                        speed= req.body.speed
                    }else{
                        speed="-1"
                    }

                    if(req.body.fuelKmByLiter){
                        fuelKmByLiter= req.body.fuelKmByLiter
                    }else{
                        fuelKmByLiter="-1"
                    }

                    if(req.body.Rpm){
                        Rpm= req.body.Rpm
                    }else{
                        Rpm="-1"
                    }

                    if(req.body.OilTemp){
                        OilTemp= req.body.OilTemp
                    }else{
                        OilTemp="-1"
                    }

                    if(req.body.CoolTemp){
                        CoolTemp= req.body.CoolTemp
                    }else{
                        CoolTemp="-1"
                    }

                    if(req.body.Co2Ex){
                        Co2Ex= req.body.Co2Ex
                    }else{
                        Co2Ex="-1"
                    }

                    if(req.body.CatTemp){
                        CatTemp= req.body.CatTemp
                    }else{
                        CatTemp="-1"
                    }

                    if(req.body.AirRatio ){
                        AirRatio = req.body.AirRatio
                    }else{
                        AirRatio ="-1"
                    }

                    if(req.body.Gps ){
                        Gps = req.body.Gps 
                    }else{
                        Gps ="-1"
                    }
                    let data = new carData({
                        odbId: req.body.odbId,
                        mesureTime : getDateTime(),
                        fuelLevel : fuelLevel,
                        fuelFlowRate : fuelFlowRate,
                        speed : speed,
                        fuelKmByLiter : fuelKmByLiter,
                        Rpm : Rpm,
                        OilTemp : OilTemp,
                        CoolTemp : CoolTemp,
                        Co2Ex : Co2Ex,
                        CatTemp : CatTemp,
                        AirRatio : AirRatio,
                        Gps : Gps
                    });
                    data.save((err)=>{
                        if(err){
                            res.json({succes: false, message : 'could not send data'});
                        }else{
                            res.json({succes : true, message : 'data sent'})
                        }
                    })
                    
                }
            }
        })
    }
})


function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

module.exports = router;