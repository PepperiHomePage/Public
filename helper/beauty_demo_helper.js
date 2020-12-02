
  customHomepage.createNewActivity = function (in_transactionName, deeplink) {
    var bridgeObject = {
      references: {
        account: {
          UUID: customHomepage.accountUUID,
        },
      },
      type: {
        Name: !in_transactionName ? customHomepage.transactionName : in_transactionName,
      },

      responseCallback: "customHomepage.createNewActivityCallback",
      requestID: deeplink,
    };

    pepperi.app.activities.add(bridgeObject);
  };
 
  customHomepage.createNewActivityCallback = function (res) {
    if (res && res.success) {
      var uuid = res.id;

      if (res.requestID) {
        var requestID = res.requestID.replace(
          "{{UUID}}",
          uuid.replace(/-/g, "")
        );
        customFunction.navigation(requestID);
      }
    }
  };
