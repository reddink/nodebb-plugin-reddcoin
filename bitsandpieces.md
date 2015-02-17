			//Traverse JSON
			//called with every property and it's value
			function process(key,value) {
			    console.log(key + " : "+value);
			}

			//test for address
			function getAddress(key,value) {
				console.log('get address: ' + key + " : "+value);
			}

			function traverse(data,func) {
				for (var i in data) {
			        func.apply(this,[i,data[i]]);  
			        if (data[i] !== null && typeof(data[i])=="object") {
			            //going on step down in the object tree!!
			            traverse(data[i],func);
			        }
			    }
			
			}

			// count elements in JSON
			function count(obj) {
			   var count=0;
			   for(var prop in obj) {
			      if (obj.hasOwnProperty(prop)) {
			         ++count;
			      }
			   }
			   return count;
			}

			// print some elements of JSON
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
