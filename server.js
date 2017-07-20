// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');
var url = require('url');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("*", function (request, response) {
  var parsed = url.parse(request.url).pathname.toString().slice(1);
  if ( isNaN(Number(parsed))) {
    var re = /(%20)/gi;
    var reparse = parsed.replace(re, ' ')
    var day  = moment(reparse).unix();
    if ( isNaN(day)) {
      reparse = null
    }
    var res = {"unix": day, "natural": reparse};
    response.send(res);
  } else {
    if (parsed.length < 10 || parsed.length > 10) {
      response.sendFile(__dirname + '/views/index.html')
      return;
    }
    var parsedNum = Number(parsed);
    console.log(parsedNum);
    var now = moment(parsedNum * 1000);
    if (now.isValid()) {
      res = { 
        "unix": parsedNum,
        "natural": now.format('MMMM Do YYYY')
      }
    } else {
      res = {
        "unix": null,
        "natural": null
      }
    }
    response.send(res);
  }

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
