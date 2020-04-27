/*esversion : 6*/
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const options = {
    key: fs.readFileSync("rootSSL.key"),
    cert: fs.readFileSync("rootSSL.pem"),
    passphrase: process.env.FILE_PASSPHRASE
};

const visitor = require('./routes/visitor.route');
const faculty = require('./routes/faculty.route');
const visitingDetails = require('./routes/visitingDetails.route');
const admin = require('./routes/admin.route');

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("DB Connected"))
.catch((error) => console.log(error));

const db = mongoose.connection;
const app = express();
app.use(cors());
app.use(express.json({ limit : '50mb' }));
app.use(express.urlencoded({ extended : true, limit : '50mb' }));
app.use(morgan("combined"));

app.use('/api/visitor', visitor);
app.use('/api/faculty', faculty);
app.use('/api/dashboard', visitingDetails);
app.use('/api/admin', admin);
app.use(express.static('client/build'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.set('view engine', 'ejs');
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

var server = https.createServer(options, app);

server.listen(5000, () => {
    console.log("Listening on port *:5000");
});