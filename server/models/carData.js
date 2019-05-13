const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
const Schema = mongoose.Schema;

const carDataSchema= new Schema({
    odbId : {type : String, required : true},
    mesureTime :{type : String, required : true},
    fuelLevel : {type : String, default :"-1"},
    fuelFlowRate : {type : String, default :"-1"},
    speed : {type : String, default :"-1"},
    fuelKmByLiter : {type : String, default :"-1"},
    Rpm : {type : String, default :"-1"},
    OilTemp : {type : String, default :"-1"},
    CoolTemp : {type : String, default :"-1"},
    Co2Ex : {type : String, default :"-1"},
    CatTemp : {type : String, default :"-1"},
    AirRatio : {type : String, default :"-1"},
    Gps : {type : String, default :"-1"}


});


module.exports= mongoose.model('CarData',carDataSchema);