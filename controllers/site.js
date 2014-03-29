exports.index = function(req, res){
  res.render('index');
};

exports.test = function(req, res){
  res.render('test');
};

exports.newuser = function(req, res){
  res.render('newuser');
};

exports.add = function(db) {
    return function(req, res){
        var userName = req.body.username;
        var userEmail = req.body.useremail;

        var collection = db.get('usercollection');
        
        collection.insert({
            "username" : userName,
            "email" : userEmail
        },function (err, doc) {
            if (err) {
                res.send("Error");
            } else {
                res.location("db");
                res.redirect("db");
            }
        });
    };
};
