var site = require('./controllers/site');
var algorithm = require('./controllers/algorithm');


module.exports = function (app, db) {
	// Site
    app.get('/', site.index);
    app.get('/new', site.newuser);

    app.post('/adduser', site.add(db));

    // Algorithm
    app.get('/bubble_sort', algorithm.bubble_sort(db));

}
