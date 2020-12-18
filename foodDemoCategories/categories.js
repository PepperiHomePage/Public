customFunction.buildCategories = function (slideid) {
  var categoriesImgHTML = "";
  categoriesImgHTML += `
          <div class="box box1">
                <div class="item1"
                onclick="customHomepage.setUUIDandNav('${left_top_img_left.deepLink}')"
                style="background-image: url(${left_top_img_left.image});">
                    <div class="overlay">${left_top_img_left.title}</div>
                </div>
                <div class="item2"
                onclick="customHomepage.setUUIDandNav('${left_top_img_right.deepLink}')"
                style="background-image: url(${left_top_img_right.image});">
                    <div class="overlay">${left_top_img_right.title}</div>
                </div>
                <div class="item3"
                onclick="customHomepage.setUUIDandNav('${left_bottom_img.deepLink}')"
                style="background-image: url(${left_bottom_img.image});">
                    <div class="overlay">${left_bottom_img.title}</div>
                </div>
              </div>
              <div class="box box2">
                 <div class="item4" 
                 onclick="customHomepage.setUUIDandNav('${midle_top_left_img.deepLink}')"
                 style="background-image: url(${midle_top_left_img.image});">
                     <div class="overlay">${midle_top_left_img.title}</div>
                 </div>
                 <div class="item5"
                 onclick="customHomepage.setUUIDandNav('${midle_bottom_left_img.deepLink}')"
                  style="background-image: url(${midle_bottom_left_img.image});">
                   <div class="overlay">${midle_bottom_left_img.title}</div> 
                 </div>
                  <div class="item6"
                  onclick="customHomepage.setUUIDandNav('${midle_right_img.deepLink}')"
                  style="background-image: url(${midle_right_img.image});">
                  <div class="overlay">${midle_right_img.title}</div>
                  </div>
              </div>
  
              <div class="box3">
                  <div class="item7"
                  onclick="customHomepage.setUUIDandNav('${right_top_img.deepLink}')"
                  style="background-image: url(${right_top_img.image});">
                      <div class="overlay">${right_top_img.title}</div>
                  </div>
                  <div class="item8"
                  onclick="customHomepage.setUUIDandNav('${right_bottom_img.deepLink}')"
                  style="background-image: url(${right_bottom_img.image});">
                       <div class="overlay">${right_bottom_img.title}</div>
                  </div>
              </div>
          `;
  document.getElementById(slideid).innerHTML = categoriesImgHTML;
};