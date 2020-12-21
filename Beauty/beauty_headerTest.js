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
  this.pageTitle = 'Beauty Demo';
  this.catalogName = "";
  this.transactionName = "";
  this.catalogs;
  this.jsFilePath = 'https://pepperihomepage.github.io/Public/Beauty/config_header.js'
  this.helperJsonPath = 'https://pepperihomepage.github.io/Public/helper/header_helper.js'
  this.rightMenuJsonPath = 'https://pepperihomepage.github.io/Public/rightMenu/rightMenu.js'
  this.leftMenuJsonPath = 'https://pepperihomepage.github.io/Public/leftMenu/leftMenu.js'
  this.customHelperJsonPath = 'https://pepperihomepage.github.io/Public/helper/customFunction.js'
  this.cssFilePath = "https://pepperihomepage.github.io/Public/beauty-header.css";

  this.setHtml = function () {
    var str =
      `
            <style>
                  </style>
        <header id="header-section" class="header header-wrapper" style="margin: 0 auto;">
            <div class="wrp">
              <div class="header-start"> 
                <img class="logo" onclick="customFunction.navigation(\'HomePage\')" id="logo" src="" />                                     
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
        this.helperJsonPath,
        this.rightMenuJsonPath,
        this.leftMenuJsonPath,
        this.customHelperJsonPath
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


   
  }
  




}.apply(customHeader));