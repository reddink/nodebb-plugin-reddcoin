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
var g_dataObj;

function setJSON() {
	
	
	console.log('Get Reg User Group: ');
	groups.get('registered-users',{},function(err, groupObj) {
		if (err) {
			callback(err);
		}

				var userName;
				var userAddr;			

			console.log('Get Each User Details: ' + groupObj);
			for(var index in groupObj.members) {
	

				db.getObject('user:' + groupObj.members[index] + ':settings', function(err, userObj) {
					if (err) {
						callback(err);
					}

					//console.log('8. Output Global Object = ' + JSON.stringify(userObj.settings[0],null,4));
				
					traverse(userObj,process);
					// = userObj.username;
					//userAddr = userObj.settings;

				});
			}
	});
		

		//console.log('8. Output Global Object = ' + JSON.stringify(g_dataObj,null,4));
		//res.json(g_dataObj);


	//g_dataObj = v_groupObj;


}

function traverse(obj, func) {
	for (var i in obj) {
		func.apply(this,[i,obj[i]]);
		if (obj[i] !== null && typeof(obj[i]) == "object") {
			//going on step down in the object tree!!
            traverse(obj[i],func);

		}
	}
}

function process(obj, property) {
	//console.log('Key: ' + obj + ' - Value: ' + property);

}

	function getUsername (index, groupObj, callback) {
		
		db.getObject('user:' + groupObj.members[index], function(err, userObj) {
			if (err) {
				callback(err);
			}
			console.log('--In user call back');

				

			//username = userObj.username;
			//console.log('--Custom Route User :' + username);

		//console.log('--Custom Callback returning ' + username);

		callback && callback(userObj.username);				

		});


	}


	function getUseraddress (index, groupObj, callback) {
		var useraddr;
		
		db.getObjectField('user:' + groupObj.members[index] + ':settings','nodebb-plugin-reddcoin:address', function(err, addressObj){
			if (err) {
				callback(err);
			}
			console.log('--In addr call back');

			if (addressObj){
				
				useraddr = addressObj;
				//console.log('Custom Route User settings:Address: ' + useraddr);

			}else{
				
				useraddr = 'empty';
				//console.log('Custom Route User settings:Address: ' + useraddr);

			}
			callback && callback(useraddr);
		});


		
	}

	function gettest () {
		console.log('4. Global Object = ' + JSON.stringify(g_dataObj,null,4));

		console.log('5. Output Global Object Function');
		res.json(g_dataObj);
		console.log('6. Output Global Object Returned');
	}

//setJSON();


//res.render('history', g_dataObj);

/*
var groupData;
var userData;
var item = {}, objAddresses = [];
var userName;
var userAddress;





	for(var x in groupObj.members) {
		console.log('Custom History Route members: ' + groupObj.members[x]);


		db.getObject('user:' + groupObj.members[x], function(err, userObj) {
			if (err) {
				callback(err);
			}

				console.log('Custom Route User :' + userObj.username);

				userName = userObj.username;

		});

		db.getObjectField('user:' + groupObj.members[x] + ':settings','nodebb-plugin-reddcoin:address', function(err, addressObj){
			if (err) {
				callback(err);
			}

			if (addressObj){
				console.log('Custom Route User settings:Address: ' + addressObj);

			}else{
				console.log('Custom Route User settings:Address: Empty');

			}

			userAddress = addressObj;

		console.log('OS Custom Route User address ' + userAddress);
		console.log('OS Custom Route User name ' + userName);

		item = {
			"name": userName,
			"address": userAddress
		}

		objAddresses.push({users: item});
		console.log('Custom Route User objAddress:' + objAddresses);
res.json({users: objAddresses});

		});


});
			
*/		
		

/*		var item = {
			"name": userName,
			"address": userAddress
		}

		console.log('Custom Route User item:' + item);
		objAddresses.address.push(item);
		console.log('Custom Route User objAddress:' + objAddresses);




	};
	

				
/*res.json({ membercount: userObj
				});*/





		

/*	var historyData;

groups

	historyData = function(){

		//db.getObjectFields('user:' + uid, ['password', 'banned'], next);

		db.getObjectsFields('user:' + uid, ['password', 'banned'], data);
			
			var userData = {
			search_display: 'hidden',
			loadmore_display: results.count > 50 ? 'block' : 'hide',
			users: results.users,
			anonymousUserCount: anonymousUserCount,
			show_anon: anonymousUserCount ? '' : 'hide'
		};

		return data;

	});*/

	 	

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

//	app.get('/demo', middleware.buildHeader, renderSink);
//	app.get('/api/demo', renderSink);
	app.get('/api/crypto',renderCrypto);
	app.get('/user/:userslug/history', middleware.buildHeader, renderHistory);
	app.get('/api/user/:userslug/history', renderHistory);
};
