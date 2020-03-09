/*esversion : 6*/

const express = require('express');
//const http = require('http').createServer(app);
const bodyParser = require('body-parser');
//const io = require('socket.io')(http);
const mongoose = require('mongoose');

const visitor = require('./routes/visitor.route');

const mongoDB = 'mongodb+srv://admin:LR%21RzEy7CwyfM4%40@cluster0-yr65m.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("DB Connected"));

const db = mongoose.connection;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.get('/api', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/api/visitor', visitor);

// io.on('connection', (socket) => {
//     console.log('A user connected');
// });

db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

app.listen(5000, () => {
    console.log("Listening on port *:5000");
});