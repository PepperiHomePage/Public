this.submitedOrders = function (transactionName,fields,accountUUID) {
  pepperi.api.transactions.search({
    fields: [
      "UUID",
      ...this.transactionsHistoryFields
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
          Values: [this.transactionName],
        },
        LeftNode: {
          Operation: "AND",
          RightNode: {
            ApiName: "Account.UUID",
            Operation: "IsEqual",
            Values: [uuid],
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
this.getRecentSubmittedTransactionForAccountCallback = function (data) {
  if (data && data.objects && data.objects.length) {
    this.buildSubmittedOrdersTable(data.objects);
  } else {
    document.getElementById(
      "open-orders"
    ).innerHTML = `<li>No submitted orders for this account</li>`;
  }
};
this.buildSubmittedOrdersTable = function (data) {
  let tableHtml = "";
  let Container = document.getElementById("open-orders");
  document.getElementById("submitted_orders_name").innerHTML = blocks_config['submitted_orders'].name
  data.forEach((element) => {
    let dateValue = new Date(element[this.transactionsHistoryFields[0]]).toLocaleDateString();
    let deepLink = "/transactions/cart/" + element.UUID;
    tableHtml += `
          <li>
          <span  class="dimmed">${dateValue}</span>
          <span class="bold"><a onClick="customHomepage.navigation('${deepLink}')">${element[this.transactionsHistoryFields[1]]}</a></span>
        </li>            
          `;
  });

  Container.innerHTML = "";
  Container.innerHTML = tableHtml;
};