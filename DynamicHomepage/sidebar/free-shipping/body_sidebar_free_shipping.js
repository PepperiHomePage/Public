customFunction.freeShipping = function (uuid, config, id) {
  customFunction.freeShippingConfig = config
  if (config.Field && config.Field != '') {
    pepperi.api.accounts.get({
      key: {
        UUID: uuid
      },
      fields: [config.Field],
      responseCallback: "customFunction.freeShippingCallback",
      requestID: id
    });
  } else {
    customFunction.freeShippingCallback(null, id)
  }

}
5


customFunction.freeShippingCallback = function (data, id) {
  if (data && data.success) {
    document.getElementById(data.requestID).innerHTML = `
      <div>
      <p>${customFunction.freeShippingConfig.Title}${data.object[customFunction.freeShippingConfig.Field]}</p>
    </div>` + (customFunction.freeShippingConfig.Icon ? `<img src="${customFunction.freeShippingConfig.Icon}" alt="Promotion truck icon">` : '')

    document.getElementById(data.requestID).classList.add("card", "sidebar-gap", "dark-card")
    document.getElementById(data.requestID).style.display = "flex"
  } else {
    document.getElementById(id).innerHTML = `
      <div>
      <p>${customFunction.freeShippingConfig.Title}</p>
    </div>` + (customFunction.freeShippingConfig.Icon ? `<img src="${customFunction.freeShippingConfig.Icon}" alt="Promotion truck icon">` : '')

    document.getElementById(id).classList.add("card", "sidebar-gap", "dark-card")
    document.getElementById(id).style.display = "flex"
  }
}