
function backend_simulator() {
	var rqs = [
			{"requisitionId":1,"requisitionNo":"2017-04","requisitionDate":"2017-10-06","vendorId":1,"justification":"Requesting Open Purchase order for school bus engine and mechanical services for MOE School Buses that needs extensive monthly upkeep to prolong their services to the Ministry. Vendor is selected based on their experience with servicing MOE buses. This request will cover costs and expenses for this first (1st) quarter fiscal year 2018.","itemDescription":"Open PO for School Bus Engine & Mechanical Services","numItems":1,"rqCost":5000.00},
			{"requisitionId":5,"requisitionNo":"2018-13","requisitionDate":"2017-10-11","vendorId":5,"justification":"Requesting items to be used at George B. Harris Elementary School.","itemDescription":"Trimmer Head","numItems":3,"rqCost":.00},
			{"requisitionId":20,"requisitionNo":"2018-19","requisitionDate":"2017-11-02","vendorId":13,"justification":"Requesting to purchase items needed to repair and service DUPLO Printer, DP-J450\/RP#3992.","itemDescription":"Feed Clutch","numItems":5,"rqCost":1718.00}
		];
	var items = [
			[
				{"requisitionsItemId":1,"requisitionId":1,"itemDescription":"Open PO for School Bus Engine & Mechanical Services","quantity":1,"unit":"Lot","price":5000,"fiscalYear":null,"extended":5000,"org":"1322","costCenter":"EB0E03","subAccount":"1221","task":"OPR","opt":null,"requisitionNo":"2017-04","sequenceNo":1}
			],
			[
				{"requisitionsItemId":59,"requisitionId":5,"itemDescription":"Trimmer Head","quantity":4,"unit":"Each","price":"26.25","fiscalYear":null,"extended":105,"org":"1322","costCenter":"EBOE03","subAccount":"1420","task":"OPR","opt":null,"requisitionNo":null,"sequenceNo":null},
				{"requisitionsItemId":60,"requisitionId":5,"itemDescription":"Mop Head","quantity":10,"unit":"Each","price":"8.85","fiscalYear":null,"extended":88.5,"org":"1322","costCenter":"EBOE03","subAccount":"1420","task":"OPR","opt":null,"requisitionNo":null,"sequenceNo":null},
				{"requisitionsItemId":61,"requisitionId":5,"itemDescription":"Mop Handle","quantity":10,"unit":"Each","price":"14.75","fiscalYear":null,"extended":147.5,"org":"1322","costCenter":"EBOE03","subAccount":"1420","task":"OPR","opt":null,"requisitionNo":null,"sequenceNo":null}
			],
			[
				{"requisitionsItemId":24,"requisitionId":20,"itemDescription":"Feed Clutch","quantity":1,"unit":"Each","price":375,"fiscalYear":null,"extended":375,"org":"1322","costCenter":"OPR","subAccount":"1420","task":"EBOEO3","opt":null,"requisitionNo":"2018-19","sequenceNo":1},
				{"requisitionsItemId":25,"requisitionId":20,"itemDescription":"Belt Primary Drive","quantity":1,"unit":"Each","price":241.6,"fiscalYear":null,"extended":241.6,"org":"1322","costCenter":"OPR","subAccount":"1420","task":"EBOE03","opt":null,"requisitionNo":"2018-19","sequenceNo":2},
				{"requisitionsItemId":26,"requisitionId":20,"itemDescription":"Separator Base Unit","quantity":2,"unit":"Each","price":64.8,"fiscalYear":null,"extended":129.6,"org":"1322","costCenter":"OPR","subAccount":"1420","task":"EBOE03","opt":null,"requisitionNo":"2018-19","sequenceNo":3},
				{"requisitionsItemId":27,"requisitionId":20,"itemDescription":"Paper Feed Roller","quantity":6,"unit":"Each","price":152.8,"fiscalYear":null,"extended":916.8,"org":"1322","costCenter":"OPR","subAccount":"1420","task":"EBOE03","opt":null,"requisitionNo":"2018-19","sequenceNo":4},
				{"requisitionsItemId":28,"requisitionId":20,"itemDescription":"Service Labor","quantity":1,"unit":"Lot","price":55,"fiscalYear":null,"extended":55,"org":"1322","costCenter":"OPR","subAccount":"1420","task":"EBOE03","opt":null,"requisitionNo":"2018-19","sequenceNo":5}
			]
		];
	/*
	####################
	## Code to return a JSON based on query_string.
	##   if requisitionId=<integer>, then returns the requisition with that requisitionId.
	##         The returned data includes the rq info and the list of items belonging to that rq.
	##   if requisitionId is not specified, returns a dump of the rqs.
	#################### */

	//check the query string
	var rqId = null; var index = null;

	var qGET = new URLSearchParams(location.search);
	if(qGET.has("requisitionId")) {
		for(i=0, l=rqs.length; i<l; i++) {
			if(rqs[i]["requisitionId"] == qGET.get("requisitionId")) {
				rqId = qGET.get("requisitionId");
				index = i;
				break;
			}
		}
	}

	if(rqId) {
		var tmp = Object.assign({}, rqs[index], { "items": items[index] });
		var ret = Object.assign({}, {"rq": tmp});
		return JSON.stringify(ret);
	} else {
		var ret = Object.assign({}, {"rqlist": rqs});
		return JSON.stringify(ret);
	}
}

