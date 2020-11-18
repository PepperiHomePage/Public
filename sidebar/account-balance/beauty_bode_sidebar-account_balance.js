customHomepage.accountBalance=function(uuid,config){
  customHomepage.accountBalanceConfig=config
  pepperi.api.accounts.get({
     key: { UUID: uuid },
     fields: [config.field],
     responseCallback:"customHomepage.accountBalanceCallBack"
});
}

 

customHomepage.accountBalanceCallBack=function(data){
  document.getElementById("account_balance").innerHTML = `                  
  <div>
  <p class="dimmed">${customHomepage.accountBalanceConfig.text}</p>
  <p class="title-2-sm "><b id='balance'>${data.object[customHomepage.accountBalanceConfig.field]}</b> ${data.object[customHomepage.accountBalanceConfig.measure_unit]}</p>
  </div>` + (customHomepage.accountBalanceConfig.svg ? `<img src="${customHomepage.accountBalanceConfig.svg}" alt="Go to Account Balance icon">` : '')
  document.getElementById("account_balance").classList.add("card", "sidebar-gap")  
}

