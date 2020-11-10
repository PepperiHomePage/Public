
this.promotions = function (Promotions) {
  this.drawPromotions(Promotions);
  this.drawPromotions = function (Promotions) {
    let str = "";
    for (const [idx1, value] of Promotions.entries()) {
      str += `
        <div class="promotion kits" style="background-image:url('${value.image}')">
        <div class="gard-overlay" style="${(!value.title || value.title == '') ? 'background:none' : ''}">
          <h2 class="title-4-lg">${value.title}</h2>
          <div>
            <button class="comonBtn custom-btn"
              onclick="customHomepage.setUUIDandNav(null, null, '${value.link}')">
              ${value.buttonText}
            </button>
          </div>
          </div>
        </div>`;
    }
    if(document.getElementById("promotions"))
    document.getElementById("promotions").innerHTML = str;
  };
}