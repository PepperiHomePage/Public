customHeader.getAccountStatus = function () {
  var bridgeObject = {
    fields: ['Name', 'UUID'],
    sorting: [],
    responseCallback: 'customHeader.getCurrentAccountCallback'
  };
  pepperi.api.accounts.search(bridgeObject);
};
customHeader.getCurrentAccountCallback = function (res) {
  if (res && res.success && res.objects && res.objects.length)
    customHeader.accountUUID = res.objects[0].UUID;
    
}



customHeader.logout = function () {
  var event = new CustomEvent('logout');
  if (document.createEvent) {
    window.dispatchEvent(event);
  } else {
    window.fireEvent('on' + event.eventType, event);
  }
};

customHeader.changePassword = function () {
  window.location.href = 'https://idp.pepperi.com/Account/ChangePassword';
};    



customHeader.closeHamburgerMenu = function (id) {
  $(id).toggleClass('show').focus()
}
customHeader.closeMenu = function () {
  $('#menuDropdown').toggleClass('show').focus();
}

customHeader.linksMenu = function () {
  $('#linksDropdown').toggleClass('show').focus()
}
