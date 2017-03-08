var db = require('../db');
var util = require('../lib/utility');

// Write you session database model methods here

module.exports = {
  searchDb: (hash) => {
    return db.queryAsync(`SELECT users.username, users.id FROM users INNER JOIN sessions
      ON (users.id = sessions.user_id) WHERE sessions.hash = '${hash}';`);
  },
  insertDb: (hash) => {
    console.log('INSIDE InsertDB');
    db.queryAsync('INSERT INTO sessions SET ?', {hash: hash});
  }

};
