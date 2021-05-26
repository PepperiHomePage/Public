/**********************************************************************************************/
//                                  Pepperi plugin interface
/**********************************************************************************************/
//  1. The namespace of the header must be "customHeader".
//  3. The header must implement those functions:
//     * initPlugin - This method is to get the option object with the declared interface:
//          - JsURLs: the path of the script files.
//          - cssURLs: the path of the css files.
//          - more...
//     * onPluginLoad(context) - This method is called when the plugin is ready for use (external files are loaded).
//          - params: context object .
//     * navigateTo - (Optional) The event for the navigation the data need to be like this:
//          - detail: {
//              path: 'HomePage' - (the path is the url that you want).
//          }
//     * logout - (Optional) The event for the logout the name of the event have to be 'logout':
//     * favIconURL - this parameter should contain url of the favicon. if it will be empty string or null the user will get pepperi default favicon.
//     * pageTitle - this parameter should contains the string ot the page title. if it will be empty string or null the user will see pepperi default title - "Pepperi".
//      *Changed background image and logout URL 6.14.19 DZ
/**********************************************************************************************/
var customHeader = {};
(function () {
  this.context;
  this.accountUUID;
  this.transactionName;
  this.favIconURL = '';
  this.pageTitle = 'OGI';
  this.catalogName = "";
  this.transactionName = "";
  this.catalogs;
  this.jsFilePath = 'https://pepperihomepage.github.io/Public/OGI/config_header.js'
  this.helperJsonPath = 'https://pepperihomepage.github.io/Public/helper/header_helper.js'
  this.leftMenuJsonPath = 'https://pepperihomepage.github.io/Public/leftMenu/leftMenu.js'
  this.customHelperJsonPath = 'https://pepperihomepage.github.io/Public/helper/customFunction.js'
  this.cssFilePath = "https://pepperihomepage.github.io/Public/beauty-header.css";

  this.setHtml = function () {
    var str =
      `
            <style>
            .dropdown-content-fit {
              min-width: unset;
              left: 0;
              right: 0;
            }
            .show{
              display: flex !important;
              flex-direction: column !important;
              padding: 38px 42px !important;
           }
            [class*="dropdown-content"] {
              max-width: 219px;
              background: rgb(255, 255, 255);
              border-radius: 4px;
              box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08),
              0px 0px 8px 0px rgba(0, 0, 0, 0.08),
              0px 0px 16px 0px rgba(0, 0, 0, 0.08),
              0px 12px 24px 0px rgba(0, 0, 0, 0.12),
              0px 24px 48px 0px rgba(0, 0, 0, 0.08),
              0px 32px 64px 0px rgba(0, 0, 0, 0.06);
              height: 224px;
              width: 219px;
              overflow:hidden;
            }
            [class*="dropdown-content"] li{
              font-size: 14px !important;
              font-weight: normal !important;
              letter-spacing: 0.12px !important;
              line-height: 20px !important;
              text-align: center;
              padding: 0 !important;
              color: rgb(26, 26, 26);

            }

            #menuDropdown{
              left:0 !important;
              height: fit-content !important;
              width: 288px !important;
            }

            [class*="dropdown-content"] li:hover{
              color: rgb(23, 102, 166);
            }
            </style>
        <header id="header-section" class="header header-wrapper" style="margin: 0 auto;">
            <div class="dropdown-content-end" id="menuDropdown">
            </div>
            <div class="wrp">
              <div class="header-start"> 
                <img class="logo" onclick="customFunction.navigation(\'HomePage\')" id="logo" src="" />
                <div  class="links hidden-on-mobile" onclick="customHeader.openDropDown()">
                      <p role="label" class=" link" id="selected-account-header">Collections</p>
                      <ul class="dropdown-content" id="select-menu-header" role="select">
                      </ul>                                            
                </div>                                 
                <div id="header_btn_bar" class="links hidden-on-mobile">      
                </div>
              </div>
              <div class="header-end" id="right_additional_menu">
                
            </div>
            </div>
        </header>
        `;

    return str;
  };



  this.initPlugin = function () {
    var options = {
      JsURLs: [
        this.jsFilePath,
        this.customHelperJsonPath,
        this.helperJsonPath,
        this.leftMenuJsonPath,
      ],
      cssURLs: [this.cssFilePath],
      favIcon: this.favIconURL,

      pageTitle: this.pageTitle
    };

    return options;
  };

  this.onPluginLoad = function (context) {
    this.context = context;

    var data = JSON.parse(context.pluginData);
    if (data) {
      this.transactionName = data.typeName || '';
      this.accountUUID = data.accountUUID || '';
    }
    customHeader.getAccountStatus();
    customFunction.getCatalogs("customHeader");
  };



  customHeader.getSessionStorage = function (paramName) {
    return sessionStorage.getItem(paramName);
  };

  this.buildHTML = function () {
    $("#logo").attr("src", logo);
    customFunction.closeAllMenusListener();

    console.log(RightMenu)
    customHeader.RightMenu(RightMenu);

    console.log(LeftMenu)
    customHeader.HeaderLeftMenu(LeftMenu);

    let htmlStr = '';

    for (const item of DropDown) {
      let classMenu = "dropdown-item"
      let htmlTag = "li"
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        classMenu = "dropdown-item"
        htmlTag = "li"
      }

      console.log(JSON.stringify(item));

      htmlStr += `<${htmlTag} onClick="${customFunction.handleAction(item)}" class="${classMenu}" >${item.title}</${htmlTag}>`;
    }

    if (document.getElementById('mobileVersion')) {
      document.getElementById('mobileVersion').innerHTML += htmlStr;
    }
    if (document.getElementById('select-menu-header')) {
      document.getElementById('select-menu-header').innerHTML = htmlStr;
    }
  }
  this.openDropDown = function () {
    document.getElementById('select-menu-header').classList.toggle('show')
  }

  this.RightMenu = function (RightMenu) {
    let dropdownMenuMob = ''
    let rightSideHtmlStr = ''
    for (const item of RightMenu) {
      rightSideHtmlStr += `<button class="button-weak hidden-on-web"onclick="${item.customFunction ? item.customFunction : customFunction.handleAction(item, "customHeader")}">${item.title}${item.icon ? item.icon : ''}</button>`;
      dropdownMenuMob += `<li class="active" onclick="${customFunction.handleAction(item,"customHeader")}"><p>${item.title}</p></li>`
    }
    let rightAddMenu = `<div class="dropdown shown-on-web">
    <button class="button-weak button-icon" onclick="customHeader.closeMenu()">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:24px !important;height:24px !important" viewBox="0 0 24 24">
            <path fill-rule="evenodd"
                d="M19,16 C19.5522847,16 20,16.4477153 20,17 C20,17.5522847 19.5522847,18 19,18 L5,18 C4.44771525,18 4,17.5522847 4,17 C4,16.4477153 4.44771525,16 5,16 L19,16 Z M19,11 C19.5522847,11 20,11.4477153 20,12 C20,12.5522847 19.5522847,13 19,13 L5,13 C4.44771525,13 4,12.5522847 4,12 C4,11.4477153 4.44771525,11 5,11 L19,11 Z M19,6 C19.5522847,6 20,6.44771525 20,7 C20,7.55228475 19.5522847,8 19,8 L5,8 C4.44771525,8 4,7.55228475 4,7 C4,6.44771525 4.44771525,6 5,6 L19,6 Z" />
        </svg>
    </button>
</div>
<div class="dropdown">
    <button class="button-weak button-icon" onclick="customHeader.closeHamburgerMenu()">
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
            <li class="active" onclick="customHeader.changePassword()">
                <span><svg xmlns="http://www.w3.org/2000/svg" style="width:24px !important;height:24px !important" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M21,20 C21.5522847,20 22,20.4477153 22,21 C22,21.5522847 21.5522847,22 21,22 L3,22 C2.44771525,22 2,21.5522847 2,21 C2,20.4477153 2.44771525,20 3,20 L21,20 Z M14.2071068,2.79289322 L18.2071068,6.79289322 C18.5976311,7.18341751 18.5976311,7.81658249 18.2071068,8.20710678 L9.70710678,16.7071068 C9.59733192,16.8168816 9.4635062,16.8995905 9.31622777,16.9486833 L3.31622777,18.9486833 C2.53446974,19.2092693 1.79073069,18.4655303 2.0513167,17.6837722 L4.0513167,11.6837722 C4.10040951,11.5364938 4.18311836,11.4026681 4.29289322,11.2928932 L12.7928932,2.79289322 C13.1834175,2.40236893 13.8165825,2.40236893 14.2071068,2.79289322 Z M10.9992709,7.414 L5.87403205,12.5401815 L4.58113883,16.4188612 L8.45981849,15.125968 L13.5852709,10 L10.9992709,7.414 Z M13.5,4.91421356 L12.4142709,6 L14.9992709,8.585 L16.0857864,7.5 L13.5,4.91421356 Z" />
                </svg>
                Change Password</span>
            </li>
            <li class="active" onclick="customHeader.logout();">
            <span><svg xmlns="http://www.w3.org/2000/svg" style="width:24px !important;height:24px !important" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M19,16.7002538 C19,17.4906313 18.534533,18.2068742 17.8122769,18.5278769 L10.7030692,21.6875248 C10.4507271,21.7996768 10.1552463,21.6860303 10.0430942,21.4336882 C10.0146811,21.3697587 10,21.3005782 10,21.230619 L10,10.2997462 C10,9.50936875 10.465467,8.79312576 11.1877231,8.47212308 L16.767,5.992 L7,5.95898437 L7,17 C7,17.5522847 6.55228475,18 6,18 C5.44771525,18 5,17.5522847 5,17 L5,5 C5,4.44771525 5.44771525,4 6,4 L18,4 C18.5522847,4 19,4.44771525 19,5 L19,16.7002538 Z" />
                </svg>
                Logout</span>
            </li>
        </ul>
    </div>
</div>`;
    document.getElementById('right_additional_menu').innerHTML = rightSideHtmlStr + rightAddMenu;
    if (document.getElementById('menuDropdown')) {
      document.getElementById('menuDropdown').innerHTML += `<h1>Categories</h1><hr><ul>${dropdownMenuMob}</ul>`;
    }

  }

}.apply(customHeader));