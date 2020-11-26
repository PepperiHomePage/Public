customHomepage.accountBalance=function(uuid,config,id){
  console.log("config ---> ",config);
  customHomepage.accountBalanceConfig=config
  pepperi.api.accounts.get({
     key: { UUID: uuid },
     fields: [config.field],
     responseCallback:"customHomepage.accountBalanceCallBack",
     requestID:id
});
}

 

customHomepage.accountBalanceCallBack=function(data){
  console.log("data ---> ",data);
  document.getElementById(data.requestID).innerHTML = `                  
  <div>
  <p class="dimmed">${customHomepage.accountBalanceConfig.text}</p>
  <p class="title-2-sm "><b id='balance'>${data.object[customHomepage.accountBalanceConfig.field]}</b> ${customHomepage.accountBalanceConfig.measure_unit}</p>
  </div>` + (customHomepage.accountBalanceConfig.svg ? `<img src="${customHomepage.accountBalanceConfig.svg}" alt="Go to Account Balance icon">` : '')
  document.getElementById(data.requestID).classList.add("card", "sidebar-gap")  
  document.getElementById(data.requestID).style.display = "flex"
}

