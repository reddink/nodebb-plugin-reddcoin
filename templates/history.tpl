<div>
<h1>History of Reddcoin Tips</h1>

<span><p>Accounts are working.</p></span>
<span><p>Currently a work in progress.</p></span>
<span><p>Pull data from various streams to populate.</p></span>

<hr />

<h2>Address Details</h2>
<div id="addrAddrdetails">
	</div>
<h2>Transaction Details</h2>
<div id="addrTransdetails">
	</div>
<div>
	<script src="//live.reddcoin.com:80/socket.io/socket.io.js"></script>

<script> 
var walletAddress = $.get(RELATIVE_PATH + '/api/crypto', {}, function(addressData) {

    if(addressData. address){
    	console.log("We have :- " + addressData.address);

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

//		socket.on('tx', function(data) {
//			console.log("SocketOn: " + data);
			
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
//		});



    } else {
    	    console.log("No Address Data");

    }


});

</script>
</div>


