

customFunction.NavigateToActiveCart = function (data) {
  var uuid = customHomepage.getSessionStorage("LastOpenTransactionUUID");
  if (uuid) {
    customFunction.navigation("/Transactions/Cart/" + uuid.replace(/-/g, ""));
  }
};

customFunction.logout = function () {
  var event = new CustomEvent("logout");

  if (document.createEvent) {
    window.dispatchEvent(event);
  } else {
    window.fireEvent("on" + event.eventType, event);
  }
};