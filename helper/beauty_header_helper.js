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



customHeader.closeHamburgerMenu = function () {
  $('#myDropdown').toggleClass('show').focus()
}
customHeader.closeMenu = function () {
  $('#menuDropdown').toggleClass('show').focus();
}

customHeader.linksMenu = function () {
  $('#linksDropdown').toggleClass('show').focus()
}

customHeader.closeAllMenusListener = function () {

  $('#menuDropdown').attr('tabindex', '-1');
  $('#linksDropdown').attr('tabindex', '-1');
  $('#myDropdown').attr('tabindex', '-1');

  $('#menuDropdown').on('focusout', function () {
    $('#menuDropdown').removeClass('show');
  });

  $('#linksDropdown').on('focusout', function () {
    $('#linksDropdown').removeClass('show');
  });

  $('#myDropdown').on('focusout', function () {
    $('#myDropdown').removeClass('show');
  });
}

customHeader.openInNewTab = function (url) {
  var win = window.open(url, '_blank');
  win.focus();
};