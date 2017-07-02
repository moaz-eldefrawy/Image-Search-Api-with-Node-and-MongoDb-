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

// image searching handling
app.get('/api/imagesearch/*', function(req, res){
  var searchReq = req.params[0],
      offset = req.query.offset;
  console.log(offset)
  res.end();
})

// get latest image search
app.get('/api/latest/imagesearch', function(req, res){
  res.writeHead(200, {'Content-Type': 'application/json'})
  MongoClient.connect(dbUrl, function(err, db){
    if(err) console.log(dbUrl);
    else{
      var reqColl = db.collection('lastRequests');  
      reqColl.find().limit(10).toArray(function(err, docs){
        if(err) console.log("error!! : " + err);
        else{
          res.end(JSON.stringify(docs))
        }
        db.close()
      })
    }
  })  
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
