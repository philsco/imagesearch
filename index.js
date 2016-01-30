var express = require('express');
var app = express();
var path = require('path');
var url = require('url');
var mongoose = require('mongoose');
var imgsearch = require('./store/imgsearch');

app.set('view engine', 'jade');
app.set('views', './pub/views');

app.get('/imgsearch/latest', function (req, res) {
    imgsearch("getLatest", null, function (result) {
        res.end(result);
        return;        
    });
});

app.get('/imgsearch*', function (req, res) {
    if (!req.query.q) {
        res.render('imgsearch');      
    } else if (req.query.q.split(" ").length === 0) {
        res.end(JSON.stringify({"error": "badquery", "message": "This is not a valid query"}));
    } else {
        var queryObj = {};
        queryObj.q = req.query.q.split(" ");
        queryObj.p = req.query.offset || 1;
        imgsearch("saveQuery", queryObj, function (result) {
            res.end(result);
            return;        
        });
    }
});

app.get('/', function (req, res) {
  res.render('imgsearch');
});

app.get('/*', function (req, res) {
  res.render('imgsearch');
});

  var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});