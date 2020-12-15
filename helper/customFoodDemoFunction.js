if (!customDemoFunction)
    var customDemoFunction = {}

    customDemoFunction.createNewOrder = function (
      in_transactionName,
      deeplink /* = 'Transactions/scope_items/{{UUID}})'*/
    ) {
      var bridgeObject = {
        references: {
          account: {
            UUID: this.accountUUID,
          },
        },
        type: {
          Name: !in_transactionName ? this.transactionName : in_transactionName,
        },
        // catalog: this.catalogName,
        responseCallback: "customFunction.createNewOrderCallback",
        requestID: deeplink,
      };
      pepperi.app.transactions.add(bridgeObject);
    };