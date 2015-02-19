
<div class='col-md-12 reddcoin-history'>
	<div class='well'>
		<h1>Reddcoin Tip History</h1>
		<h2>Address Details</h2>
			<div id="addrAddrdetails"></div>
	</div>

	<div class='well'>
		<h2>Transaction Details</h2>
		<p> WIP. Extract tx details into meaningful details</p>
			<div id="addrTransdetails"></div>
	</div>
<div>
	

<script> 
var walletAddress = $.get(RELATIVE_PATH + '/api/crypto', {}, function(addressData) {

    if(addressData. address){
    	console.log("History. We have Addr:- " + addressData.address);

    	var socket = io("http://live.reddcoin.com:80/");

		socket.emit('subscribe', addressData.address);


/*
		$.get("http://live.reddcoin.com:80/api/addr/RhrVWQR21SECQCL2Q3rSzbjuJ8KqfA543u", function(addrDetails,exp) {
				
			//Traverse JSON
			//called with every property and it's value
			//test for address
			function getAddressdetails(key,value) {
				console.log('get address details: ' + key + " : "+value);
				if (key == "transactions"){
					return;
				}else{
					return "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
				}

			}

			//test for transactions
			function getTransdetails(key,value) {
				console.log('get transaction details: ' + key + " : "+value);
				return "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
			}

			function traverseDetails(data,func,table) {
				var out = "<table>";
				for (var i in data) {
			        out += func.apply(this,[i,data[i]]);  
			        
			        if (data[i] !== null && typeof(data[i])=="object") {
			            // notgoing on step down in the object tree!!
			            //traverse(data[i],func);
			        }
			        
			    }
				out += "</table>"
				document.getElementById(table).innerHTML = out;			    
			
			}



			traverseDetails(addrDetails, getAddressdetails,"addrAddrdetails");
			traverseDetails(addrDetails.transactions, getTransdetails,"addrTransdetails");


		});
*/

/*		socket.on('tx', function(data) {
			console.log("SocketOn: " + data);
*/			
			$.get("http://live.reddcoin.com:80/api/addr/" + addressData.address, function(addrDetails,exp) {
				
				//Traverse JSON
				//called with every property and it's value
				//test for address
				function getAddressdetails(key,value) {
					console.log('get address details: ' + key + " : "+value);
					if (key == "transactions"){
						return;
					}else{
						return "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
					}

				}

				//test for transactions
				function getTransdetails(key,value) {
					console.log('get transaction details: ' + key + " : "+value);
					return "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
				}

				function traverseDetails(data,func,table) {
					var out;
					out = "<table>";
					for (var i in data) {
				        out += func.apply(this,[i,data[i]]);  
				        
				        if (data[i] !== null && typeof(data[i])=="object") {
				            // notgoing on step down in the object tree!!
				            //traverse(data[i],func);
				        }
				        
				    }
					out += "</table>"
					document.getElementById(table).innerHTML = out;			    
				
				}

				function transactionDetails(data, func, table){
					var out;
					out = "<table>";
					out += "<tr><td>Count</td><td>Transaction</td></tr>";
					for (var i in data) {
				        out += func.apply(this,[i,data[i]]);  
				        
				        if (data[i] !== null && typeof(data[i])=="object") {
				            // notgoing on step down in the object tree!!
				            //traverse(data[i],func);
				        }
				        
				    }
					out += "</table>"
					document.getElementById(table).innerHTML = out;

				}

				function addressDetails(data,table){
					var out;
					out = "<table>";
					out += "<tr><td>Address</td><td>" + data.addrStr + "</td></tr>";
					out += "<tr><td>Balance</td><td>" + data.balance + "</td></tr>";
					out += "<tr><td>Total Received</td><td>" + data.totalReceived + "</td></tr>";
					out += "<tr><td>Total Sent</td><td>" + data.totalSent + "</td></tr>";
					out += "</table>";
					document.getElementById(table).innerHTML = out;
				}
				

				addressDetails(addrDetails, "addrAddrdetails");
				transactionDetails(addrDetails.transactions, getTransdetails, "addrTransdetails");
				//traverseDetails(addrDetails, getAddressdetails,"addrAddrdetails");
				//traverseDetails(addrDetails.transactions, getTransdetails,"addrTransdetails");


			});			
//		});



    } else {
    	    console.log("No Address Data");

    }


});

</script>
</div>


