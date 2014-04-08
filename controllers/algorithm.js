var monk = require('monk');
var db = monk('localhost:27017/cpt');

var doc = {"keyword" : "Algorithm, 算法", "description" : "包罗最全的计算机算法知识，从数据结构基础开始、介绍常用算法、深入理解。"};

exports.remove = function(req, res){
    var url = req.param('url');
    var col = db.get('algorithm');

    col.remove({"url":url}, {}, function(e, a){
        res.redirect('/admin');
    });
};

exports.view = function(req, res){
    var url = req.param('url');
    var col = db.get('algorithm');

    col.findOne({"url":url}, {}, function(e, algorithm){
        res.render('algorithm', {"doc" : algorithm});
    });
};

exports.edit = function(req, res){
    var col = db.get('algorithm');

    if (req.method == 'GET') {
        var url = req.param('url');
        col.findOne({"url":url}, {}, function(e, algorithm){
            res.render('edit', {"doc" : algorithm});
        });
    } else if (req.method == 'POST') {
        var body = req.body;
        col.update(
                { "_id": body._id },
                { 
                    "name": body.name,
                    "url": body.url,
                    "keyword": body.keyword,
                    "description": body.description,
                    "content" : body.content
                }
        );
        res.redirect('/edit/'+body.url);
    }
};

exports.add = function(req, res){
        if (req.method == 'GET') {
            res.render('add', {"doc" : doc});
        } else {
            var name = req.body.name;
            var url = req.body.url;
            var keyword = req.body.keyword;
            var description = req.body.description;
            var content = req.body.content;

            var col = db.get('algorithm');
            col.insert({
                "name" : name,
                "url" : url,
                "keyword": keyword,
                "description": description,
                "content" : content
            },function (err, doc) {
                if (!err) {
                    res.redirect("/admin");
                }
            });
        }
    };
