
customFunction.drawImagesBlocks = function (id,ImagesBlock) {
  let imagesBlocks = "";
  for (const [idx1, value] of ImagesBlock.entries()) {
    if (value.BigImage)
      imagesBlocks += `
      <div class="brand big-brand" onclick="customFunction.setUUIDandNav(null,null,'${value.DeepLink.replace(/["']/g,"%22")}', 'customHomepage')"
      style="background-image: url(${value.ImageURL});">
  </div>`;
    else
      imagesBlocks += `
  <div class="brand" onclick="customFunction.setUUIDandNav(null,null,'${value.DeepLink.replace(/["']/g,"%22")}', 'customHomepage')"
  style="background-image: url(${value.ImageURL});">
</div>`;
  }
  if(document.getElementById(id))
  document.getElementById(id).innerHTML = imagesBlocks;
};
