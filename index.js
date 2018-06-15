var admin = require("firebase-admin");
var fs = require('fs');
var serviceAccount = require("./simplecounter-5ecc2-firebase-adminsdk-jln2z-3c2d1056e3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://simplecounter-5ecc2.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("iot");
var v;
ref.on("value", function(snapshot) {
    console.log(snapshot.val().status);
    v = snapshot.val().status;
});

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    fs.readFile('index.html', function(error, data) {
        res.writeHead(200, { 'Content-Type' : 'text/html'});
        res.end(data);
    }) 

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

