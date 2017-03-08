var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

module.exports = {
  addDb: function(req, res) {
    var data = req.body;
    console.log(data);
    var password = utils.sha1(data.password, utils.getRandomSalt());
    db.queryAsync(`INSERT INTO users(username, password, salt) 
      VALUES("${data.username}", "${password.password}", "${password.salt}");`)
    .then((data) => {
      console.log('IN HERE')
      res.redirect('/');
    })
    .catch((err) => {
      res.redirect('/signup');
    });
  },
  logInDb: function(req, res) {
    var data = req.body;
    return db.queryAsync(`SELECT * FROM users WHERE username = '${data.username}'`);
  } 
};
