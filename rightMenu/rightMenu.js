customHeader.RightMenu = function(RightMenu){
    let dropdownMenuMob = ''
    let rightSideHtmlStr = ''
    for (const item of RightMenu) {
      rightSideHtmlStr += `<button class="button-weak hidden-on-web"onclick="${customHeader.handleAction(item)}">${item.title}${item.icon ? item.icon : ''}</button>`;
      dropdownMenuMob += `<li class="active" onclick="${customHeader.handleAction(item)}"><p>${item.title}</p></li>`
    }
    let rightAddMenu = document.getElementById('right_additional_menu').innerHTML;
    document.getElementById('right_additional_menu').innerHTML = rightSideHtmlStr + rightAddMenu;
    if (document.getElementById('menuDropdown')) {
      document.getElementById('menuDropdown').innerHTML += `<ul>${dropdownMenuMob}</ul>`;
    }

}