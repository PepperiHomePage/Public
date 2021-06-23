customFunction.buildBaseList = function (slideid) {
  var baseListHTML = "";

  baseListHTML += `<div class="top-base">
                      <p>Item list</p>   
                    </div>
                    <hr>
                    <div id="item_list" style="display: none"></div>
                    <button class="order-button" id="transactionTotal" onclick="customHomepage.NavigateToActiveCart()">Go to Order</button>`;

  document.getElementById(slideid).innerHTML = baseListHTML;
  document.getElementById(slideid).style.display = "flex";
};