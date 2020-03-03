/*esversion : 6*/
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {useNewUrlParser: true});

var db = mongoose.connection;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
});

db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

http.listen(3000, () => {
    console.log("Listening on port *:3000");
});