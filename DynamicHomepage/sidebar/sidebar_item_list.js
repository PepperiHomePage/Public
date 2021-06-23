customFunction.buildItemList = function (slideid) {
  var foodListHTML = "";

  foodListHTML += `<div id="lists" style="display: none;"></div>`;

  document.getElementById(slideid).innerHTML = foodListHTML;
  document.getElementById(slideid).style.display = "block";
};