"use strict";

var 	db = require('./nodebb').db,
		nconf = require('nconf');

module.exports = function(Plugin) {
	
	// filter:user.customSettings
	Plugin.addUserSettings = function(settings, callback) {
		// todo: use settings.tpl instead
		//updated since v0.8.3 to use custom settings
		//test if address already stored DB
        db.getObjectField('user:' + settings.uid + ':settings', 'nodebb-plugin-reddcoin:address', function(err, address) {
			if (err) {
				callback(err);
			}

			//If we have address, add to the input field
			if(address){
				console.log(' addUserSettings:', address);
				settings.customSettings.push({
			                                title: "Reddcoin Tip Settings",
			                                content: "<label>Reddcoin Address</label><input type='text' data-property='userAddress' placeholder='e.g RnrvzUnhxxbaYwqivWcis7fJeCLhkZCyQ7' class='form-control' value='"+ address +"'/>"
		                                });				
			//No address, so leave input empty
		    }else{
				//No address so display empty field
				console.log(' addUserSettings: No Address');
				settings.customSettings.push({
			                                title: "Reddcoin Tip Settings",
			                                content: "<label>Reddcoin Address</label><input type='text' data-property='userAddress' placeholder='e.g RnrvzUnhxxbaYwqivWcis7fJeCLhkZCyQ7' class='form-control' />"
		                                });
			}
		});

		callback(null, settings);
	};

	// filter:user.getSettings
	Plugin.getUserSettings = function(data, callback) {
			// Temp console to check results			
			//console.log(' Get Settings', data);
			//Get setting from DB
			db.getObjectField('user:' + data.uid + ':settings', 'nodebb-plugin-reddcoin:address', function(err, address) {
			if (err) {
				callback(err);
			}
			//Write data to the address field
			//This seem broken since v0.8.3 - something to do with customSettings, so do it hte hard way in addUserSettings
			data.settings.userAddress = address;
			callback(null, data);
		});	
	};
	
	// action:user.saveSettings
	Plugin.saveUserSettings = function(data) {
		console.log(' Save Settings');

		if (data.uid) {
			// Temp console to check results			
			console.log(' UID to Save', data.uid);			
			

			if (data.settings.userAddress) {
			console.log(' Address to Save', data.settings.userAddress);
			db.setObjectField('user:' + data.uid + ':settings', 'nodebb-plugin-reddcoin:address', data.settings.userAddress);
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
