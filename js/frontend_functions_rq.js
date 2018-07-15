//rq listfunction rq_list(myRequisitions) {	document.getElementById("rqList").style.display = "block";	document.getElementById("rq").style.display = "none";	//get the rqListTable	var tbl = document.getElementById("rqListTable");	//the data field names are specified in a hidden caption of	//the rqListTable. Here we load them into 'col' variable.	var col = tbl.caption.innerText.trim().split(",");	// ADD JSON DATA TO THE TABLE AS ROWS.	var tmp = "location.href='?requisitionId=";	for (var i = 0; i < myRequisitions.length; i++) {		//check if there is a row. if not, add it.		if(tbl.rows[i + 1] === undefined) {			var cln = tbl.rows[i].cloneNode(true);			tbl.appendChild(cln);		}		var tr = tbl.rows[i + 1];		//populate the cells of the row		for (var j = 0; j < col.length; j++) {			tr.cells[j].innerHTML = myRequisitions[i][col[j]];		}		//set the onclick and the cursor of this table row		var onclickStr = tmp + myRequisitions[i]["requisitionId"] + "'";		tr.setAttribute('onclick', onclickStr)	}}//rq formfunction rq_form(myRequisition) {	document.getElementById("rqList").style.display = "none";	document.getElementById("rq").style.display = "block";	//populate the rq data elements	document.getElementById("rqId").innerHTML = myRequisition["requisitionId"];	var obj = document.getElementById("rqData").getElementsByTagName("input");	for(i=0, l=obj.length; i<l; i++) {		obj[i].value = myRequisition[obj[i].name];	}	//populate the rq items data elements	var tbl = document.getElementById("items_table");	var itemlen = myRequisition.items.length;	for (i = 0; i < itemlen; i++) {		//check if there is a row. if not, add it.		if(tbl.rows[i + 1] === undefined) {			var cln = tbl.rows[i].cloneNode(true);			tbl.appendChild(cln);		}		var inputs = tbl.rows[i + 1].getElementsByTagName("input");		for(j=0, l=inputs.length; j<l; j++) {			inputs[j].value = myRequisition["items"][i][inputs[j].name];		}	}}// rq form savefunction rq_form_save() {	}//copy last row, clear it and append to tablefunction copyRow(tableId) {	var tbl = document.getElementById(tableId);	var lastRow = tbl.rows.length - 1;	var cln = tbl.rows[lastRow].cloneNode(true);	inputs = cln.getElementsByTagName("input");	for(j=0, l=inputs.length; j<l; j++) {		inputs[j].value = "";	}	tbl.appendChild(cln);}//delete last row from table if it is blankfunction deleteRow(tableId) {	var tbl = document.getElementById(tableId);	var lastRow = tbl.rows.length - 1;	inputs = tbl.rows[lastRow].getElementsByTagName("input");	var noContent = true;	for(j=0, l=inputs.length; j<l; j++) {		if(inputs[j].value.length > 0) { noContent = false; break; }	}	if(noContent) {		tbl.deleteRow(lastRow);	}}function calculateTotal() {	var table=document.getElementById('items_table');	var quantities = document.getElementsByName('quantity');	var prices = document.getElementsByName('price');	var semi_total = document.getElementsByName('extended');    var total = 0;    for(var i = 0; i < quantities.length; i++)      {      	var x = quantities[i].value * prices[i].value;      	semi_total[i].value = x        total += x;      }	document.getElementsByName('rqAmount')[0].value = total.toFixed(2);}function rq_form_validate() {	var valid = true;	//rq data	var inputs = document.getElementById("rqData").getElementsByTagName("input");	for(i = 0, l=inputs.length; i<l; i++) {		var name = inputs[i].name; var value = inputs[i].value;		if(value == "") {			if(name == "initiatingOffice") { valid = false; break; }			if(name == "preparedDate") { valid = false; break; }			if(name == "vendorId") { valid = false; break; }			if(name == "justification") { valid = false; break; }		}	}		//rq items, checking row 1	var inputs = document.getElementById("items_table").rows[1].getElementsByTagName("input");	for(i = 0, l=inputs.length; i<l; i++) {		var name = inputs[i].name; var value = inputs[i].value;		if(value == "") {			if(name == "quantity") { valid = false; break; }			if(name == "unit") { valid = false; break; }			if(name == "price") { valid = false; break; }			if(name == "description") { valid = false; break; }		}	}		return valid;}function save() {	if(rq_form_validate() == true) {		var rqId = document.getElementById("rqId").innerText;		if(Number(rqId) == rqId || rqId == "new") {			// alert(single_item);			var text = {};			//get the requisition info			var inputs = document.getElementById("rqData").getElementsByTagName("input");			text["requisitionId"] = rqId;			for(i=0, l=inputs.length; i<l; i++) {				text[inputs[i].name] = inputs[i].value;			}				var items_list = [];			//get the items info			var rows = document.getElementById("items_table").rows;			for (i = 1, l=rows.length; i < l; i++) {				items_list[i-1] = {};				var inputs2 = rows[i].getElementsByTagName("input");				for(j=0, jl=inputs2.length; j<jl; j++) {					items_list[i - 1][inputs2[j].name] = inputs2[j].value;				}				if(inputs2[jl - 1].checked == true) { items_list[i - 1]["del"] = 1; }			}				text["items"] = items_list;				return JSON.stringify(text);		}		} else {		alert("Could not save. Incomplete data.");		exit;	}}function print_rq() {	rqId = document.getElementById("rqId").innerText;	window.open("requisitioning_rq_print.html?requisitionId=" + rqId);}