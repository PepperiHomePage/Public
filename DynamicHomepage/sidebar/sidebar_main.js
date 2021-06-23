customFunction.buildSidebar = function (slideid) {
  var sidebarHTML = "";

  sidebarHTML += `<div id="response-menu" class="response-menu">
                    <button onclick="customFunction.openCloseMenu();" class="regular-button" id="btn">Open menu</button>
                  </div>

                  <div id="sidebar-sm" class="sidebar-menu"></div>`;

  document.getElementById(slideid).innerHTML = sidebarHTML;
};

