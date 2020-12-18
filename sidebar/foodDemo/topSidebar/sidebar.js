customFunction.buildSidebar = function (slideid) {
  var sidebarHTML = "";

  sidebarHTML += `<div id="response-menu" class="response-menu">
                    <button onclick="customHomepage.openCloseMenu();" class="dropbtn" id="btn">Open menu</button>
                  </div>
                  <div id="sidebar-sm" class="sidebar-menu">
                  <div id="store-selector" style="display:none">                  
                  </div>
                  </div>`;

  document.getElementById(slideid).innerHTML = sidebarHTML;
};