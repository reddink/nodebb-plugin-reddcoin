"use strict";

var 	db = require('./nodebb').db,
		nconf = require('nconf');

module.exports = function(Plugin) {
	
	// filter:user.settings
	Plugin.addUserSettings = function(settings, callback) {
		// todo: use settings.tpl instead
		settings.push({
			title: "Reddcoin Tip Settings",
			content: "<label>Reddcoin Address</label><input type='text' data-property='address' placeholder='e.g RnrvzUnhxxbaYwqivWcis7fJeCLhkZCyQ7' class='form-control' />"
		});

		callback(null, settings);
	};

	// filter:user.getSettings
	Plugin.getUserSettings = function(data, callback) {
			// Temp console to check results			
			//console.log(' Gett Settings', data);
			db.getObjectField('user:' + data.uid + ':settings', 'nodebb-plugin-reddcoin:address', function(err, title) {
			if (err) {
				callback(err);
			}
	
			data.settings.address = title;
			callback(null, data);
		});	
	};
	
	// action:user.saveSettings
	Plugin.saveUserSettings = function(data) {
		console.log(' Save Settings');

		if (data.uid) {
			// Temp console to check results			
			//console.log(' Somethign to Save', data.uid);			
			

			if (data.settings.address) {
			console.log(' Somethign to Save', data.settings.address);
			db.setObjectField('user:' + data.uid + ':settings', 'nodebb-plugin-reddcoin:address', data.settings.address);
			}else{
			// else field empty
			// Temp console to check results			
			//console.log(' Somethign to Save empty', data.settings.address);
			db.setObjectField('user:' + data.uid + ':settings', 'nodebb-plugin-reddcoin:address', '');
		
			}

		}

	};
	
	// filter:post.posts.custom_profile_info
	Plugin.addProfileInfo = function(profileInfo, callback) {
		// get user tipping address
		db.getObjectField('user:' + profileInfo.uid + ':settings', 'nodebb-plugin-reddcoin:address', function(err, address){
		// get user name
		db.getObjectField('user:' + profileInfo.uid, 'username', function(err, username){
		// console log result
		console.log('Setting Profile User Settings', username);
		// console log result
			if (address){
				// console log result
				console.log('Setting Profile User has address', username);
					profileInfo.profile.push({content: "<span class='tipping-field' title='Tip " + username + " with Reddcoin'><strong><a href='reddcoin:" + address + "?label=Tip%20To%20" + username + "'><img class='tipping-icon' src='" + nconf.get('relative_path') + "/plugins/nodebb-plugin-reddcoin/images/rdd_icon.png'><span class='hidden-xs-inline'> Tip " + username + "</span></a></strong></span>"});
				} else {
				// console log result
				console.log('Setting Profile User does not have address', username);
					profileInfo.profile.push({content: "<span class='tipping-field' title='" + username + " does not have a tip address'><strong><span class='hidden-xs-inline'><img class='tipping-icon' src='" + nconf.get('relative_path') + "/plugins/nodebb-plugin-reddcoin/images/rdd_icon.png'> Tip " + username + "</span></strong></span>"});		
				}
				
			});
		
		callback(err, profileInfo);

		});

	};
		

};
