var session = require('express-session');
var bcrypt = require('bcrypt');

module.exports = function(app){

  app.use(session({
    secret: 'nyan cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

  app.post('/signup',function(req,res){
    //res.redirect('/auth/github');
    var user = req.body.username;
    var pass = req.body.password;

    new User({ username: user }).fetch().then(function(found){
      if (found) {
        res.send(302, "Username already exists");
      } else {

        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(pass, salt, function(err, hash){

            var newser = new User({
              username: user,
              password: hash,
              salt: salt
            });

            newser.save().then(function(newUser){
              Users.add(newUser);
              req.session.user = user;
              res.redirect('/');
            });
          });
        });


      }
    });
  });

  app.post('/login',function(req,res){
    //res.redirect('/auth/github');
    var username = req.body.username;
    var password = req.body.password;

    Users.query('where', 'username', '=', username).fetchOne().then(function(instance){

      if(instance){

        var userAttr = instance.attributes;

        bcrypt.hash(password, userAttr.salt, function(err, hashToCompare){

          if(hashToCompare === userAttr.password){
            req.session.regenerate(function(){
              req.session.user = username;
              req.session.save();
              return res.redirect('/');
            });
          }
          else{
            res.redirect('login');
          }
        });

      }
      else{
        res.redirect('/login');
      }

    });

  });

  app.get('/logout', function(req,res){

    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
}