function load_data() {
	json = backend_simulator();
	console.log(json); //for testing. remove.
	
	obj = JSON.parse(json);
	
	//check if the received obj is for a list or a specific rq
	//then run the appropriate code
	//note that by design we are checking the received data to 
	//determine whether to display the list or the form, instead 
	//of looking at the query string.
	type = Object.keys(obj)[0]; 
	console.log(type); //for testing. remove.
	if(type == "rqlist") {
		//type is list
		var myRequisitions = obj[type];
		document.getElementById("rqlist").style.display = "block";
		document.getElementById("rq").style.display = "none";


		var col = [];
        for (var i = 0; i < myRequisitions.length; i++) {
            for (var key in myRequisitions[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        var table = document.createElement("table");

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        for (var i = 0; i < myRequisitions.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myRequisitions[i][col[j]];
            }

            var x = tr.insertCell(-1);
            var a = document.createElement('a');
            a.setAttribute('href',"requisition.html?requisitionId="+myRequisitions[i][col[0]]);
            a.innerHTML = "edit";
            x.appendChild(a);
            table.setAttribute('id', 'big-table');
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("rqlist");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);


	} else {
		//assume type is 'rq'. Probably we should check instead of just assuming.
		var myRequisition = obj[type];
		document.getElementById("rqlist").style.display = "none";
		document.getElementById("rq").style.display = "block";

	      var reqID = myRequisition.requisitionId; 
	      document.getElementById("reqid").value = reqID;

	      var venID = myRequisition.vendorId;
	      document.getElementById("venid").value = venID;

	      var justi = myRequisition.justification;
	      document.getElementById("justi").value = justi;

	      var appdate = myRequisition.moeApprovedDate;
	      document.getElementById("appdate").value = appdate;

	      var itemlen = myRequisition.items.length;
	      for (j = 0; j < itemlen-1; j++) {
	        var html = $('#tbl tr:last').html();
	        $('#tbl tr:last').after("<tr>" + html + "</tr>");
	      }

	      for (i = 1; i < itemlen+1; i++) {
	        var itemid = myRequisition.items[i-1].requistionItemId;
	        document.getElementById("tbl").rows[i].cells[0].children[0].value = itemid;

	        var desc = myRequisition.items[i-1].itemDescription;
	        document.getElementById("tbl").rows[i].cells[1].children[0].value = desc;

	        var quant = myRequisition.items[i-1].quant;
	        document.getElementById("tbl").rows[i].cells[2].children[0].value = quant;

	        var unit = myRequisition.items[i-1].unit;
	        document.getElementById("tbl").rows[i].cells[3].children[0].value = unit;

	        var price = myRequisition.items[i-1].price;
	        document.getElementById("tbl").rows[i].cells[4].children[0].value = price;
	      }
		console.log(myRequisition); //for testing. remove.
	}
}

/* runs this on page load */
window.onload = function() {
	load_data();
}

function copyRow() {
  var html = $('#tbl tr:last').html();
  $('#tbl tr:last').after("<tr>" + html + "</tr>");
}
