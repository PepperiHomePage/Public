customHomepage.openStoreSelect = function () {
    document.getElementById('select-menu').classList.toggle('show')
  }
  customHomepage.openCloseMenu = function () {
    const over = document.getElementById("overSide");
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
  customHomepage.closeAllMenusListener = function () {
    $('#select-menu').attr('tabindex', '-1');
    $('#select-menu').on('focusout', function () {
      $('#select-menu').removeClass('show');
    });
  };