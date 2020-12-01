customHomepage.setUUIDandNav = function (in_catalog = null, in_transactionName = null, deepLink = null) {
  const uuid = customHomepage.getSessionStorage('LastOpenTransactionUUID');
  if (uuid && uuid !== "undefined") {
    deepLink = deepLink.replace('{{UUID}}', uuid.replace(/-/g, ''));
    customFunction.navigation(deepLink);
  } else {
    customHomepage.createNewOrder(in_catalog, in_transactionName, deepLink);
  }
};
customHomepage.NavigateToActiveCart = function (data) {
  var uuid = customHomepage.getSessionStorage("LastOpenTransactionUUID");
  if (uuid) {
    customFunction.navigation("/Transactions/Cart/" + uuid.replace(/-/g, ""));
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