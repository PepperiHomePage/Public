customHeader.createNewOrder = function (inCatalog = null, in_transactionName = null, deepLink = null, skipSessionSaving) {
  let catalogUUID = !inCatalog ? customHeader.catalogs.find((el) => el.ExternalID === customHeader.catalogName).UUID : customHeader.catalogs.find((el) => el.ExternalID === inCatalog).UUID
  var bridgeObject = {
    references: {
      account: {
        UUID: customHeader.accountUUID
      },
      catalog: {
        UUID: catalogUUID
      }
    },
    type: {
      Name: !in_transactionName ? customHeader.transactionName : in_transactionName
    },
    responseCallback: skipSessionSaving ? "customHeader.createNewTransactionCallback" : "customHeader.createNewOrderCallback",
    requestID: deepLink
  };
  pepperi.app.transactions.add(bridgeObject);
};

customHeader.createNewOrderCallback = function (res) {
  console.log('createNewOrderCallback res', res);
  if (res && res.success) {
    customHeader.setSessionStorage('LastOpenTransactionUUID', res.id);
    let uuid = res.id;
    if (res.requestID) {
      var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
      customHeader.navigation(requestID);
    }
  }
};
customHeader.createNewTransactionCallback = function (res) {
  console.log('createNewTransactionCallback res', res);
  if (res && res.success) {
    let uuid = res.id;
    if (res.requestID) {
      var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
      customHeader.navigation(requestID);
    }
  }
};