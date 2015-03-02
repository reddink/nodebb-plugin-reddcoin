
<div class='col-md-12 reddcoin-history'>
	<div class='well'>
		<h1>Reddcoin Tip History</h1>
		<h2>Address Details</h2>
			<div id="addrAddrdetails"></div>
	</div>

	<div class='well'>
		<h2>Transaction Details</h2>

			<div id="addrTransdetails"></div>
	</div>
<div>
<div class='col-md-12 credits'>
	<div class='well'>
		<p class="credit">Credits</p>
		<p class="credit">Original Tipping Plugin created by <a href='https://github.com/reddink/nodebb-plugin-reddcoin'>ReddInk</a></p>
		<p class="credit">RDD: <a href='reddcoin:RnygCADxGF45Rd171ujeB3SRhc6YMhJzpJ'>RnygCADxGF45Rd171ujeB3SRhc6YMhJzpJ</a> BTC: <a href='bitcoin:16WX3Y92Eh5BDDZ7YdbdPw5wYvV5KGQE94'>16WX3Y92Eh5BDDZ7YdbdPw5wYvV5KGQE94</a></p>
	</div>
</div>	

<script> 
var walletAddress = $.get(RELATIVE_PATH + '/api/crypto', {}, function(addressData) {

    if(addressData.address){
    	console.log("History. We have Addr:- " + addressData.address);

			
			var transActions = $.get("http://live.reddcoin.com:80/api/addr/" + addressData.address, function(addrDetails,exp) {
				


				function addressDetails(data, table){
					var outAddr;
					outAddr = "<table>";
					outAddr += "<tr><td>Address</td><td>" + data.addrStr + "</td></tr>";
					outAddr += "<tr><td>Balance</td><td>" + data.balance + "</td></tr>";
					outAddr += "<tr><td>Total Received</td><td>" + data.totalReceived + "</td></tr>";
					outAddr += "<tr><td>Total Sent</td><td>" + data.totalSent + "</td></tr>";
					outAddr += "</table>";
					document.getElementById(table).innerHTML = outAddr;
				}


				function transactionDetails(data, table){
					var outTx;

					var node = document.getElementById(table);
					var tbl = document.createElement('table');
					tbl.border='1';
					tbl.id = 'mytxdata';

					var header = tbl.createTHead();


					

					//var row = document.createElement('tr');
					//tBody.appendChild(row);
					var row = header.insertRow();

					var cell1= row.insertCell(0);
					cell1.className = 'tip_hcell';
					var cell2= row.insertCell(1);
					cell2.className = 'tip_hcell';
					// Need to work on
					//var cell3= row.insertCell(2);
					//cell3.className = 'tip_hcell';
					var cell3= row.insertCell(2);
					cell3.className = 'tip_hcell';

					cell1.innerHTML = "  ";
					cell2.innerHTML = "Value";
					//cell3.innerHTML = "From (if known)";
					cell3.innerHTML = "Date";
					
					var tBody = document.createElement('tbody');
					tbl.appendChild(tBody);

					node.appendChild(tbl);


					for (var i in data) {
				        getTransdetails.apply(this,[i,data[i]]);  
				        
				        if (data[i] !== null && typeof(data[i])=="object") {
				            // notgoing on step down in the object tree!!
				            //traverse(data[i],func);
				        }
				        
				    }


					//test for transactions.
					function getTransdetails(key,value) {
						//console.log('get transaction details: ' + key + " : " + value);
						var transDetails;
						
						$.get("http://live.reddcoin.com:80/api/tx/" + value, function(txDetails,exp){
							
							//console.log('txDetails = ' + txDetails.time);
						
							//traverse each vout to get the correct value for receiving address
							var vOut = 0;
							for (var i in txDetails.vout){

								for (var v in txDetails.vout[i].scriptPubKey){
									if (txDetails.vout[i].scriptPubKey[v] ==  addressData.address){
										vOut = i;
									}
								}
							}
							//Output row/cells

							var txDate = txDetails.time * 1000;
							date = new Date(txDate);
							
							var table = document.getElementById("mytxdata");
							var body = table.tBodies[0];
							var row = body.insertRow(-1);
							row.insertCell(0).innerHTML = key;
								row.cells[0].className = "tip_cell ";
							row.insertCell(1).innerHTML = txDetails.vout[vOut].value + " RDD";
								row.cells[1].className = "tip_cell";
							//row.insertCell(2).innerHTML = '';
							//	row.cells[2].className = "tip_cell";
							row.insertCell(2).innerHTML = "<a href='http://live.reddcoin.com/tx/" + txDetails.txid + "'>" + date + "</a>";
								row.cells[2].className = "tip_cell";
							
				    		sortTable("mytxdata");
								
						});
					}
				}
				

				addressDetails(addrDetails, "addrAddrdetails");
				transactionDetails(addrDetails.transactions, "addrTransdetails");

			});		



    } else {
    	    console.log("No Address Data");

    }


});

function sortTable(tableId){
				    var tbl = document.getElementById(tableId).tBodies[0];
				    var store = [];
				    for(var i=0, len=tbl.rows.length; i<len; i++){
				        var row = tbl.rows[i];
				        var sortnr = parseFloat(row.cells[0].textContent || row.cells[0].innerText);
				        if(!isNaN(sortnr)) store.push([sortnr, row]);
				    }
				    store.sort(function(x,y){
				        return x[0] - y[0];
				    });
				    for(var i=0, len=store.length; i<len; i++){
				        tbl.appendChild(store[i][1]);
				    }
				    store = null;
					}
</script>
</div>


