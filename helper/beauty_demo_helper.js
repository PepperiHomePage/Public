customHomepage.getCatalogs = function () {
    pepperi.api.catalogs.search({
      fields: ["UUID", "ExternalID", "Description", "ID"],
      responseCallback: 'customHomepage.getCatalogsCallback'
    });
  }
  customHomepage.getCatalogsCallback = function (res) {
    (res && res.objects && res.objects.length) ? customHomepage.catalogs = res.objects: false;
    customHomepage.buildHTML();
  }
  customHomepage.createNewOrder = function (inCatalog = null, in_transactionName = null, deepLink = null, skipSessionSaving) {
    let catalogUUID = !inCatalog ? customHomepage.catalogs.find((el) => el.ExternalID === customHomepage.catalogName).UUID : customHomepage.catalogs.find((el) => el.ExternalID === inCatalog).UUID
    var bridgeObject = {
      references: {
        account: {
          UUID: customHomepage.accountUUID
        },
        catalog: {
          UUID: catalogUUID
        }
      },
      type: {
        Name: !in_transactionName ? customHomepage.transactionName : in_transactionName
      },
      responseCallback: skipSessionSaving ? "customHomepage.createNewOrderCallback" : "customHomepage.createNewOrderAndNavCallback",
      requestID: deepLink
    };
    pepperi.app.transactions.add(bridgeObject);
  };
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
  customHomepage.createNewOrderAndNavCallback = function (res) {
    console.log('createNewOrderAndNavCallback res', res);
    if (res && res.success) {
      customHomepage.setSessionStorage('LastOpenTransactionUUID', res.id);
      let uuid = res.id;
      if (res.requestID) {
        var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
        customHomepage.navigation(requestID);
      }
    }
  };
  customHomepage.createNewOrderCallback = function (res) {
    console.log('createNewOrderCallback res', res);
    if (res && res.success) {
      let uuid = res.id;
      if (res.requestID) {
        var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
        customHomepage.navigation(requestID);
      }
    }
  };
  customHomepage.createNewActivityCallback = function (res) {
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
  customHomepage.getAccounts = function (fields) {
    var bridgeObject = {
      fields: ["Name", "UUID", "ExternalID", ...fields],
      filter: {
        Operation: "AND",
        RightNode: {
          ApiName: "ParentExternalID",
          Operation: "IsEqual",
          Values: [""],
        },
        LeftNode: {
          ApiName: "Hidden",
          Operation: "IsEqual",
          Values: ["false"],
        },
      },
      responseCallback: "customHomepage.setAccountDD",
    };
    pepperi.api.accounts.search(bridgeObject);
  };
  customHomepage.setAccountDD = function (data) {
    console.log("accounts", data)
    if (!data.success || data.count == 0) return;
    customHomepage.accounts = data.objects;
    customHomepage.buildAccountsDropDown(customHomepage.accounts);
  };
