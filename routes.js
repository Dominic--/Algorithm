var site = require('./controllers/site');
var algorithm = require('./controllers/algorithm');

module.exports = function (app) {
	// Site
    app.get('/', site.index);
    app.get('/overview', site.overview);
    app.get('/admin', site.auth, site.admin);

    app.get('/login', site.login);
    app.get('/logout', site.logout);

    app.post('/login', site.login);

    // Algorithm

    // Guest will view the webpage by this way
    app.get('/algorithm/:url?', algorithm.view);

    // Admin Enterance
    app.get('/add', site.auth, algorithm.add);
    app.get('/edit/:url?', site.auth, algorithm.edit);
    app.get('/remove/:url?', site.auth, algorithm.remove);

    app.post('/add', site.auth, algorithm.add);
    app.post('/edit/:url?', site.auth, algorithm.edit);
};
