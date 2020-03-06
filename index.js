/*esversion : 6*/
const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const mongoose = require('mongoose');

const visitor = require('./routes/visitor.route');

var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

app.get('/api', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/api/visitor', visitor);

io.on('connection', (socket) => {
    console.log('A user connected');
});

db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

http.listen(5000, () => {
    console.log("Listening on port *:5000");
});