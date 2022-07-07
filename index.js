
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ origin: true }));

//firebase function Intilalize
const functions = require("firebase-functions");

const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Routes
app.get("/", (req, res) => {
  return res.status(200).send("Hai there");
});
// create
// Post
app.post("/api/create", (req, res) => {
  (async () => {
    try {
      await db.collection("userdetails").doc(`/${Date.now()}/`).create({
        id: Date.now(),
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,
      });

      return res.status(200).send({ status: "Success", msg: "Data Saved" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});


// Exports api to the firebase cloud functions
exports.app = functions.https.onRequest(app);
