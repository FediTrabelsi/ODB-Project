var express =require('express');
const app = express();
const mongoose=require('mongoose');
const config = require('../config/database');
const bodyParser= require('body-parser');
const cors= require('cors'); 
const auth = require('./routes/auth.js');
const odb = require('./routes/odb.js');
var request = require('request');
var ioclient=require('socket.io-client');

app.use(bodyParser.urlencoded({extended: false}));

mongoose.Promise=global.Promise;


mongoose.connect(config.uri,(err) => {
    if (err){
        console.log('Could not connect to db',err);
    }else{
        console.log('Connected to : '+  config.db);
    }
});
let cue = 'The actors are here!';


app.use(cors({
    origin:'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({extended: false}));
app.get('/',(req,res) => {
    res.send('ben arbia server runnig on port 8000');
});
app.use('/auth',auth);
app.use('/odb',odb);
app.listen(8000, () =>{
    console.log('Server listening on port 8000');
});

var server = app.listen('3000',()=>{
    console.log('socket on port 3000')
});
var io =require('socket.io').listen(server);

io.on('connection',(socket)=>{

    console.log('new connection made.');


    socket.on('join', function(data){
      socket.join(data.room);

      console.log(data.user + ' joined the chat of : ' + data.room);

      socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined project chat'});
    });


    socket.on('leave', function(data){
    
      console.log(data.user + ' left the room : ' + data.room);

      socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});

      socket.leave(data.room);
    });

    socket.on('message',function(data){
        console.log(data.message)
      io.in(data.room).emit('new message', {user:data.user, message:data.message});
    })

    socket.on('removeNotif',function(data){
        console.log(data.user +' ' + data.message);

        io.in(data.room).emit('remove', {user:data.user, message:data.message});
      })

    socket.on('notify',function(data){
        console.log(data.user  + data.message);

        socket.broadcast.to(data.room).emit('you recieved a new notification', {user:data.user, message:data.message,img:data.img});
    
    })
    
});

setTimeout(function() {  
    io.emit('connection',io);

    
}, 1000); 
setInterval(function() {  
    var data= {room:'5cc3489d57ac3e180af00774',user : 'fedi'}
    socket=ioclient('http://localhost:3000/');
     socket.emit('join',data);

   var headers = {
    'Content-Type':     'application/x-www-form-urlencoded'
}

var options = {
    url: 'http://localhost:8000/odb/sendData',
    method: 'Post',
    headers: headers,
    form: {'odbId': '5cc3489d57ac3e180af00774', 
        'mesureTime' : getDateTime(),
         'fuelLevel' : random(1,15),
         'fuelFlowRate' : random(2,10),
         'speed' : random(40,120),
         'fuelKmByLiter' : random(1,5),
         'Rpm' : random(10,90),
         'OilTemp' : random(24,50),
         'CoolTemp' : random(24,50),
         'Co2Ex' : random(3,6),
         'CatTemp' : random(24,50),
         'AirRatio' : random(2.10),
         'Gps' : random(1,1000)    
        }
}

request(options, function (error, response, body) {
    console.log(body)
})

const msgdata={
    user:"5cc3489d57ac3e180af00774",
    message :"new Data sent"
}
socket.emit('message',msgdata);
clients = io.in('5cc3489d57ac3e180af00774')

    

    
    
}, 12000); 

function random(low, high) {
    return Math.floor((Math.random() * (high - low) + low)).toString()
  }

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
