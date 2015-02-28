

(function() {

"use strict";

//Start Up
console.log('Loading Client Scripts!');



// Montior a Reddcoin Address for Transactions
 
var walletAddress = $.get(RELATIVE_PATH + '/api/crypto', {}, function(addressData) {
    
    //Check if we have our own address, proceed if ok    
    if(addressData.address){
    	//Checking value
    	//console.log("We have :- " + addressData.address);

    	var socket = io("http://live.reddcoin.com:80/");

		socket.emit('subscribe', addressData.address);


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

				//Message display
				app.alert({
					title: 'Tip Recieved',
					message: 'You received a tip of ' + transDetails.vout[vOut].value + ' RDD from : ' + transDetails.vin[0].addr, //search for user name from address
					location: 'right-top',
				/*	timeout: 15000, */
					type: 'success'
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