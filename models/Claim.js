//Claim Model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema Defined Here
var claimSchema = new Schema({
  gid: Number,
  tnrtpcd: String,
  ttltpdsc: String,
  tnrsbtpcd: String,
  prcntowner: Number,
  ntrtmstmp: String,
  tnrsbtpdsc: String,
  owner_name: String,
  trmntntpds: String,
  tag_number: String,
  objectid: Number,
  gdtdt: String,
  ntrsrd: String,  
  claim_name: String,
  num_owners: Number,
  clientnum: Number,
  issue_date: String,
  protected: String,
  pdtsrd: String,
  pdttmstmp: String,
  tnrtpdscrp: String,
  tnrnmbrd: Number,
  rvsnnmbr: Number,
  fcode: String,
  trmntndt: String,
  rnhctrs: Number,
  ttltpcd: String,
  geometry: { type: [String], index: '2dsphere'}
}, { collection : 'docs' });
// }
// 
mongoose.model('Claim', claimSchema);
