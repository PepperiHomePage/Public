customHomepage.submitedOrders = function (transactionName,fields,accountUUID) {
  pepperi.api.transactions.search({
    fields: [
      "UUID",
      ...fields
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
              Values: blocks_config["submitted_orders"].statuses,
            },
          },
        },
      },
    },
    sorting: [{ Field: "ActionDateTime", Ascending: false }],
    pageSize: 5,
    page: 1,
    responseCallback: "customHomepage.getRecentSubmittedTransactionForAccountCallback",
  });
};
customHomepage.getRecentSubmittedTransactionForAccountCallback = function (data) {
  if (data && data.objects && data.objects.length) {
    customHomepage.buildSubmittedOrdersTable(data.objects);
  } else {
    document.getElementById(
      "submitted_orders"
    ).innerHTML = `<h3 class="title-2-sm " id="submitted_orders_name">Submitted Orders</h3>
    <hr>
    <ul id="open-orders" class="leaders"><li>No submitted orders for customHomepage account</li></ul>
      `;
  }
};
customHomepage.buildSubmittedOrdersTable = function (data) {
  let tableHtml = "";
  let Container = document.getElementById("submitted_orders");
  document.getElementById("submitted_orders_name").innerHTML = blocks_config['submitted_orders'].name
  data.forEach((element) => {
    let dateValue = new Date(element[customHomepage.transactionsHistoryFields[0]]).toLocaleDateString();
    let deepLink = "/transactions/cart/" + element.UUID;
    tableHtml += `
    <h3 class="title-2-sm " id="submitted_orders_name">Submitted Orders</h3>
                  <hr>
                  <ul id="open-orders" class="leaders"><li>
                  <span  class="dimmed">${dateValue}</span>
                  <span class="bold"><a onClick="customHomepage.navigation('${deepLink}')">${element[customHomepage.transactionsHistoryFields[1]]}</a></span>
                </li>  </ul>
                    
          `;
  });

  Container.innerHTML = "";
  Container.innerHTML = tableHtml;
};