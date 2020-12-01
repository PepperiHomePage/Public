customHeader.RightMenu = function(RightMenu){
    let dropdownMenuMob = ''
    let rightSideHtmlStr = ''
    for (const item of RightMenu) {
      rightSideHtmlStr += `<button class="button-weak hidden-on-web"onclick="${customHeader.handleAction(item)}">${item.title}${item.icon ? item.icon : ''}</button>`;
      dropdownMenuMob += `<li class="active" onclick="${customHeader.handleAction(item)}"><p>${item.title}</p></li>`
    }
    document.getElementById('right_additional_menu').innerHTML = rightSideHtmlStr;
    if (document.getElementById('menuDropdown')) {
      document.getElementById('menuDropdown').innerHTML += `<ul>${dropdownMenuMob}</ul>`;
    }

}