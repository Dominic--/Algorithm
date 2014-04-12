var monk = require('monk');
var db = monk('localhost:27017/cpt');
var sm = require('sitemap');

var doc = {"title" : "","keyword" : "Algorithm, 算法", "description" : "包罗最全的计算机算法知识，从数据结构基础开始、介绍常用算法、深入理解。"};

exports.index = function(req, res){
  res.render('index', {'doc' : doc});
};

exports.notfound = function(req, res){
    var doc = {"title" : "找不到页面","keyword" : "找不到页面", "description" : "找不到相应页面，网址输入有误"};
    res.render('404', {'doc' : doc});
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
        res.redirect('/sitemap');
    } else {
        res.render('login', {'doc' : doc});
    }
};

exports.logout = function(req, res) {
    delete req.session.login;
    res.redirect('/');
};

exports.algorithm = function(req, res) {
    var col = db.get('algorithm');

    col.find({}, { fields:{url : 1, title : 1,  _id : 0} }, function(e, algorithms) {
        res.render('algorithms', {'algorithms' : algorithms, 'doc' : doc});
    });
};

exports.sitemap = function(req, res) {
    var col = db.get('algorithm');
    var is_login = false;
    if (req.session.login == 'cpt')
        is_login = true;

    col.find({}, { fields:{url : 1, title : 1,  _id : 0} }, function(e, algorithms) {
        res.render('sitemap', {'algorithms' : algorithms, 'doc' : doc, 'login' : is_login});
    });
};

exports.sitemapxml = function(req, res) {
    var col = db.get('algorithm');
    col.find({}, { fields:{url : 1, _id : 0} }, function(e, urls) {
        var sitemap = sm.createSitemap({
            hostname: 'http://www.algorithm.cc',
            cacheTime: 600000,
            urls: [
                {url:'', priority: 0.8}, 
                {url:'/algorithm/', priority: 0.6}
                ]
        });
        
        urls.forEach(function (u) {
            sitemap.add({url: '/algorithm/'+u.url});
        });

        sitemap.toXML( function (xml) {
            res.header('Content-Type', 'application/xml');
            res.send(xml);
        });
    });
    
};
