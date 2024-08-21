var express = require("express")
var bodyParser =require("body-parser")
var http = require('http');
var socketIo =require('socket.io');
var mongoose = require('mongoose')

var app = express();

app.get('/', (_req, res) => {
    res.send('Welcome to the message server!');
});


app.use(express.static(__dirname));
app.use(express.json())
app.use(express.urlencoded({extended: false}))



var messages = [
    {name:"boaz" , message:"hi "},
    {name:"uri", message:"hi"},
];

app.get('/messages',(req,res) => {
    res.send(messages)
});

app.post('/messages',(req,res) => {
messages.push(req.body)
io.emit('message',req.body)
    res.sendStatus(200)
});

var server =http.createServer(app)
var io = socketIo(server)

io.on('connection',(socket)=>{
    console.log('user connected')
})


server.listen(3040, () => {
console.log('server running on port',server.address().port)

})