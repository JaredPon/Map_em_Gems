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
  var ne_lat = JSON.parse(req.query.ne_lat);
  var ne_lng = JSON.parse(req.query.ne_lng);
  var sw_lat = JSON.parse(req.query.sw_lat);
  var sw_lng = JSON.parse(req.query.sw_lng);
  var sw = [sw_lng, sw_lat];
  var nw = [sw_lng, ne_lat];
  var ne = [ne_lng, ne_lat];
  var se = [ne_lng, sw_lat];

  // mongoose.model('Claim').find({'properties.clientnum': clientNum}, {_id: 0}, function(err, claims){
  //     res.json(claims);
  //   });

  var geoQuery =
    {"geometry": {$geoWithin: {$geometry: {type : "Polygon" ,coordinates: [[sw, nw, ne, se, sw]]}}}};

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

  // Geo Query Stuff (Nick)
  // if (typeof req.query.sw !== "undefined"){
    array.push(geoQuery);
  
  console.log(geoQuery);
  console.log("search array = " + array[0], array[1]);

  mongoose.model('Claim').find({
    $and:array
    }, function(err, claims){
      res.json(claims);
      // console.log(claims);
    });
// };
};