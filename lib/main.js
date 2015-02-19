

(function() {

"use strict";
define('notifications',['jquery'], factory);
//Start Up
console.log('Load Client Scripts!');



// Montior a Reddcoin Address for Transactions
 
var walletAddress = $.get(RELATIVE_PATH + '/api/crypto', {}, function(addressData) {
    
    //Check if we have our own address, proceed if ok    
    if(addressData.address){
    	//Checking value
    	//console.log("We have :- " + addressData.address);

    	var socket = io("http://live.reddcoin.com:80/");

		socket.emit('subscribe', addressData.address);


		//use a test transaction
		/*
		$.get("http://live.reddcoin.com:80/api/tx/fda84b925eaaf5a8bd98f34b382ec457e71170753cbad829699bc4d997533084", function(transDetails,exp) {
				

			//traverse each vout
			var vOut = 0;

			for (var i in transDetails.vout){

				for (var v in transDetails.vout[i].scriptPubKey){
					if (transDetails.vout[i].scriptPubKey[v] ==  addressData.address){
						console.log('Address ' + transDetails.vout[i].scriptPubKey[v] + 'is in item:' + i);
						vOut = i;
					}
				}
			}


		});
		*/

		socket.on(addressData.address, function(data) {
			//Checking Value
			//console.log('TXid = ' + data);

			// Get a txacation from reddcoin
			$.get("http://live.reddcoin.com:80/api/tx/" + data, function(transDetails,exp) {

				//traverse each vout to get the correct value for receiving address
				var vOut = 0;

				for (var i in transDetails.vout){

					for (var v in transDetails.vout[i].scriptPubKey){
						if (transDetails.vout[i].scriptPubKey[v] ==  addressData.address){
							//Checking Value
							//console.log('Address ' + transDetails.vout[i].scriptPubKey[v] + 'is in item:' + i);
							vOut = i;
						}
					}
				}
				//checking value
				//console.log('vout[' + vOut + '].value = ' + transDetails.vout[vOut].value);
				//console.log('vin[0].addr = ' + transDetails.vin[0].addr);

				//Message display
				app.alert({
					title: 'Tip Recieved',
					message: 'You received a tip of ' + transDetails.vout[vOut].value + ' RDD from : ' + transDetails.vin[0].addr, //search for user name from address
					location: 'right-top',
				/*	timeout: 15000, */
					type: 'success'
				});
				
				console.log ('Loading notifications')

				require(['../../../src/notifications.js'], function (notifications){
					console.log('Notifications Loaded.. phew');
					console.log('Value: ' + transDetails.vout[vOut].value + '\nFrom Address: ' + transDetails.vin[0].addr + '\nTo Address: ' + addressData.address + '\nTX: ' + data + '\n:uid:' + addressData.uid);
						new notifications;
						notifications.create({
							bodyShort: 'You received a tip of ' + transDetails.vout[vOut].value + ' RDD from : ' + transDetails.vin[0].addr,
							nid: 'addrid:' + addressData.address + 'txid:' + data + ':uid:' + addressData.uid,
							importance: 6
							}, function(err, notification) {
							if (err || !notification) {
								return;
								}
							console.log('Push Notification');
							notifications.push(notification, addressData.uid);

						});


				});				
				
			});
		});



    } else {
    		//Checking Value
    		//No Address, do nothing
    	    //console.log("No Address Data");
    }
});


}());