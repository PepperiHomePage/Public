
customHomepage.drawImagesBlocks = function (id,ImagesBlock) {
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
  if(document.getElementById(id))
  document.getElementById(id).innerHTML = imagesBlocks;
};
