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
      "open-orders"
    ).innerHTML = `<li>No submitted orders for customHomepage account</li>`;
  }
};
customHomepage.buildSubmittedOrdersTable = function (data) {
  let tableHtml = "";
  let Container = document.getElementById("open-orders");
  document.getElementById("submitted_orders_name").innerHTML = blocks_config['submitted_orders'].name
  data.forEach((element) => {
    let dateValue = new Date(element[customHomepage.transactionsHistoryFields[0]]).toLocaleDateString();
    let deepLink = "/transactions/cart/" + element.UUID;
    tableHtml += `
          <li>
          <span  class="dimmed">${dateValue}</span>
          <span class="bold"><a onClick="customHomepage.navigation('${deepLink}')">${element[customHomepage.transactionsHistoryFields[1]]}</a></span>
        </li>            
          `;
  });

  Container.innerHTML = "";
  Container.innerHTML = tableHtml;
};