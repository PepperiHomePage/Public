customFunction.buildLists = function (slideid) {
  var listsHTML = "";

  for (const [index, item] of customHomepage.configFile.Sidebar.entries()) {
    listsHTML += `
          <div class="option">
          <p id="list">${item.ListLabel}</p>
          <button id="add" onclick="customFunction.setUUIDandNav(null,null,'${item.DeepLink.replace(/["']/g,"%22")}', 'customHomepage')"></button>
      </div>`;
  }
  document.getElementById(slideid).innerHTML = listsHTML;
  document.getElementById(slideid).style.display = "block";
};