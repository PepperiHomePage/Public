customFunction.drawPromotions = function (id, Promotions) {
  let str = "";
  
  for (const [idx1, value] of Promotions.entries()) {
    if(value.NewSite){
      str += `
      <div class="promotion kits" style="background-image:url('${value.ImageURL}')">
      <div class="gard-overlay" style="${(!value.Title || value.Title == '') ? 'background:none' : ''}" onclick="${(!value.ButtonText|| value.ButtonText== '') ? 'customFunction.openInNewTab(\''+value.DeepLink+'\')' : ''}">
        <h2 class="title-4-lg">${value.Title}</h2>
        <div>
          <button class="comonBtn custom-btn" style="${(!value.ButtonText|| value.ButtonText== '') ? 'display:none' : ''}"
            onclick="customFunction.setUUIDandNav(null, null, '${value.DeepLink}', 'customHomepage')">
            ${value.ButtonText}
          </button>
        </div>
        </div>
      </div>`;
    }else{
      str += `
        <div class="promotion kits" style="background-image:url('${value.ImageURL}')">
        <div class="gard-overlay" style="${(!value.Title || value.Title == '') ? 'background:none' : ''}" onclick="${(!value.ButtonText|| value.ButtonText== '') ? 'customFunction.setUUIDandNav(null, null, \''+value.DeepLink+'\', \'customHomepage\')' : ''}">
          <h2 class="title-4-lg">${value.Title}</h2>
          <div>
            <button class="comonBtn custom-btn" style="${(!value.ButtonText|| value.ButtonText== '') ? 'display:none' : ''}"
              onclick="customFunction.setUUIDandNav(null, null, '${value.DeepLink}', 'customHomepage')">
              ${value.ButtonText}
            </button>
          </div>
          </div>
        </div>`;
    }
  }
  if (document.getElementById(id))
    document.getElementById(id).innerHTML = str;
  document.getElementById(id).classList.add("promotions")  
};