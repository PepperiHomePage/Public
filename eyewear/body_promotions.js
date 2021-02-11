
  customFunction.drawPromotions = function (Promotions) {
    let str = "";
    for (const [idx1, value] of Promotions.entries()) {
      str += `
      <a class="promo__item" onclick="customHomepage.setUUIDandNav(null, null, '${value.deepLink}')"
      style="background-image: url('${value.image}');">
      <div class="promo__content">
          <h3 class="promo__title">${value.title}</h3>
      </div>
  </a>`;
    }
    if(document.getElementById("promotions"))
    document.getElementById("promotions").innerHTML = str;
  };