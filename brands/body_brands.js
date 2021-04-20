
customFunction.drawImagesBlocks = function (id,ImagesBlock) {
  let imagesBlocks = "";
  for (const [idx1, value] of ImagesBlock.entries()) {
    if (value.bigImage)
      imagesBlocks += `
      <div class="brand big-brand" onclick="customFunction.setUUIDandNav(null,null,'${value.link.replace(/["']/g,"%22")}', 'customHomepage')"
      style="background-image: url(${value.img});">
  </div>`;
    else
      imagesBlocks += `
  <div class="brand" onclick="customFunction.setUUIDandNav(null,null,'${value.link.replace(/["']/g,"%22")}', 'customHomepage')"
  style="background-image: url(${value.img});">
</div>`;
  }
  if(document.getElementById(id))
  document.getElementById(id).innerHTML = imagesBlocks;
};
