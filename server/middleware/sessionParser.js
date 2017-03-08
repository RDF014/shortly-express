var Sessions = require('../models/session');
var util = require('../lib/utility');
var db = require('../db');


var createSession = function(req, res, next) {
  res.cookies = {};
  req.session = {
    hash: null,
  };
  if (Object.keys(req.cookies).length === 0) {
    var newKey = util.sha1(util.getRandomSalt(), util.getRandomSalt());
    req.session.hash = newKey.password;
    res.cookies['shortlyid'] = {value: newKey.password};
    Sessions.insertDb(newKey.password); 
  } else {
    req.session.hash = req.cookies.shortlyid;
    Sessions.searchDb(req.session.hash)
    .then((data) => {
      console.log('RETURNED PROMISE', data);
      var userData = data[0][0];
      db.queryAsync('UPDATE sessions SET user_id=? WHERE hash=?', [userData.id, req.session.hash]);
      req.session['username'] = userData.username;
      req.session['user_id'] = req.session.hash;
      console.log(req.session);
    });

  }
  next();
};

module.exports = createSession;
