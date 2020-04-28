const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Third party middleware
app.use(cors());
app.use(express.json({ limit : '50mb' }));
app.use(express.urlencoded({ extended : true, limit : '50mb' }));

const db = mongoose.connection;
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



exports.app = functions.https.onRequest(app);