customFunction.buildSidebarPopup = function (slideid) {
  var popupHTML = "";

  popupHTML += `<div id="overlay1"></div>
                <div id="content" onclick="customHomepage.togglePopup()">                          
                  <h1>Success!</h1>
                  <hr>
                  <p id="modal-text">Items from selected list were succesfully added to the cart!</p>
                  <hr>                            
                </div>`;

  document.getElementById(slideid).innerHTML = popupHTML;
};