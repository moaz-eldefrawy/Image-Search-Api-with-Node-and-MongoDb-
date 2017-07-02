// server.js
// where your node app starts

// init project
var express = require('express'),
    mongodb = require('mongodb');
var app = express(),
    MongoClient = mongodb.MongoClient,
    dbUrl = process.env.dbUrl;
      
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));



// get latest image search
app.get('/api/latest/imagesearch', function(req, res){
  MongoClient.connect(dbUrl, function(err, db){
    if(err) console.log("unable to connect to Db");
    else{
      var reqColl = db.collection('lastRequests');  
      reqColl.find().limit(10).toArray(function())
    }
  })  
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
