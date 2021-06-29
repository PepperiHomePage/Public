customFunction.accountBalance=function(uuid,config,id){
  console.log("config ---> ",config);
  if (config.field && config.field != '') {
  customFunction.accountBalanceConfig=config
  pepperi.api.accounts.get({
     key: { UUID: uuid },
     fields: [config.field],
     responseCallback:"customFunction.accountBalanceCallBack",
     requestID:id
});
  }else{
    customFunction.accountBalanceCallBack(null, id)
  }
}

 

customFunction.accountBalanceCallBack=function(data, id){
  if (data) {
  console.log("data ---> ",data);
  document.getElementById(data.requestID).innerHTML = `                  
  <div>
  <p class="dimmed">${customFunction.accountBalanceConfig.text}</p>
  <p class="title-2-sm "><b id='balance'>${data.object[customFunction.accountBalanceConfig.field]}</b> ${customFunction.accountBalanceConfig.measure_unit}</p>
  </div>` + (customFunction.accountBalanceConfig.svg ? `<img src="${customFunction.accountBalanceConfig.svg}" alt="Go to Account Balance icon">` : '')
  document.getElementById(data.requestID).classList.add("card", "sidebar-gap")  
  document.getElementById(data.requestID).style.display = "flex"
  }else{
    document.getElementById(data.requestID).innerHTML = `                  
  <div>
  <p class="dimmed">${customFunction.accountBalanceConfig.text}</p>
  <p class="title-2-sm "> ${customFunction.accountBalanceConfig.measure_unit}</p>
  </div>` + (customFunction.accountBalanceConfig.svg ? `<img src="${customFunction.accountBalanceConfig.svg}" alt="Go to Account Balance icon">` : '')
  document.getElementById(id).classList.add("card", "sidebar-gap")  
  document.getElementById(id).style.display = "flex"
  }
}

