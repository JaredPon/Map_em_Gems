var mongoose = require('mongoose');
var bodyParser = require('body-parser');

exports.show = function(req, res) {
  res.render('map', {
    title: 'Map'
    
  });
};


exports.postSearch = function(req, res) {
  var ClientNum = req.query.CLIENTNUM;
  console.log(ClientNum);

  var showme = mongoose.model('Claim').find({'properties.CLIENTNUM': ClientNum}, {_id: 0}, function(err, claims){
      res.json(claims);
    });

  console.log(showme);
};
