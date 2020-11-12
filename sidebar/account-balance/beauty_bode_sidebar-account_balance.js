customHomepage.accountBalance=function(uuid,config){
  customHomepage.accountBalance=config
  pepperi.api.accounts.get({
     key: { UUID: uuid },
     fields: [config.field],
     responseCallback:"customHomepage.accountBalanceCallBack"
});
}

 

customHomepage.accountBalanceCallBack=function(data){
  document.getElementById("account_balance").innerHTML = `                  
  <div>
  <p class="dimmed">${customHomepage.freeShippingConfig.text}</p>
  <p class="title-2-sm "><b id='balance'>${data.object[customHomepage.freeShippingConfig.field]}</b> ${data.object[customHomepage.freeShippingConfig.measure_unit]}</p>
  </div>` + (customHomepage.freeShippingConfig.svg ? `<img src="${customHomepage.freeShippingConfig.svg}" alt="Go to Account Balance icon">` : '')
  }

