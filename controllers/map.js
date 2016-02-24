var mongoose = require('mongoose');
var bodyParser = require('body-parser');

exports.show = function(req, res) {
  res.render('map', {
    title: 'Map'
  });
};


exports.postSearch = function(req, res) {
  // set clientNum to clientid (passed in through getjson)
  var clientNum = +req.query.clientnum;
  var TNRNMBRD = +req.query.TNRNMBRD;
  var TNRTPDSCRP = req.query.TNRTPDSCRP;
  var GDTDT = req.query.GDTDT+'000000';
  var ownerName = req.query.ownerName;

  // mongoose.model('Claim').find({'properties.clientnum': clientNum}, {_id: 0}, function(err, claims){
  //     res.json(claims);
  //   });

  var array = [];

  if (clientNum !== 0)
    array.push({ 'properties.CLIENTNUM': clientNum });

  if (TNRNMBRD !== 0)
  array.push({ 'properties.TNRNMBRD': TNRNMBRD });

  if (TNRTPDSCRP !== "")
  array.push({ 'properties.TNRTPDSCRP': TNRTPDSCRP });

  if (GDTDT !== "000000")
  array.push({ 'properties.GDTDT': { $lt: GDTDT }});

  if (ownerName !== "")
  array.push({ 'properties.OWNER_NAME': ownerName });
  
  console.log(array);


  mongoose.model('Claim').find({
    $and:array
    }, function(err, claims){
      res.json(claims);
    });
};

