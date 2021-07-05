if (!customFunction)
  var customFunction = {}
customFunction.catalogs;
customFunction.transactionName = Transaction
customFunction.catalogName = Catalog
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
    requestID: {
      deeplink,
      customName
    },
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
      customFunction.navigation(requestID);
    }
  }
};
customFunction.handleAction = function (item, nameOfMainJs) {
  if(item.deepLink)
    var deepLink = item.deepLink.replace(/\"/g, '%22');
  switch (item.action) {
    case 'navigation':
      return `customFunction.navigation('${deepLink}')`;
    case 'setUUIDandNav':
      return `customFunction.setUUIDandNav('${item.catalog}','${item.transaction}','${deepLink}', '${nameOfMainJs}')`;
    case 'openInNewTab':
      return `customFunction.openInNewTab('${deepLink}')`;
    case 'createNewActivity':
      return `customFunction.createNewActivity('${item.activity}','${deepLink}', '${nameOfMainJs}')`;
    case 'createNewTransaction':
      return `customFunction.createNewOrder('${item.catalog}','${item.transaction}','${deepLink}',true, '${nameOfMainJs}')`;
    case 'zendesk':
      return `location.href = 'javascript:$zopim.livechat.window.show()'`
  }
}
customFunction.navigation = function (path) {
  customFunction.closeAllMenusListener();
  var eventData = {
    detail: {
      path: path,
    },
  };

  var event = new CustomEvent("navigateTo", eventData);

  if (document.createEvent) {
    window.dispatchEvent(event);
  } else {
    window.fireEvent("on" + event.eventType, event);
  }
};

customFunction.setUUIDandNav = function (in_catalog = null, in_transactionName = null, deepLink = null, nameOfMainJs) {
  customFunction.closeAllMenusListener();
  var name = eval("(" + nameOfMainJs + ")")
  const uuid = name.getSessionStorage('LastOpenTransactionUUID');
  console.log("uuid --->", uuid);
  if (uuid && uuid !== "undefined") {
    deepLink = deepLink.replace('{{UUID}}', uuid.replace(/-/g, ''));
    customFunction.navigation(deepLink);
  } else {
    customFunction.createNewOrder(in_catalog, in_transactionName, deepLink, false, nameOfMainJs);
  }
};

customFunction.openInNewTab = function (url) {
  var win = window.open(url, '_blank');
  win.focus();
};

customFunction.createNewOrder = function (inCatalog = null, in_transactionName = null, deepLink = null, skipSessionSaving, nameOfMainJs) {
  var name = eval("(" + nameOfMainJs + ")")
  let catalogUUID = !inCatalog ? customFunction.catalogs.find((el) => el.ExternalID === customFunction.catalogName).UUID : customFunction.catalogs.find((el) => el.ExternalID === inCatalog).UUID
  var bridgeObject = {
    references: {
      account: {
        UUID: name.accountUUID
      },
      catalog: {
        UUID: catalogUUID
      }
    },
    type: {
      Name: !in_transactionName ? customFunction.transactionName : in_transactionName
    },
    responseCallback: skipSessionSaving ? "customFunction.createNewOrderCallback" : "customFunction.createNewOrderAndNavCallback",
    requestID: deepLink
  };
  pepperi.app.transactions.add(bridgeObject);
};

customFunction.createNewOrderAndNavCallback = function (res) {
  console.log('createNewOrderAndNavCallback res', res);
  if (res && res.success) {
    customFunction.setSessionStorage('LastOpenTransactionUUID', res.id);
    let uuid = res.id;
    if (res.requestID) {
      var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
      customFunction.navigation(requestID);
    }
  }
};
customFunction.createNewOrderCallback = function (res) {
  console.log('createNewOrderCallback res', res);
  if (res && res.success) {
    let uuid = res.id;
    if (res.requestID) {
      var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
      customFunction.navigation(requestID);
    }
  }
};

customFunction.closeAllMenusListener = function () {
  $('#select-menu').attr('tabindex', '-1');
  $('#select-menu').on('focusout', function () {
    $('#select-menu').removeClass('show');
  });

  $('#menuDropdown').attr('tabindex', '-1');
  $('#linksDropdown').attr('tabindex', '-1');
  $('#myDropdown').attr('tabindex', '-1');

  $('#menuDropdown').on('focusout', function () {
    $('#menuDropdown').removeClass('show');
  });
  $('#menuDropdown').removeClass('show');

  $('#linksDropdown').on('focusout', function () {
    $('#linksDropdown').removeClass('show');
  });

  $('#myDropdown').on('focusout', function () {
    $('#myDropdown').removeClass('show');
  });
};
customFunction.openCloseMenu = function () {
  const over = document.getElementById("overlay");
  const e = document.getElementById("sidebar-sm");
  const btn = document.getElementById("btn");
  if (e.style.display == "block") {
    e.style.display = "none";
    over.style.display = "none";
    btn.innerText = "Open Menu";
  } else {
    over.style.display = "block";
    e.style.display = "block";
    btn.innerText = "Close Menu";
    $('#sidebar-sm').attr('tabindex', '-1');
    $('#sidebar-sm').focus()
  }
};

customFunction.getTransactionStatus = function () {
  var currentTransactionUUID = customHomepage.getSessionStorage(
    "LastOpenTransactionUUID"
  );
  if (!currentTransactionUUID) {
    customFunction.createNewOrder();
  } else {
    var fields = ["Status", "UUID", "Currency"];
    var filter = {
      ExpressionId: 1,
      ApiName: "UUID",
      Operation: "IsEqual",
      Values: [currentTransactionUUID],
    };
    customFunction.getTransactions(
      fields,
      filter,
      [],
      100000,
      "customFunction.getExitTransactionCallback"
    );
  }
};

customFunction.getExitTransactionCallback = function (res) {
  if (
    res &&
    res.objects &&
    res.objects.length &&
    (res.objects[0].Status == 1 || res.objects[0].Status == 1000)
  ) {
    var transaction = res.objects[0];
    customFunction.setQuantitiesTotal(transaction.QuantitiesTotal)
    customFunction.setCurrentTransaction(transaction.UUID, transaction.TSANewGrandTotalCurrency, transaction.Currency);
  } else {
    customFunction.createNewOrder();
  }
};

customFunction.setQuantitiesTotal = function (QuantitiesTotal) {
  var quantity = document.getElementById('order_btn_qty');
  if (QuantitiesTotal != 0) {
    quantity.style.display = 'inline-block';
    quantity.innerHTML = +QuantitiesTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,");
  } else {
    quantity.style.display = 'none';
  }
}

customFunction.setCurrentTransaction = function (uuid, grandTotal) {
  customHomepage.setSessionStorage('LastOpenTransactionUUID', uuid);
  var total = grandTotal ?
    Number(grandTotal)
    .toFixed(2)
    .toString() :
    '0.00';
  var totalElem = document.getElementById('totalText');
  if (grandTotal != 0 || totalElem) {
    totalElem.innerHTML = '$ ' + total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    if (grandTotal == 0) {
      totalElem.innerHTML = 'Go to cart';
    }
  }
};

customFunction.getLastTransactions = function () {
  var fields = [
    "Status",
    "UUID",
    "GrandTotal",
    "QuantitiesTotal",
    "CreationDateTime",
  ];
  var sortBy = [{
    Field: "CreationDateTime",
    Ascending: false
  }];
  var Size = 1;
  var filter = {
    ComplexId: 4,
    Operation: "AND",
    LeftNode: {
      ComplexId: 3,
      Operation: "AND",
      LeftNode: {
        ComplexId: 2,
        Operation: "AND",
        LeftNode: {
          ExpressionId: 1,
          ApiName: "CreationDateTime",
          Operation: "InTheLast",
          Values: ["20", "Weeks"],
        },
        RightNode: {
          ExpressionId: 2,
          ApiName: "Status",
          Operation: "IsEqual",
          Values: ["1"],
        },
      },
      RightNode: {
        ExpressionId: 3,
        ApiName: "QuantitiesTotal",
        Operation: ">",
        Values: ["0"],
      },
    },
    RightNode: {
      ExpressionId: 4,
      ApiName: "ActivityTypeID",
      Operation: "IsEqual",
      Values: ["270336"],
    },
  };
  customFunction.getTransactions(
    fields,
    filter,
    sortBy,
    Size,
    "customFunction.getLastTransactionsCallback"
  );
};
customFunction.getLastTransactionsCallback = function (res) {
  console.log("getLastTransactionsCallback---->", res);
  if (res && res.objects != null && res.objects.length > 0) {
    console.log(res.objects[0].UUID);
    customFunction.setSessionStorage(
      "LastOpenTransactionUUID",
      res.objects[0].UUID
    );
  } else {
    customFunction.createNewOrder();
  }
};

customFunction.getTransactions = function (fields, filter, sortBy, Size, callBack) {
  var bridgeObject = {
    fields: fields,
    filter: filter,
    sorting: sortBy,
    pageSize: Size,
    responseCallback: callBack,
  };
  pepperi.api.transactions.search(bridgeObject);
};

customFunction.getAccountInternalID = function () {
  var bridgeObject = {
    fields: ["Name", "InternalID", "UUID"], //"TSACreditLine", "TSABalance"
    //   filter:{
    //       ApiName:"UUID",
    //       Operation:"IsEqual",
    //       Value:this.accountUUID
    //   },
    responseCallback: "customFunction.setAccountInternalID",
  };
  pepperi.api.accounts.search(bridgeObject);
};

customFunction.setSessionStorage = function (paramName, data) {
  sessionStorage.setItem(paramName, data);
};

customFunction.getAccountStatus = function () {
  var bridgeObject = {
    fields: ["Name", "UUID"],
    sorting: [],
    responseCallback: "customFunction.getCurrentAccountCallback",
  };
  pepperi.api.accounts.search(bridgeObject);
};

customFunction.getCurrentAccountCallback = function (res) {
  if (res && res.success && res.objects && res.objects.length)
    customHeader.accountUUID = res.objects[0].UUID;
};