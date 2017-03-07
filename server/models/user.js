var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

module.exports = {
  addDb: function(req, res) {
    // { username: 'Samantha', password: 'Samantha' }
    var data = req.body;
    var password = utils.sha1(data.password);
    db.queryAsync(`INSERT INTO users(username, password, hash) 
      VALUES("${data.username}", "${password.password}", "${password.hash}")`)
    .then((data) => {
      res.redirect('/');
    })
    .catch((err) => {
      res.redirect('/signup');
    });
  } 
};
