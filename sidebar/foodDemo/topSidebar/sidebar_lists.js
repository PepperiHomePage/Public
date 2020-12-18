customFunction.buildLists = function (slideid) {
  var listsHTML = "";

  for (const [index, item] of list.entries()) {
    listsHTML += `
          <div class="option">
          <p id="list">${item.listLabel}</p>
          <button id="add" onclick="customHomepage.setUUIDandNav('${item.deepLink}')"></button>
      </div>`;
  }
  document.getElementById(slideid).innerHTML = listsHTML;
  document.getElementById(slideid).style.display = "block";
};