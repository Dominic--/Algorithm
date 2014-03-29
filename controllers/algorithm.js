exports.bubble_sort = function(db) {
    return function(req, res){
        var collection = db.get('usercollection');
        collection.find({}, {}, function(e, docs){
            res.render('base', {"userlist" : docs});
        });
    };
};

