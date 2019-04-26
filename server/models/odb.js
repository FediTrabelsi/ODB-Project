const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
const Schema = mongoose.Schema;

const odbSchema= new Schema({
    
});


module.exports= mongoose.model('Odb',odbSchema);