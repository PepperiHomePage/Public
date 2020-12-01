customHeader.HeaderLeftMenu = function(LeftMenu){
    let htmlStr = '';
    for (const item of LeftMenu) {
        let classMenu = "link"
        let htmlTag = "a"
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          classMenu = "link"
          htmlTag = "a"
        }
        if (window.innerWidth <= 960){
          classMenu = "active"
          htmlTag = "li"
        }
        htmlStr += `<${htmlTag}  class="${classMenu}" onclick="${customFunction.handleAction(item, "customHeader")}">${item.title}</${htmlTag}>`;
      }
      if (document.getElementById('menuDropdown')) {
        document.getElementById('menuDropdown').innerHTML += `<ul class="shown-on-mobile">${htmlStr}</ul><hr class="shown-on-mobile">`;
      }
      if (document.getElementById('header_btn_bar')) {
        document.getElementById('header_btn_bar').innerHTML = htmlStr;
      }
      document.getElementById("userNameText").innerHTML = customHeader.context.userName
}

