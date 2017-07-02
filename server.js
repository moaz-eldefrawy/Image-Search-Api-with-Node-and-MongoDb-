// server.js
// where your node app starts

// init project
var express = require('express'),
    mongodb = require('mongodb');
var app = express(),
    MongoClient = mongodb.MongoClient,
    dbUrl = "mongodb://first:first@ds147052.mlab.com:47052/records";
      
var url = process.env.MONGOLAB_URI;
url = "1";
console.log(url);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));



// get latest image search
app.get('/api/latest/imagesearch', function(req, res){
  
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
