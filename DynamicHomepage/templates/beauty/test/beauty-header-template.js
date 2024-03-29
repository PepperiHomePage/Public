/* 
  this.startup - the first and the main function   
*/

var customConfigHeader = {};
(function () {
  this.context;
  this.accountUUID;
  this.transactionName;
  this.favIconURL = '';
  this.pageTitle = 'Beauty Demo';
  this.catalogName = "";
  this.transactionName = "";
  this.catalogs;
  // Url Update dynamic from storage () Change from git to storage links
  // this.jsFilePath = ""; // https://storage.pepperi.com/PreSales/beauty_demo/config_header_en.js 
  // this.cssFilePath = ""; // https://pepperihomepage.github.io/Public/beauty-header.css
  // this.helperJsonPath = ""; // https://pepperihomepage.github.io/Public/helper/header_helper.js // update
  // this.customHelperJsonPath = ""; // https://pepperihomepage.github.io/Public/helper/customFunction.js

  this.startup = async function (parentContext, storage) {
    await customConfigHeader.appendConfigFiles(storage);
    await customConfigHeader.buildHtml();
    await customConfigHeader.onPluginLoad(parentContext);
  };

  this.buildHtml = function () {
    var str =
      `
            <style>
                  </style>
        <header id="header-section" class="header header-wrapper" style="margin: 0 auto;">
            <div class="wrp">
              <div class="header-start"> 
                <img class="logo" onclick="customConfigHeader.navigation(\'HomePage\')" id="logo" src="" />                                     
                <div id="header_btn_bar" class="links hidden-on-mobile">      
                </div>
              </div>
              <div class="header-end" id="right_additional_menu">  
              </div>
       
            </div>
        </header>
        `;

    document.getElementById('custom_header_id').innerHTML = str;
  };

  this.initPlugin = function () {
    var options = {
      JsURLs: [],
      cssURLs: [],
      favIcon: this.favIconURL,
      pageTitle: this.pageTitle
    };

    return options;
  };

  this.onPluginLoad = function (context) {
    this.context = context;



    var data = JSON.parse(context.pluginData);
    console.log("context--------------", context)
    if (data) {
      this.transactionName = data.typeName || '';
      this.accountUUID = data.accountUUID || '';
      
    }

    let dynamicCulture=customConfigHeader.getSessionStorage('homepageLang') || context.culture
    let availableCultures=['en','ru','en-US']
    if(availableCultures.indexOf(dynamicCulture)==-1)
      dynamicCulture='en'
    customConfigHeader.dynamicallyLoadScript(dynamicCulture);
    
  };

  
    

   
customConfigHeader.dynamicallyLoadScript = function(selectedValue=false){
    if(!selectedValue){
    let selectBox = document.getElementById("selectBox");
    selectedValue = selectBox.options[selectBox.selectedIndex].value;
    console.log('selectedLang',selectedValue);}
     
    let url='https://storage.pepperi.com/tmp/config_header_'+selectedValue+'.js'
    customConfigHeader.setSessionStorage('homepageLang',selectedValue)
    console.log("url--------------", url);
    let script = document.createElement("script");
     
    script.onload=function(){
    customConfigHeader.getCatalogs("customConfigHeader");
    }
     
    script.src = url;
    script.onerror = function() {
    alert("Error loading " + this.src); // Error loading https://example.com/404.js
    };
    document.head.appendChild(script);
     
    }
  
  


  customConfigHeader.getSessionStorage = function (paramName) {
    return sessionStorage.getItem(paramName);
  };
  customConfigHeader.getCatalogs = function (x) {
    console.log(x)
    pepperi.api.catalogs.search({
        fields: ["UUID", "ExternalID", "Description", "ID"],
        responseCallback: "customConfigHeader.getCatalogsCallback",
    });
}
 customConfigHeader.getCatalogsCallback = function (res) {
    console.log("get catalog res", res);
    (res && res.objects && res.objects.length) ? this.catalogs = res.objects: false;
    customConfigHeader.buildHTML();
}

  this.buildHTML = function () {
    $("#logo").attr("src", customHeader.configFile.GeneralInfo.LogoURL);
    this.closeAllMenusListener();

    console.log(customHeader.configFile.RightMenu)
    customConfigHeader.RightMenu(customHeader.configFile.RightMenu);

    console.log(customHeader.configFile.LeftMenu)
    customConfigHeader.HeaderLeftMenu(customHeader.configFile.LeftMenu);

  }
  
  customConfigHeader.RightMenu = function(RightMenu){
    let dropdownMenuMob = ''
    let rightSideHtmlStr = ''
    
    for (const item of RightMenu) {
   
      rightSideHtmlStr += `<button class="button-weak hidden-on-web"onclick="${this.handleAction(item, "customConfigHeader")}">${item.Title}${item.Icon ? item.Icon : ''}</button>`;
      dropdownMenuMob += `<li class="active" onclick="${this.handleAction(item,"customConfigHeader")}"><p>${item.Title}</p></li>`
    }
  
    let rightAddMenu = `<div class="dropdown shown-on-web">
    <button class="button-weak button-icon" onclick="customConfigHeader.closeMenu()">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:24px !important;height:24px !important" viewBox="0 0 24 24">
            <path fill-rule="evenodd"
                d="M19,16 C19.5522847,16 20,16.4477153 20,17 C20,17.5522847 19.5522847,18 19,18 L5,18 C4.44771525,18 4,17.5522847 4,17 C4,16.4477153 4.44771525,16 5,16 L19,16 Z M19,11 C19.5522847,11 20,11.4477153 20,12 C20,12.5522847 19.5522847,13 19,13 L5,13 C4.44771525,13 4,12.5522847 4,12 C4,11.4477153 4.44771525,11 5,11 L19,11 Z M19,6 C19.5522847,6 20,6.44771525 20,7 C20,7.55228475 19.5522847,8 19,8 L5,8 C4.44771525,8 4,7.55228475 4,7 C4,6.44771525 4.44771525,6 5,6 L19,6 Z" />
        </svg>
    </button>
    <div class="dropdown-content-end" id="menuDropdown">
    </div>
</div>
<div class="dropdown">
    <button class="button-weak button-icon" onclick="customConfigHeader.closeHamburgerMenu()">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:24px !important;height:24px !important" viewBox="0 0 24 24">
            <path fill-rule="evenodd"
                d="M5.87300934,20 C5.31672677,18.8352719 5,17.5623379 5,16.3333333 C5,13.9259827 6.21522434,12.2548428 8.06569509,11.3364984 C7.70530908,10.3928205 7.5,9.36966701 7.5,8.4 C7.5,5.36243388 9.51471863,4 12,4 C14.4852814,4 16.5,5.36243388 16.5,8.4 C16.5,9.36966701 16.2946909,10.3928205 15.9343049,11.3364984 C17.7847757,12.2548428 19,13.9259827 19,16.3333333 C19,17.5623379 18.6832732,18.8352719 18.1269907,20 C17.7963837,20 17.3817618,20 16.883125,20 C15.7220834,20 15.7220834,19.3712729 15.8841722,19.0335104 C16.2755898,18.2178696 16.5,17.329449 16.5,16.5 C16.5,15.0183086 15.7838916,14.0593118 14.6788931,13.5264125 C13.9304475,14.4190907 13.00359,15 12,15 C10.99641,15 10.0695525,14.4190907 9.32110687,13.5264125 C8.21610842,14.0593118 7.5,15.0183086 7.5,16.5 C7.5,17.3265901 7.72286593,18.211746 8.11178644,19.0250739 C8.2747433,19.3658565 8.2747433,20 7.14578125,20 C6.64072083,20 6.21646352,20 5.87300934,20 Z M12,12.5 C13.1045695,12.5 14,10.2997114 14,8.64285714 C14,6.98600289 13.1045695,6.5 12,6.5 C10.8954305,6.5 10,6.98600289 10,8.64285714 C10,10.2997114 10.8954305,12.5 12,12.5 Z" />
        </svg>
      </button>
    <div class="dropdown-content-end" id="myDropdown">
        <ul>
            <li id='userName1'>
                <span class="dimmed" id="userNameText">User Name</span>
            </li>
            <hr>
            <li class="active" onclick="customConfigHeader.changePassword()">
                <span><svg xmlns="http://www.w3.org/2000/svg" style="width:24px !important;height:24px !important" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M21,20 C21.5522847,20 22,20.4477153 22,21 C22,21.5522847 21.5522847,22 21,22 L3,22 C2.44771525,22 2,21.5522847 2,21 C2,20.4477153 2.44771525,20 3,20 L21,20 Z M14.2071068,2.79289322 L18.2071068,6.79289322 C18.5976311,7.18341751 18.5976311,7.81658249 18.2071068,8.20710678 L9.70710678,16.7071068 C9.59733192,16.8168816 9.4635062,16.8995905 9.31622777,16.9486833 L3.31622777,18.9486833 C2.53446974,19.2092693 1.79073069,18.4655303 2.0513167,17.6837722 L4.0513167,11.6837722 C4.10040951,11.5364938 4.18311836,11.4026681 4.29289322,11.2928932 L12.7928932,2.79289322 C13.1834175,2.40236893 13.8165825,2.40236893 14.2071068,2.79289322 Z M10.9992709,7.414 L5.87403205,12.5401815 L4.58113883,16.4188612 L8.45981849,15.125968 L13.5852709,10 L10.9992709,7.414 Z M13.5,4.91421356 L12.4142709,6 L14.9992709,8.585 L16.0857864,7.5 L13.5,4.91421356 Z" />
                </svg>
                Change Password</span> 
            </li>
            <li class="active" onclick="customConfigHeader.logout();">
            <span><svg xmlns="http://www.w3.org/2000/svg" style="width:24px !important;height:24px !important" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M19,16.7002538 C19,17.4906313 18.534533,18.2068742 17.8122769,18.5278769 L10.7030692,21.6875248 C10.4507271,21.7996768 10.1552463,21.6860303 10.0430942,21.4336882 C10.0146811,21.3697587 10,21.3005782 10,21.230619 L10,10.2997462 C10,9.50936875 10.465467,8.79312576 11.1877231,8.47212308 L16.767,5.992 L7,5.95898437 L7,17 C7,17.5522847 6.55228475,18 6,18 C5.44771525,18 5,17.5522847 5,17 L5,5 C5,4.44771525 5.44771525,4 6,4 L18,4 C18.5522847,4 19,4.44771525 19,5 L19,16.7002538 Z" />
                </svg>
                Logout</span>
            </li>
        </ul>
    </div>
</div>

`;


let langSelect = `<div class="lang-change" style=" display:none">
<select id="selectBox" onchange="customConfigHeader.dynamicallyLoadScript();customConfigHeader.dynamicallyLoadScript();"> 
<option value="en" style="display:none">En</option>
<option value="en" >En</option>
<option value="ru">Ru</option>
  
</select>
</div>`  ;
    document.getElementById('right_additional_menu').innerHTML = rightSideHtmlStr + rightAddMenu + langSelect;
    if (document.getElementById('menuDropdown')) {
      document.getElementById('menuDropdown').innerHTML += `<ul>${dropdownMenuMob}</ul>`;
    }

}

customConfigHeader.HeaderLeftMenu = function(LeftMenu){
  let htmlStr = '';
  for (const item of LeftMenu) {
      let classMenu = "link"
      let htmlTag = "a"
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        classMenu = "link"
        htmlTag = "a"
      }
      if (window.innerWidth <= 960){
        classMenu = "active"
        htmlTag = "li"
      }
      htmlStr += `<${htmlTag}  class="${classMenu}" onclick="${customConfigHeader.handleAction(item, "customConfigHeader")}">${item.Title}</${htmlTag}>`;
    }
    if (document.getElementById('menuDropdown')) {
      document.getElementById('menuDropdown').innerHTML += `<ul class="shown-on-mobile">${htmlStr}</ul><hr class="shown-on-mobile">`;
    }
    if (document.getElementById('header_btn_bar')) {
      document.getElementById('header_btn_bar').innerHTML = htmlStr;
    }
    document.getElementById("userNameText").innerHTML = customConfigHeader.context.userName
}


this.closeAllMenusListener = function () {
    $('#select-menu').attr('tabindex', '-1');
    $('#select-menu').on('focusout', function () {
      $('#select-menu').removeClass('show');
    });

    $('#menuDropdown').attr('tabindex', '-1');
    $('#linksDropdown').attr('tabindex', '-1');
    $('#myDropdown').attr('tabindex', '-1');
  
    $('#menuDropdown').on('focusout', function () {
      $('#menuDropdown').removeClass('show');
    });
    $('#menuDropdown').removeClass('show');
  
    $('#linksDropdown').on('focusout', function () {
      $('#linksDropdown').removeClass('show');
    });
  
    $('#myDropdown').on('focusout', function () {
      $('#myDropdown').removeClass('show');
    });
  };

  this.handleAction = function (item, nameOfMainJs) {
    var deepLink = item.DeepLink.replace(/\"/g, '%22');
    switch (item.Action) {
      case 'navigation':
        return `customConfigHeader.navigation('${deepLink}')`;
      case 'setUUIDandNav':
        return `customConfigHeader.setUUIDandNav('${item.Catalog}','${item.Transaction}','${deepLink}', '${nameOfMainJs}')`;
      case 'openInNewTab':
        return `customConfigHeader.openInNewTab('${deepLink}')`;
      case 'createNewActivity':
        return `customConfigHeader.createNewActivity('${item.Activity}','${deepLink}', '${nameOfMainJs}')`;
      case 'createNewTransaction':
        return `customConfigHeader.createNewOrder('${item.Catalog}','${item.Transaction}','${deepLink}',true, '${nameOfMainJs}')`;
      case 'zendesk':
        return `location.href = 'javascript:$zopim.livechat.window.show()'`
    }
  }

  customConfigHeader.navigation = function (path) {
    this.closeAllMenusListener();
    var eventData = {
      detail: {
        path: path,
      },
    };
  
    var event = new CustomEvent("navigateTo", eventData);
  
    if (document.createEvent) {
      window.dispatchEvent(event);
    } else {
      window.fireEvent("on" + event.eventType, event);
    }
  };
  
  customConfigHeader.setUUIDandNav = function (in_catalog = null, in_transactionName = null, deepLink = null, nameOfMainJs) {
    this.closeAllMenusListener();
    var name = eval("(" + nameOfMainJs + ")")  
    const uuid = name.getSessionStorage('LastOpenTransactionUUID');
    console.log("uuid --->",uuid);
    if (uuid && uuid !== "undefined") {
      deepLink =   deepLink.replace('{{UUID}}', uuid.replace(/-/g, ''));
      this.navigation(deepLink);
    } else {
      this.createNewOrder(in_catalog, in_transactionName, deepLink, false ,nameOfMainJs);
    }
  };
  
  customConfigHeader.openInNewTab = function (url) {
    var win = window.open(url, '_blank');
    win.focus();
  };
  
  customConfigHeader.createNewOrder = function (inCatalog = null, in_transactionName = null, deepLink = null, skipSessionSaving,nameOfMainJs) {
    var name = eval("(" + nameOfMainJs + ")") 
    let catalogUUID = !inCatalog ? customConfigHeader.catalogs.find((el) => el.ExternalID === name.catalogName).UUID : customConfigHeader.catalogs.find((el) => el.ExternalID === inCatalog).UUID
    var bridgeObject = {
      references: {
        account: {
          UUID: name.accountUUID
        },
        catalog: {
          UUID: catalogUUID
        }
      },
      type: {
        Name: !in_transactionName ? name.transactionName : in_transactionName
      },
      responseCallback: skipSessionSaving ? "customConfigHeader.createNewOrderCallback" : "customConfigHeader.createNewOrderAndNavCallback",
      requestID: deepLink
    };
    pepperi.app.transactions.add(bridgeObject);
  };
  
  customConfigHeader.createNewOrderAndNavCallback = function (res) {
    console.log('createNewOrderAndNavCallback res', res);
    if (res && res.success) {
      this.setSessionStorage('LastOpenTransactionUUID', res.id);
      let uuid = res.id;
      if (res.requestID) {
        var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
        this.navigation(requestID);
      }
    }
  };
  customConfigHeader.createNewOrderCallback = function (res) {
    console.log('createNewOrderCallback res', res);
    if (res && res.success) {
      let uuid = res.id;
      if (res.requestID) {
        var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
        this.navigation(requestID);
      }
    }
  };
  customConfigHeader.getAccountStatus = function () {
    var bridgeObject = {
      fields: ['Name', 'UUID'],
      sorting: [],
      responseCallback: 'customConfigHeader.getCurrentAccountCallback'
    };
    pepperi.api.accounts.search(bridgeObject);
  };
  customConfigHeader.getCurrentAccountCallback = function (res) {
    if (res && res.success && res.objects && res.objects.length)
      customConfigHeader.accountUUID = res.objects[0].UUID;
      
  }
  
  
  
  customConfigHeader.logout = function () {
    var event = new CustomEvent('logout');
    if (document.createEvent) {
      window.dispatchEvent(event);
    } else {
      window.fireEvent('on' + event.eventType, event);
    }
  };
  
  customConfigHeader.changePassword = function () {
    window.location.href = 'https://idp.pepperi.com/Account/ChangePassword';
  };    
  
  customConfigHeader.setSessionStorage = function (paramName, data) {
    sessionStorage.setItem(paramName, data);
  };

  
  customConfigHeader.closeHamburgerMenu = function () {
    $('#myDropdown').toggleClass('show').focus()
  }
  customConfigHeader.closeMenu = function () {
    $('#menuDropdown').toggleClass('show').focus();
  }
  
  customConfigHeader.linksMenu = function () {
    $('#linksDropdown').toggleClass('show').focus()
  }

  customConfigHeader.appendConfigFiles = async function (storage) {
    return await new Promise((resolve) => {
      var uploadedFiles = 0;
      var filePaths = customHeader.appendFilePaths;

      var filteredStorage = storage.filter(({Title}) => {
        var splittedTitle = Title.split("/");
        Title = splittedTitle[splittedTitle.length - 1]
        return filePaths.includes(Title)
      })

      filteredStorage.forEach(el => {
        var file = '';
        if (el["URL"].includes('.js')) {
          file = document.createElement("script");
          file.src = el["URL"];
        } else if (el["URL"].includes('.css')) {
          file = document.createElement("link");
          file.rel = "stylesheet";
          file.type = "text/css"
          file.href = el["URL"];
        }
        document.getElementsByTagName("head")[0].appendChild(file);

        file.onload = function () {
          uploadedFiles++;
          if (uploadedFiles == filePaths.length) {
            resolve(uploadedFiles)
          }
        };
      })
    })
  }

}.apply(customConfigHeader));