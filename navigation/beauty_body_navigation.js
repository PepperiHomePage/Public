customHomepage.setUUIDandNav = function (in_catalog = null, in_transactionName = null, deepLink = null) {
  const uuid = customHomepage.getSessionStorage('LastOpenTransactionUUID');
  if (uuid && uuid !== "undefined") {
    deepLink = deepLink.replace('{{UUID}}', uuid.replace(/-/g, ''));
    customHomepage.navigation(deepLink);
  } else {
    customHomepage.createNewOrder(in_catalog, in_transactionName, deepLink);
  }
};
customHomepage.NavigateToActiveCart = function (data) {
  var uuid = customHomepage.getSessionStorage("LastOpenTransactionUUID");
  if (uuid) {
    customHomepage.navigation("/Transactions/Cart/" + uuid.replace(/-/g, ""));
  }
};
customHomepage.navigation = function (path) {
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
customHomepage.logout = function () {
  var event = new CustomEvent("logout");

  if (document.createEvent) {
    window.dispatchEvent(event);
  } else {
    window.fireEvent("on" + event.eventType, event);
  }
};