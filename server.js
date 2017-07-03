// server.js
// where your node app starts

// init project
var express = require('express'),
    mongodb = require('mongodb');
var imageSearch = require('node-google-image-search');
var app = express(),
    MongoClient = mongodb.MongoClient,
    dbUrl = process.env.dbUrl;
      
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// image searching handling
app.get('/api/imagesearch/*', function(req, res){
  var searchVal = req.params[0],
      offset = req.query.offset || 10;
  
  console.log(offset);
  var results = imageSearch(searchVal, callback, 0, offset);
  function callback(results){
    console.log(results.length);
    var answer = [];
    for(var i=0; i<results.length; i++){
      var obj = {
        title: results[i].title,
        link: results[i].link,
        contextLink: results[i].image.contextLink,
        "thumbnailLink(bigger image)": results[i].image.thumbnailLink 
      }
      answer.push(obj); 
    }  
    MongoClient.connect(dbUrl, function(err, db){
      var reqColl = db.collection('lastRequests');
      var date = new Date();
      console.log(date);
      reqColl.insert({"term": searchVal, "when": date}, {"autoIndexId": false});
      db.close();
    })
    res.writeHead(200, {'content-type': 'application/json'})
    res.end(JSON.stringify(answer));
  }
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
