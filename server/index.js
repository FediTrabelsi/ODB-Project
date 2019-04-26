var express =require('express');
const app = express();
const mongoose=require('mongoose');
const config = require('../config/database');
const bodyParser= require('body-parser');
const cors= require('cors'); 
const auth = require('./routes/auth.js')

app.use(bodyParser.urlencoded({extended: false}));

mongoose.Promise=global.Promise;


mongoose.connect(config.uri,(err) => {
    if (err){
        console.log('Could not connect to db',err);
    }else{
        console.log('Connected to : '+  config.db);
    }
});


app.get('/',(req,res) => {
    res.send('ben arbia server runnig on port 8000');
});
app.use('/auth',auth);
app.listen(8000, () =>{
    console.log('Server listening on port 8000');
});