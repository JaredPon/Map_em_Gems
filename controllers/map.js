var mongoose = require('mongoose');
var bodyParser = require('body-parser');

exports.show = function(req, res) {
  res.render('map', {
    title: 'Map'
    
  });
};


exports.postSearch = function(req, res) {
  // set clientNum to clientid (passed in through getjson)
  var clientNum = +req.query.clientid;
  mongoose.model('Claim').find({'properties.CLIENTNUM': clientNum}, {_id: 0}, function(err, claims){
      res.json(claims);
    });
};
