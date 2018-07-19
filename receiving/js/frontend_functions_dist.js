function dist_list(myRequisitions) {

	console.log(myRequisitions);

	//get the rqListTable
	var tbl = document.getElementById("distTable");

	//the data field names are specified in a hidden caption of
	//the rqListTable. Here we load them into 'col' variable.
	var col = tbl.caption.innerText.trim().split(",");

	// ADD JSON DATA TO THE TABLE AS ROWS.
	for (var i = 0; i < myRequisitions.length; i++) {

		id = myRequisitions[i]["requisitionId"]; 

		items_length = (myRequisitions[i]["items"]).length;

		for (var j = 0; j < items_length; j++) {

			//check if there is a row. if not, add it.

			if ( i > 0) {
			var cln = tbl.rows[1].cloneNode(true);
			tbl.appendChild(cln); };
		
			var tr = tbl.rows[tbl.rows.length-1];

			tr.cells[0].innerHTML = myRequisitions[i][col[0]];
			tr.cells[1].innerHTML = j+1;
			tr.cells[2].innerHTML = myRequisitions[i]["items"][j]["requisitionItemId"];
			tr.cells[3].innerHTML = myRequisitions[i]["items"][j]["description"];
			tr.cells[4].innerHTML = myRequisitions[i]["items"][j]["quantity"];
			tr.cells[5].value = myRequisitions[i]["requisitionId"];

		}

	}

}


function addRowHandlers() {
	var clicks = 0;
    var table = document.getElementById("distTable");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = 
            function(row) 
            {
                return function() { 

                	clicks +=1

                    var rqItemId = row.getElementsByTagName("td")[2].innerHTML;
     				var desc =     row.getElementsByTagName("td")[3].innerHTML;
     				var quan =     row.getElementsByTagName("td")[4].innerHTML;
                    var rqId =     row.getElementsByTagName("td")[5].value;                    

					var tbl = document.getElementById("distTable2");

					if (clicks > 1) {
						var cln = tbl.rows[1].cloneNode(true);
						tbl.appendChild(cln); 
					};

					tbl.rows[tbl.rows.length - 1].cells[1].innerHTML = rqItemId;
					tbl.rows[tbl.rows.length - 1].cells[2].innerHTML = desc;
					var quan_td = tbl.rows[tbl.rows.length - 1].cells[3];
					quan_td.getElementsByTagName("input")[0].value = quan;

                };
            };

        currentRow.onclick = createClickHandler(currentRow);
    }
}

function deleteRow(tableId) {
	var tbl = document.getElementById(tableId);
	var lastRow = tbl.rows.length - 1;
	// inputs = tbl.rows[lastRow].getElementsByTagName("input");
	// var noContent = true;
	// for(j=0, l=inputs.length; j<l; j++) {
	// 	if(inputs[j].value.length > 0) { noContent = false; break; }
	// }
	// if(noContent) {
	// 	tbl.deleteRow(lastRow);
	// }
	if (tbl.rows.length > 2) {
		tbl.deleteRow(lastRow);
	}
}

// function dist_form_validate() {

// 	var valid = true;

// 	//rq data
// 	var inputs = document.getElementById("").getElementsByTagName("input");
// 	for(i = 0, l=inputs.length; i<l; i++) {
// 		var name = inputs[i].name; var value = inputs[i].value;
// 		if(value == "") {
// 			if(name == "initiatingOffice") { valid = false; break; }
// 			if(name == "preparedDate") { valid = false; break; }
// 			if(name == "vendorId") { valid = false; break; }
// 			if(name == "justification") { valid = false; break; }
// 		}
// 	}
	
// 	return valid;
// }

function save() {

}


function main(prm) {

  json = backend_simulator_dist(); //in production, this will be replaced by an AJAX call

  obj = JSON.parse(json);
  type = Object.keys(obj)[0]; 

  dist_list(obj[type]); 
}


window.onload = function() { main(); addRowHandlers(); }