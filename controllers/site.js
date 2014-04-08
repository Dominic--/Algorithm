var monk = require('monk');
var db = monk('localhost:27017/cpt');
var doc = {"keyword" : "Algorithm, 算法", "description" : "包罗最全的计算机算法知识，从数据结构基础开始、介绍常用算法、深入理解。"};

exports.index = function(req, res){
  res.render('index', {'doc' : doc});
};

exports.auth = function(req, res, next) {
    if (req.session.login == 'cpt'){
        next();
    } else {
        res.redirect('/login');
    }
};

exports.login = function(req, res) {
    var post = req.body;
    if (post.name == 'cpt' && post.password == 'cpt'){
        //console.log(req.session);
        req.session.login = 'cpt';
        res.redirect('/admin');
    } else {
        res.render('login', {'doc' : doc});
    }
};

exports.logout = function(req, res) {
    delete req.session.login;
    res.redirect('/');
};

exports.overview = function(req, res) {
    var col = db.get('algorithm');

    col.find({}, {}, function(e, algorithms) {
        res.render('overview', {'algorithms' : algorithms, 'doc' : doc});
    });
}

exports.admin = function(req, res) {
    var col = db.get('algorithm');

    col.find({}, {}, function(e, algorithms) {
        res.render('admin', {'algorithms' : algorithms, 'doc' : doc});
    });
}
