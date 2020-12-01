customHomepage.submitedOrders = function (transactionName,fields,accountUUID, id) {
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
    requestID:id
  });
};
customHomepage.getRecentSubmittedTransactionForAccountCallback = function (data) {
  console.log("transaction data ------> ", data);
  if (data && data.objects && data.objects.length) {
    customHomepage.buildSubmittedOrdersTable(data.objects, data.requestID);
  } else {
    document.getElementById(data.requestID).style.display = "flex"
    document.getElementById(data.requestID
    ).innerHTML = `<h3 class="title-2-sm " id="submitted_orders_name">Submitted Orders</h3>
    <hr>
    <ul id="open-orders" class="leaders"><li>No submitted orders for this account</li></ul>
      `;
      
  }
};
customHomepage.buildSubmittedOrdersTable = function (data, id) {
  let tableHtml = "";
  let Container = document.getElementById(id);
  tableHtml += `
  <h3 class="title-2-sm " id="submitted_orders_name">${blocks_config['submitted_orders'].name

}</h3><hr>
  <ul id="open-orders" class="leaders">`
  data.forEach((element) => {
    let dateValue = new Date(element.ActionDateTime).toLocaleDateString();
    let deepLink = "/transactions/cart/" + element.UUID;
    tableHtml += `
                  <li>
                  <span  class="dimmed">${dateValue}</span>
                  <span class="bold"><a onClick="customFunction.navigation('${deepLink}')">${element.InternalID}</a></span>
                </li>
                    
          `;
  });
  tableHtml += `</ul>`
  document.getElementById(id).classList.add("sidebar-box");
  document.getElementById(id).style.display = "flex"
  Container.innerHTML = tableHtml;

};