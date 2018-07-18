function dist_list(myRequisitions) {

	//get the rqListTable
	var tbl = document.getElementById("distTable");

	//the data field names are specified in a hidden caption of
	//the rqListTable. Here we load them into 'col' variable.
	var col = tbl.caption.innerText.trim().split(",");

	// ADD JSON DATA TO THE TABLE AS ROWS.
	for (var i = 0; i < myRequisitions.length; i++) {

		id = myRequisitions[i]["requisitionId"];

		console.log(id);
		json = backend_simulator_2(id);
		obj = JSON.parse(json);
		type = Object.keys(obj)[0]; 

		myRequisition = obj[type];

		items_length = myRequisition["items"].length;

		for (var j = 0; j < items_length; j++) {

			//check if there is a row. if not, add it.
			if(tbl.rows[i + j + 1] === undefined) {
				var cln = tbl.rows[i].cloneNode(true);
				tbl.appendChild(cln);
			}

			var tr = tbl.rows[i + j + 1];

			tr.cells[0].innerHTML = myRequisitions[i][col[0]];
			tr.cells[1].innerHTML = myRequisition["items"][j]["requisitionItemId"]
			tr.cells[2].innerHTML = myRequisition["items"][j]["description"]
			tr.cells[3].innerHTML = myRequisition["items"][j]["quantity"]

		}

	}

}


function main(prm) {

  json = backend_simulator_2(); //in production, this will be replaced by an AJAX call

  obj = JSON.parse(json);
  type = Object.keys(obj)[0]; 

  dist_list(obj[type]); 
    
}

function addRowHandlers() {
    var table = document.getElementById("distTable");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = 
            function(row) 
            {
                return function() { 
                    var cell = row.getElementsByTagName("td")[0];
                    var poNo = cell.innerHTML;
                    alert(poNo);
                    // addRq(poNo);
                                 };
            };

        currentRow.onclick = createClickHandler(currentRow);
    }
}

function addRq(poNo) {
	var tbl = document.getElementById("distTable2");
	var cln = tbl.rows[i].cloneNode(true);
	tbl.appendChild(cln);

}

function start() {
	main();
	addRowHandlers();
}

window.onload = function() { start(); }