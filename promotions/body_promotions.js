customFunction.drawPromotions = function (id, Promotions) {
  let str = "";
  
  for (const [idx1, value] of Promotions.entries()) {
    if(value.newsite){
      str += `
      <div class="promotion kits" style="background-image:url('${value.image}')">
      <div class="gard-overlay" style="${(!value.title || value.title == '') ? 'background:none' : ''}" onclick="${(!value.buttonText|| value.buttonText== '') ? 'customFunction.openInNewTab(\''+value.link+'\')' : ''}">
        <h2 class="title-4-lg">${value.title}</h2>
        <div>
          <button class="comonBtn custom-btn" style="${(!value.buttonText|| value.buttonText== '') ? 'display:none' : ''}"
            onclick="customFunction.setUUIDandNav(null, null, '${value.link}', 'customHomepage')">
            ${value.buttonText}
          </button>
        </div>
        </div>
      </div>`;
    }else{
      str += `
        <div class="promotion kits" style="background-image:url('${value.image}')">
        <div class="gard-overlay" style="${(!value.title || value.title == '') ? 'background:none' : ''}" onclick="${(!value.buttonText|| value.buttonText== '') ? 'customFunction.setUUIDandNav(null, null, \''+value.link+'\', \'customHomepage\')' : ''}">
          <h2 class="title-4-lg">${value.title}</h2>
          <div>
            <button class="comonBtn custom-btn" style="${(!value.buttonText|| value.buttonText== '') ? 'display:none' : ''}"
              onclick="customFunction.setUUIDandNav(null, null, '${value.link}', 'customHomepage')">
              ${value.buttonText}
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