customFunction.openStoreSelect = function () {
    document.getElementById('select-menu').classList.toggle('show')
  }
  customFunction.openCloseMenu = function () {
    const over = document.getElementById("overlay");
    const e = document.getElementById("sidebar-sm");
    const btn = document.getElementById("btn");
    if (e.style.display == "block") {
      e.style.display = "none";
      over.style.display = "none";
      btn.innerText = "Open Menu";
    } else {
      over.style.display = "block";
      e.style.display = "block";
      btn.innerText = "Close Menu";
      $('#sidebar-sm').attr('tabindex', '-1');
      $('#sidebar-sm').focus()
    }
  };