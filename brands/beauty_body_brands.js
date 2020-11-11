
this.cssFilePath = "https://github.com/PepperiHomePage/Public/blob/Burrypony-test/brands/beauty_body_brands.css";
this.brands = function (Brands) {
  this.initPlugin = function () {
    var options = {
      cssURLs: [this.cssFilePath],
    };
    return options;
  };
  this.drawImagesBlocks(Brands);
  this.drawImagesBlocks = function (ImagesBlock) {
    let imagesBlocks = "";
    for (const [idx1, value] of ImagesBlock.entries()) {
      if (value.bigImage)
        imagesBlocks += `
        <div class="brand big-brand" onclick="customHomepage.setUUIDandNav(null,null,'${value.link}')"
        style="background-image: url(${value.img});">
    </div>`;
      else
        imagesBlocks += `
    <div class="brand" onclick="customHomepage.setUUIDandNav(null,null,'${value.link}')"
    style="background-image: url(${value.img});">
</div>`;
    }
    if(document.getElementById("brands"))
    document.getElementById("brands").innerHTML = imagesBlocks;
  };

}