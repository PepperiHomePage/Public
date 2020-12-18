customFunction.freeShipping=function(uuid,config,id){
  customFunction.freeShippingConfig=config
  pepperi.api.accounts.get({
     key: { UUID: uuid },
     fields: [config.field],
     responseCallback:"customFunction.freeShippingCallback",
     requestID:id
});
}

 

customFunction.freeShippingCallback=function(data){
        document.getElementById(data.requestID).innerHTML = `
      <div>
      <p>${customFunction.freeShippingConfig.text}${data.object[customFunction.freeShippingConfig.field]}</p>
    </div>` + (customFunction.freeShippingConfig.svg ? `<img src="${customFunction.freeShippingConfig.svg}" alt="Promotion truck icon">` : '')

    document.getElementById(data.requestID).classList.add("card", "sidebar-gap","dark-card")
    document.getElementById(data.requestID).style.display = "flex"
}