/*esversion : 6*/
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const env = require('dotenv');

env.config();
console.log(process.env.MAIL_PASSWORD);

const options = {
    key: fs.readFileSync("rootSSL.key"),
    cert: fs.readFileSync("rootSSL.pem"),
    passphrase: "carmelconvent"
};

const express = require('express');
const mongoose = require('mongoose');

const visitor = require('./routes/visitor.route');
const faculty = require('./routes/faculty.route');

const mongoDB = 'mongodb+srv://admin:LR%21RzEy7CwyfM4%40@cluster0-yr65m.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("DB Connected"))
.catch((error) => console.log(error));

const db = mongoose.connection;
const app = express();
app.use(cors());
app.use(express.json({ limit : '50mb' }));
app.use(express.urlencoded({ extended : true, limit : '50mb' }));

app.get('/api', (req, res) => {
    res.sendFile("client/index.html");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.use('/api/visitor', visitor);
app.use('/api/faculty', faculty);

app.set('view engine', 'ejs');
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

var server = https.createServer(options, app);

server.listen(5000, () => {
    console.log("Listening on port *:5000");
});