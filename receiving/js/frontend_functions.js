//rq listfunction rq_list(myRequisitions) {	document.getElementById("rqList").style.display = "block";	document.getElementById("rq").style.display = "none";	//get the rqListTable	var tbl = document.getElementById("rqListTable");	//the data field names are specified in a hidden caption of	//the rqListTable. Here we load them into 'col' variable.	var col = tbl.caption.innerText.trim().split(",");	// ADD JSON DATA TO THE TABLE AS ROWS.	var tmp = "location.href='?requisitionId=";	for (var i = 0; i < myRequisitions.length; i++) {		//check if there is a row. if not, add it.		if(tbl.rows[i + 1] === undefined) {			var cln = tbl.rows[i].cloneNode(true);			tbl.appendChild(cln);		}		var tr = tbl.rows[i + 1];		//populate the cells of the row		for (var j = 0; j < col.length; j++) {			tr.cells[j].innerHTML = myRequisitions[i][col[j]];		}		//set the onclick and the cursor of this table row		var onclickStr = tmp + myRequisitions[i]["requisitionId"] + "'";		tr.setAttribute('onclick', onclickStr)	}}//rq formfunction rq_form(myRequisition) {	document.getElementById("rqList").style.display = "none";	document.getElementById("rq").style.display = "block";	//populate the rq data elements	document.getElementById("rqId").innerHTML = myRequisition["requisitionId"];	var obj = document.getElementById("rqData").getElementsByTagName("input");	for(i=0, l=obj.length; i<l; i++) {		obj[i].value = myRequisition[obj[i].name];	}	//populate the rq items data elements	var tbl = document.getElementById("tbl");	var itemlen = myRequisition.items.length;	for (i = 0; i < itemlen; i++) {		//check if there is a row. if not, add it.		if(tbl.rows[i + 1] === undefined) {			var cln = tbl.rows[i].cloneNode(true);			tbl.appendChild(cln);		}		var inputs = tbl.rows[i + 1].getElementsByTagName("input");		for(j=0, l=inputs.length; j<l; j++) {			inputs[j].value = myRequisition["items"][i][inputs[j].name];		}	}}