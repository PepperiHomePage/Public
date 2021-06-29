customFunction.accountBalance=function(uuid,config,id){
  console.log("config ---> ",config);
  if (config.Field && config.Field != '') {
  customFunction.accountBalanceConfig=config
  pepperi.api.accounts.get({
     key: { UUID: uuid },
     fields: [config.Field],
     responseCallback:"customFunction.accountBalanceCallBack",
     requestID:id
});
  }else{
    customFunction.accountBalanceCallBack(null, id)
  }
}

 

customFunction.accountBalanceCallBack=function(data, id){
  if (data && data.success) {
  console.log("data ---> ",data);
  document.getElementById(data.requestID).innerHTML = `                  
  <div>
  <p class="dimmed">${customFunction.accountBalanceConfig.Title}</p>
  <p class="title-2-sm "><b id='balance'>${data.object[customFunction.accountBalanceConfig.Field]}</b> ${customFunction.accountBalanceConfig.MeasureUnit}</p>
  </div>` + (customFunction.accountBalanceConfig.Icon ? `<img src="${customFunction.accountBalanceConfig.Icon}" alt="Go to Account Balance icon">` : '')
  document.getElementById(data.requestID).classList.add("card", "sidebar-gap")  
  document.getElementById(data.requestID).style.display = "flex"
  }else{
    document.getElementById(data.requestID).innerHTML = `                  
  <div>
  <p class="dimmed">${customFunction.accountBalanceConfig.Title}</p>
  <p class="title-2-sm "> ${customFunction.accountBalanceConfig.MeasureUnit}</p>
  </div>` + (customFunction.accountBalanceConfig.Icon ? `<img src="${customFunction.accountBalanceConfig.Icon}" alt="Go to Account Balance icon">` : '')
  document.getElementById(id).classList.add("card", "sidebar-gap")  
  document.getElementById(id).style.display = "flex"
  }
}

