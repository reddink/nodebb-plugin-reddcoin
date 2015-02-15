<div>
<h1>History of Reddcoin Tips</h1>

<span><p>Accounts are working.</p></span>
<span><p>Currently a work in progress.</p></span>
<span><p>Pull data from various streams to populate.</p></span>
<span><p>Tablify.</p></span>
<hr />

A list of who has sent you tips
<ul>
	<!-- BEGIN test -->
	<li>
		{test.name}   {test.amount} RRD
	</li>
	<!-- END test -->
</ul>
</div>
<div>
	<script src="//live.reddcoin.com:80/socket.io/socket.io.js"></script>

<script> 
var walletAddress = $.get(RELATIVE_PATH + '/api/crypto', {}, function(addressData) {
    console.log(addressData.address);

    if(addressData. address){
    	console.log("We have :- " + addressData.address);

    	var socket = io("http://live.reddcoin.com:80/");

		socket.emit('subscribe', addressData.address);



		$.get("http://live.reddcoin.com:80/api/tx/fda84b925eaaf5a8bd98f34b382ec457e71170753cbad829699bc4d997533084", function(transDetails,exp) {
				
			$.each(transDetails, function(key, value){
				console.log("key = " + key + " :: value = " + value);

					if(key == "vin"){
						$.each(transDetails.vin[0],function(k1, v1){
							console.log("   vin_key1 = " + k1 + " :: value1 = " + v1);
						});

					}	

					if(key == "vout"){
						$.each(transDetails.vout[0],function(k1, v1){


							console.log("   vout0_key1 = " + k1 + " :: value1 = " + v1);
						});

						$.each(transDetails.vout[1],function(k1, v1){


							console.log("   vout1_key1 = " + k1 + " :: value1 = " + v1);
						});				
					}
			});
		});


		socket.on(addressData.address, function(data) {

			console.log(data);

			$.get("http://live.reddcoin.com:80/api/tx/" + data, function(transDetails,exp) {
				app.alert({
					title: 'Tip Recieved',
					message: ' You received a tip of ' + transDetails.vout[1].value + ' RDD from : ' + transDetails.vin[0].addr, //search for user name from address
					location: 'right-top',
					timeout: 5000,
					type: 'success'
				});
			});
		});



    } else {
    	    console.log("No Address Data");

    }


});

</script>
</div>


