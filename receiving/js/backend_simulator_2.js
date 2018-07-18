function backend_simulator_2(id = 0) {

	var rqs = [
			{"requisitionId":"1","requisitionNo":"r1801","initiatingOffice":"DSM","requestedBy":"Ray Mechol","requestedDate":"2/1/2018","preparedBy":"Gayleen Sakuma","preparedDate":"2/2/2018","vendorId":"13","vendorName":"Jezrrae Wear II","justification":"To be used for meetings, conferences, and events","itemDescription":"Yamaha Speaker","numItems":"1","rqAmount":"3170","quotationId":"","moeApprovedDate":"2/19/2018","poNo":"L80945","poDate":"3/19/2018","poAmount":"3170","rcvDate":"5/21/2018","rcvBy":"Saburo","invoiceNo":"JW01","invoiceAmount":"3170","invoiceDate":"5/21/18"},
			{"requisitionId":"2","requisitionNo":"r1802","initiatingOffice":"Health/Science","requestedBy":"Debbie Nagata","requestedDate":"2/3/2018","preparedBy":"Liz Madrangchar","preparedDate":"2/4/2018","vendorId":"13","vendorName":"Jezrrae Wear II","justification":"To support technology enhanced instruction in schools","itemDescription":"TT-12ID Document Camera","numItems":"2","rqAmount":"101680","quotationId":"","moeApprovedDate":"2/19/2018","poNo":"L80958","poDate":"3/22/2018","poAmount":"101680","rcvDate":"","rcvBy":"","invoiceNo":"","invoiceAmount":"","invoiceDate":""},
			{"requisitionId":"3","requisitionNo":"r1803","initiatingOffice":"BEA","requestedBy":"Andrew Tabelual","requestedDate":"3/5/2018","preparedBy":"Bonnie Imeong","preparedDate":"3/5/2018","vendorId":"13","vendorName":"Jezrrae Wear II","justification":"To replace copier rp26832 at Koror","itemDescription":"Copier Machine","numItems":"1","rqAmount":"2488","quotationId":"","moeApprovedDate":"3/10/2018","poNo":"L81240","poDate":"5/21/2018","poAmount":"2488","rcvDate":"5/21/2018","rcvBy":"Saburo","invoiceNo":"JW03","invoiceAmount":"2488","invoiceDate":"5/21/18"},
			{"requisitionId":"4","requisitionNo":"r1804","initiatingOffice":"Facilities","requestedBy":"Bevenge Sbal","requestedDate":"3/1/2018","preparedBy":"Bonnie Imeong","preparedDate":"3/1/2018","vendorId":"12","vendorName":"Masons Hardware Do-It","justification":"Facilities operations tools","itemDescription":"Blower","numItems":"1","rqAmount":"3318.96","quotationId":"","moeApprovedDate":"3/10/2018","poNo":"L81246","poDate":"5/21/2018","poAmount":"3318.96","rcvDate":"5/21/2018","rcvBy":"Saburo","invoiceNo":"MH01","invoiceAmount":"3318.96","invoiceDate":"5/21/18"}
		];
	var items = [
			[
				{"requisitionItemId":"1","requisitionId":"1","org":"3591","costCenter":"E73591","task":"E11000","opt":"","acc":"1555","quantity":"2","unit":"ea","description":"Yamaha Speaker","price":"1585","extended":"3170","rcvQuantity":"2","rcvPrice":"1585"}
			],
			[
				{"requisitionItemId":"2","requisitionId":"2","org":"3650","costCenter":"E63650","task":"","opt":"","acc":"1585","quantity":"80","unit":"ea","description":"TT-12ID Document Camera","price":"883","extended":"70640","rcvQuantity":"80","rcvPrice":"883"},
				{"requisitionItemId":"3","requisitionId":"2","org":"3650","costCenter":"E63650","task":"","opt":"","acc":"1585","quantity":"80","unit":"ea","description":"CRA-1 Wireless Pen Tablet","price":"388","extended":"31040","rcvQuantity":"80","rcvPrice":"388"}
			],
			[
				{"requisitionItemId":"4","requisitionId":"3","org":"1301","costCenter":"ESBS01","task":"","opt":"OPR","acc":"1555","quantity":"1","unit":"lot","description":"Copier Machine","price":"2488","extended":"2488","rcvQuantity":"1","rcvPrice":"2488"}
			],
			[
				{"requisitionItemId":"5","requisitionId":"4","org":"1322","costCenter":"EBOE03","task":"","opt":"OPR","acc":"1422","quantity":"2","unit":"ea","description":"Blower","price":"224.99","extended":"449.98","rcvQuantity":"2","rcvPrice":"224.99"},
				{"requisitionItemId":"6","requisitionId":"4","org":"1322","costCenter":"EBOE03","task":"","opt":"OPR","acc":"1585","quantity":"1","unit":"ea","description":"Bush Cutter","price":"299.99","extended":"299.99","rcvQuantity":"1","rcvPrice":"299.99"},
				{"requisitionItemId":"7","requisitionId":"4","org":"1322","costCenter":"EBOE03","task":"","opt":"OPR","acc":"1555","quantity":"1","unit":"ea","description":"Water Blaster 4000 PSI","price":"2399","extended":"2399","rcvQuantity":"1","rcvPrice":"2399"},
				{"requisitionItemId":"8","requisitionId":"4","org":"1322","costCenter":"EBOE03","task":"","opt":"OPR","acc":"1420","quantity":"1","unit":"ea","description":"Wheelbarrow, Heavy Duty","price":"169.99","extended":"169.96","rcvQuantity":"1","rcvPrice":"169.99"}
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

	if(id>0) {

		for(i=0, l=rqs.length; i<l; i++) {
			if(rqs[i]["requisitionId"] == id) {
				rqId = id;
				index = i;
				break;
			}
		}

		var tmp = Object.assign({}, rqs[index], { "items": items[index] });
		var ret = Object.assign({}, {"rq": tmp});
		return JSON.stringify(ret);

	} else {
		var ret = Object.assign({}, {"rqlist": rqs});
		return JSON.stringify(ret);
	}
}