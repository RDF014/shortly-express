var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

module.exports = {
  addDb: function(req, res) {
    // { username: 'Samantha', password: 'Samantha' }
    var data = req.body;
    var password = utils.sha1(data.password, utils.getRandomSalt());
    db.queryAsync(`INSERT INTO users(username, password, salt) 
      VALUES("${data.username}", "${password.password}", "${password.salt}")`)
    .then((data) => {
      res.redirect('/');
    })
    .catch((err) => {
      res.redirect('/signup');
    });
  },
  logInDb: function(req, res) {
    var data = req.body;
    db.queryAsync(`SELECT * FROM users WHERE username = '${data.username}'`)
    .then((rows) => {
      var userData = rows[0][0];
      var salt = userData.salt;
      var encryp = utils.sha1(data.password, salt);
      if ( userData.password === encryp.password) {
        res.redirect('/');
      } else {
        res.redirect('/login');
      }
    })
    .catch((err) => {
      res.redirect('/login');
    });
  } 
};
