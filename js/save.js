function save() {

  var text = {};

  inputs = document.getElementsByTagName('input');
  for (i =0; i < inputs.length; i++) {
    name = inputs[i].name;
    text[name] = inputs[i].value;
  }

  var items_list = [];
  var rows = document.getElementById("tbl").getElementsByTagName("tr").length;
  for (i = 1; i < rows; i++) {
    var item_details = {};
    item_details["requistionItemId"] = document.getElementById("tbl").rows[i].cells[0].children[0].value;
    item_details["itemDescription"] = document.getElementById("tbl").rows[i].cells[1].children[0].value;
    item_details["quantity"] = document.getElementById("tbl").rows[i].cells[2].children[0].value;
    item_details["unit"] = document.getElementById("tbl").rows[i].cells[3].children[0].value;
    item_details["price"] = document.getElementById("tbl").rows[i].cells[4].children[0].value;
    var single_item = JSON.stringify(item_details);
    items_list[i-1] = single_item;
  }

  // console.log(items_list);
  text["items"] = items_list;

  var display_JSON = JSON.stringify(text);
  alert(display_JSON);
}