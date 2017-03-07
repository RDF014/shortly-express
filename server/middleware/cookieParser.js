module.exports = function(req, res, next) {
  req.cookies = {};
  if (req.headers.cookie !== undefined) {
    var cookies = req.headers.cookie.split('; ');
    cookies.forEach((value) => {
      var props = value.split('=');
      req.cookies[props[0]] = props[1];
    });
  } 
  next();
};

// module.exports = parseCookies;