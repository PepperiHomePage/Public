customFunction.buildFoodList = function (slideid) {
  var foodListHTML = "";

  foodListHTML += `<div id="popup" style="display: none"></div>
                   <div id="lists" style="display: none;"></div>`;

  document.getElementById(slideid).innerHTML = foodListHTML;
  document.getElementById(slideid).style.display = "block";
};