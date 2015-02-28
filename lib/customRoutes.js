"use strict";

var db = require('./nodebb').db,
	groups = require('./nodebb').groups;


function renderCrypto(req, res, next){


			db.getObjectField('user:' + req.user.uid + ':settings', 'nodebb-plugin-reddcoin:address', function(err, address) {
			if (err) {
				callback(err);
			}

			//Create Api
			res.json({
				uid: req.user.uid,
				address: address
			});	

		});

}



function renderHistory(req, res, next) {
	/*
	Make sure the route matches your path to template exactly.

	If your route was:
		myforum.com/some/complex/route/
	your template should be:
		templates/some/complex/route.tpl
	and you would render it like so:
		res.render('some/complex/route');    */
console.log('Start History Route');
	 	

var data = {
		test: [
			{
				'name': 'redd',
				'amount': '10000'
			}
		],
		'user_count': 'count',
		'my_name': 'john'
	};
res.render('history', data);

}

module.exports = function(app, middleware, controllers) {
	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	app.get('/api/crypto',renderCrypto);
	app.get('/user/:userslug/history', middleware.buildHeader, renderHistory);
	app.get('/api/user/:userslug/history', renderHistory);
};
