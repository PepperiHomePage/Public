customHomepage.freeShipping=function(uuid,config,id){
  customHomepage.freeShippingConfig=config
  pepperi.api.accounts.get({
     key: { UUID: uuid },
     fields: [config.field],
     responseCallback:"customHomepage.freeShippingCallback",
     requestID:id
});
}

 

customHomepage.freeShippingCallback=function(data){
        document.getElementById(data.requestID).innerHTML = `
      <div>
      <p>${customHomepage.freeShippingConfig.text}${data.object[customHomepage.freeShippingConfig.field]}</p>
    </div>` + (customHomepage.freeShippingConfig.svg ? `<img src="${customHomepage.freeShippingConfig.svg}" alt="Promotion truck icon">` : '')

    document.getElementById(data.requestID).classList.add("card", "sidebar-gap","dark-card")
    document.getElementById(data.requestID).style.display = "flex"
}