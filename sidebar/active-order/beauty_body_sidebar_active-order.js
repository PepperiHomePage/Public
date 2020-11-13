customHomepage.activeOrder = function(transactionName,fields,accountUUID){
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
  });
}

customHomepage.getRecentTransactionForAccountCallback = function (data) {
  console.log("data", data)
  console.log("blocks_config",JSON.stringify(blocks_config))
  let recentOrdBtnDeeplink = ''
  if (data && data.objects && data.objects.length) {
    let uuid = data.objects[0].UUID ? data.objects[0].UUID : "00000000";
    this.setSessionStorage("LastOpenTransactionUUID", uuid);
    recentOrdBtnDeeplink = 'Transactions/Cart/' + data.objects[0].UUID;
    $("#orderBtn").attr("onclick", `customHomepage.setUUIDandNav(null,null,'${recentOrdBtnDeeplink}')`);
    $("#orderBtn").text("Back to Cart")
    this.buildOpenOrdersTable(data.objects);
  } else {
    this.setSessionStorage("LastOpenTransactionUUID", '');
    recentOrdBtnDeeplink = '/Transactions/scope_items/{{UUID}}';
    $("#orderBtn").attr("onclick", `customHomepage.setUUIDandNav(null,null,'${recentOrdBtnDeeplink}')`);
    $("#orderBtn").text("Create New Order");
    let html = '';
    this.transactionFields.forEach(el => {
      html += `<li>
      <span  class="dimmed">${el.text}</span>
      <span class="bold">0</span>
    </li>`
    })
    document.getElementById("currTransactionFields").innerHTML = html
  }
};

this.buildOpenOrdersTable = function (data) {
  var is_new = false;
  if (data[0].Status == 1000)
    is_new = true;
  let html = '';
  this.transactionFields.forEach(el => {
    html += `<li>
    <span  class="dimmed">${el.text}</span>
    <span class="bold">${is_new ? 0 : data[0][el.field]}</span>
  </li>`
  })
  document.getElementById("currTransactionFields").innerHTML = html
  console.log('blocks-config:', blocks_config["active-order"])
  document.getElementById("currTransactionName").innerHTML = blocks_config["active-order"].name
};