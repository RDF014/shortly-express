var Sessions = require('../models/session');
var util = require('../lib/utility');

var createSession = function(req, res, next) {
  // console.log('-----',req.cookies);
  req.session = {
    hash: null,
  };
  if (Object.keys(req.cookies).length === 0) {
    var newKey = util.sha1(util.getRandomSalt(), util.getRandomSalt());
    req.session.hash = newKey.password;
    res.cookies['shortlyid'] = {value: newKey.password};
  }
  next();
};

module.exports = createSession;
