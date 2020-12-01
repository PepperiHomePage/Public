if (!customFunction)
    var customFunction = {}
customFunction.getCatalogs = function (x) {
    console.log(x)
    pepperi.api.catalogs.search({
        fields: ["UUID", "ExternalID", "Description", "ID"],
        responseCallback: "customFunction.getCatalogsCallback",
        requestID: x        
    });
}
customFunction.getCatalogsCallback = function (res) {
    console.log("get catalog res", res);
    (res && res.objects && res.objects.length) ? customFunction.catalogs = res.objects: false;
    var fun = eval("(" + res.requestID + ")");
    fun.buildHTML();
}

customFunction.createNewActivity = function (in_transactionName, deeplink, customName) {
    var evalCustomName = eval("(" + customName + ")")
    var bridgeObject = {
      references: {
        account: {
          UUID: evalCustomName.accountUUID,
        },
      },
      type: {
        Name: !in_transactionName ? evalCustomName.transactionName : in_transactionName,
      },
  
      responseCallback: "customFunction.createNewActivityCallback",
      requestID: {deeplink, customName},
    };
  
    pepperi.app.activities.add(bridgeObject);
  };
  customFunction.createNewActivityCallback = function (res) {
    console.log(res);  
    if (res && res.success) {
      var uuid = res.id;
  
      if (res.requestID) {
        var requestID = res.requestID.replace(
          "{{UUID}}",
          uuid.replace(/-/g, "")
        );
        customHomepage.navigation(requestID);
      }
    }
  };