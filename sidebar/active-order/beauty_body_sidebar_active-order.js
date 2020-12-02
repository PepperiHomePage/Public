customHomepage.activeOrder = function(transactionName,fields,accountUUID, id){
  pepperi.api.transactions.search({
    fields: [
      "UUID",
      "Status",
      "WrntyID",
      ...fields.map(el => el.field)
    ],
    filter: {
      Operation: "AND",
      RightNode: {
        ApiName: "ActionDateTime",
        Operation: "InTheLast",
        Values: ["4", "Weeks"],
      },
      LeftNode: {
        Operation: "AND",
        RightNode: {
          ApiName: "Type",
          Operation: "IsEqual",
          Values: [transactionName],
        },
        LeftNode: {
          Operation: "AND",
          RightNode: {
            ApiName: "Account.UUID",
            Operation: "IsEqual",
            Values: [accountUUID],
          },
          LeftNode: {
            Operation: "AND",
            RightNode: {
              ApiName: "Hidden",
              Operation: "IsEqual",
              Values: ['false'],
            },
            LeftNode: {
              ApiName: "Status",
              Operation: "IsEqual",
              Values: ["1", "1000"],
            },
          },
        },
      },
    },
    sorting: [{ Field: "ActionDateTime", Ascending: false }],
    pageSize: 1,
    page: 1,
    responseCallback: "customHomepage.getRecentTransactionForAccountCallback",
    requestID:id
  });
}

customHomepage.getRecentTransactionForAccountCallback = function (data) {
  customHomepage.transactionFields =  blocks_config["active-order"].table
  console.log("data", data)
  console.log("blocks_config",JSON.stringify(blocks_config))
  let recentOrdBtnDeeplink = ''
  if (data && data.objects && data.objects.length) {
    let uuid = data.objects[0].UUID ? data.objects[0].UUID : "00000000";
    customFunction.setSessionStorage("LastOpenTransactionUUID", uuid);
    recentOrdBtnDeeplink = 'Transactions/Cart/' + data.objects[0].UUID;
    $("#orderBtn").attr("onclick", `customFunction.setUUIDandNav(null,null,'${recentOrdBtnDeeplink}', "customHomepage")`);
    $("#orderBtn").text("Back to Cart")
    customHomepage.buildOpenOrdersTable(data.objects, data.requestID);
  } else {
    customFunction.setSessionStorage("LastOpenTransactionUUID", '');
    recentOrdBtnDeeplink = '/Transactions/scope_items/{{UUID}}';
    $("#orderBtn").attr("onclick", `customFunction.setUUIDandNav(null,null,'${recentOrdBtnDeeplink}', "customHomepage")`);
    $("#orderBtn").text("Create New Order");
    let html = `<h3 class="title-2-sm " id="currTransactionName"></h3>
    <ul class="leaders" id="currTransactionFields">
    `;
    customHomepage.transactionFields.forEach(el => {
      html += `
      <li>
      <span  class="dimmed">${el.text}</span>
      <span class="bold">0</span>
    </li>`
    })
    html += `</ul><button class="comonBtn" id="orderBtn">Back to Cart</button>`
    
    document.getElementById(data.requestID).style.display = "flex"
    document.getElementById(data.requestID).style.flexDirection = "column"
    document.getElementById(data.requestID).innerHTML = html
  }
};

customHomepage.buildOpenOrdersTable = function (data, id) {
  console.log("active order data ->>>> ", data);
  console.log("active order block config ->>>> ", blocks_config["active-order"].table);
  var is_new = false;
  if (data[0].Status == 1000)
    is_new = true;
  let html = `<h3 class="title-2-sm " id="currTransactionName"></h3>
  <ul class="leaders" id="currTransactionFields">`;
  customHomepage.transactionFields.forEach(el => {
    html += `<li>
    <span  class="dimmed">${el.text}</span>
    <span class="bold">${is_new ? 0 : data[0][el.field]}</span>
  </li>`
  })
  html += `</ul>
  <button class="comonBtn" id="orderBtn">Back to Cart</button>`  
  document.getElementById(id).style.display = "flex"  
  document.getElementById(id).style.flexDirection = "column"
  document.getElementById(id).innerHTML = html
  document.getElementById("currTransactionName").innerHTML = blocks_config["active-order"].name
};