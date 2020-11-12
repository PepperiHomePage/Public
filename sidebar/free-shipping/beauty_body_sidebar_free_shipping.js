customHomepage.freeShipping=function(uuid,config){
  customHomepage.freeShippingConfig=config
  pepperi.api.accounts.get({
     key: { UUID: uuid },
     fields: [config.field],
     responseCallback:"customHomepage.freeShippingCallback"
});
}

 

customHomepage.freeShippingCallback=function(data){
        document.getElementById("free_shipping").innerHTML = `
      <div>
      <p>${customHomepage.freeShippingConfig.text}${data.object[customHomepage.freeShippingConfig.field]}</p>
    </div>` + (customHomepage.freeShippingConfig.svg ? `<img src="${customHomepage.freeShippingConfig.svg}" alt="Promotion truck icon">` : '')
}