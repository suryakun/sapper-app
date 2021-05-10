const functions = require('firebase-functions');

exports.ssr = functions.https.onRequest((_req, res) => res.send("Hello sapper"))

exports.addToNotif = functions.firestore.document("story").onCreate((doc, context) => {
    console.log(doc)
})