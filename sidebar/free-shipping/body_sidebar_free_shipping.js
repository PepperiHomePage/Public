customFunction.freeShipping = function (uuid, config, id) {
  customFunction.freeShippingConfig = config
  if (config.field && config.field != '') {
    pepperi.api.accounts.get({
      key: {
        UUID: uuid
      },
      fields: [config.field],
      responseCallback: "customFunction.freeShippingCallback",
      requestID: id
    });
  } else {
    customFunction.freeShippingCallback(null, id)
  }

}



customFunction.freeShippingCallback = function (data, id) {
  if (data) {
    document.getElementById(data.requestID).innerHTML = `
      <div>
      <p>${customFunction.freeShippingConfig.text}${data.object[customFunction.freeShippingConfig.field]}</p>
    </div>` + (customFunction.freeShippingConfig.svg ? `<img src="${customFunction.freeShippingConfig.svg}" alt="Promotion truck icon">` : '')

    document.getElementById(data.requestID).classList.add("card", "sidebar-gap", "dark-card")
    document.getElementById(data.requestID).style.display = "flex"
  } else {
    document.getElementById(id).innerHTML = `
      <div>
      <p>${customFunction.freeShippingConfig.text}</p>
    </div>` + (customFunction.freeShippingConfig.svg ? `<img src="${customFunction.freeShippingConfig.svg}" alt="Promotion truck icon">` : '')

    document.getElementById(id).classList.add("card", "sidebar-gap", "dark-card")
    document.getElementById(id).style.display = "flex"
  }
}