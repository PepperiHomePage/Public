customFunction.buildSidebarSmall = function (slideid) {
  var sidebarSmallHTML = "";

  sidebarSmallHTML += `<div id="baselist" class="baselist" style="display: none;"></div>
  <hr>
  <div id="account_info" style="display: none;"></div>`;

  document.getElementById(slideid).innerHTML = sidebarSmallHTML;
};