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
var Transaction = "B2B Order";
var Catalog = "ALL";
var customHeader = {};
(function () {
  this.context;
  this.accountUUID;
  this.transactionName;
  this.favIconURL = "";
  this.pageTitle = "Food test";
  this.jsonFilePath = "https://pepperihomepage.github.io/Public/Food%20Demo/config_Food_HP_head.js";
  this.helperJsonPath = 'https://pepperihomepage.github.io/Public/helper/header_helper.js'
  this.rightMenuJsonPath = 'https://pepperihomepage.github.io/Public/rightMenu/foodDemo/rightMenu.js'
  this.leftMenuJsonPath = 'https://pepperihomepage.github.io/Public/leftMenu/foodDemo/leftMenu.js'
  this.catalogName = "";
  this.transactionName = "";
  this.catalogs;

  this.setHtml = function () {
    var str = `
            <style>
            /* http://meyerweb.com/eric/tools/css/reset/ 
            v2.0 | 20110126
            License: none (public domain)
         */
         @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,600&display=swap");
         @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;900&display=swap");
         html,
         body,
         div,
         span,
         applet,
         object,
         iframe,
         h1,
         h2,
         h3,
         h4,
         h5,
         h6,
         p,
         blockquote,
         pre,
         a,
         abbr,
         acronym,
         address,
         big,
         cite,
         code,
         del,
         dfn,
         em,
         img,
         ins,
         kbd,
         q,
         s,
         samp,
         small,
         strike,
         strong,
         sub,
         sup,
         tt,
         var,
         b,
         u,
         i,
         center,
         dl,
         dt,
         dd,
         ol,
         ul,
         li,
         fieldset,
         form,
         label,
         legend,
         table,
         caption,
         tbody,
         tfoot,
         thead,
         tr,
         th,
         td,
         article,
         aside,
         canvas,
         details,
         embed,
         figure,
         figcaption,
         footer,
         header,
         hgroup,
         menu,
         nav,
         output,
         ruby,
         section,
         summary,
         time,
         mark,
         audio,
         video {
           margin: 0;
           padding: 0;
           border: 0;
           font-size: 100%;
           font: inherit;
           vertical-align: baseline;
         }
         
         /* HTML5 display-role reset for older browsers */
         article,
         aside,
         details,
         figcaption,
         figure,
         footer,
         header,
         hgroup,
         menu,
         nav,
         section {
           display: block;
         }
         
         body {
           line-height: 1;
         }
         
         ol,
         ul {
           list-style: none;
         }
         
         blockquote,
         q {
           quotes: none;
         }
         
         blockquote:before,
         blockquote:after,
         q:before,
         q:after {
           content: "";
           content: none;
         }
         
         table {
           border-collapse: collapse;
           border-spacing: 0;
         }
         
         button,
         button:active,
         button:focus {
           outline: none;
           border: none;
           cursor: pointer;
         }
         
         :root {
           --header-height: 64px;
         }
         
         * {
           -webkit-font-smoothing: antialiased;
           -moz-osx-font-smoothing: grayscale;
         }
         
         body {
           color: #0a0a0a;
           font-family: "Inter", "Inter var", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
           font-size: 16px;
           font-weight: regular;
           line-height: 1.25;
           cursor: default;
         }
         
         p {
           font-size: 1rem;
           line-height: 1.25;
         }
         
         a {
           color: #1766a6;
           cursor: pointer;
         }
         
         strong,
         .bold {
           font-weight: 600;
         }
         
         .dimmed {
           opacity: 0.7;
         }
         
         .smaller {
           font-size: 80%;
         }
         
         .title-1-xs {
           font-weight: 600;
           font-size: 1rem;
         }
         
         .title-2-sm {
           font-weight: 600;
           font-size: 1.125rem;
         }
         
         .title-4-lg {
           font-weight: 700;
           font-size: 2rem;
           color: white;
           line-height: 1.1em;
         }
         
         @media screen and (max-width: 960px) {
          .header {
            padding: 0 1.5rem;
          }
           .title-4-lg {
             font-size: 1.5rem;
           }
           
         }
         
         @media screen and (max-width: 576px) {
           .title-4-lg {
             font-size: 2rem;
           }
         }
         
         #header-section {
           display: -webkit-box;
           display: -ms-flexbox;
           display: flex;
           -webkit-box-align: center;
               -ms-flex-align: center;
                   align-items: center;
           background-color: rgb(41, 41, 41);
           -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
           height: var(--header-height);
           z-index: 9999;
           position: -webkit-sticky;
           position: sticky;
           top: 0;
         }

         .header {
          padding-left: 2rem;
          padding-right: 2rem;
          height: -webkit-max-content;
          height: -moz-max-content;
          height: max-content;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
              -ms-flex-pack: justify;
                  justify-content: space-between;
          max-width: 100%;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          background: #0a0a0a;
          -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02), 0 4px 8px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.08);
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02), 0 4px 8px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.08);
          height: var(--header-height);
          z-index: 9999;
          position: -webkit-sticky;
          position: sticky;
          top: 0;
        }
         
         @media screen and (max-width: 768px) {
          .header {
            padding: 0 1rem;
          }
         }
         
         .logo {
           
         }
         
         .header-start,
         .header-end {
           display: -webkit-box;
           display: -ms-flexbox;
           display: flex;
           -webkit-box-align: center;
               -ms-flex-align: center;
                   align-items: center;
         }
         
         .header-start {
           -webkit-margin-end: 0.5rem;
                   margin-inline-end: 0.5rem;
         }

         .header-start button {
          -webkit-margin-end: 0.5rem;
                  margin-inline-end: 0.5rem;
        }
         
         
         
         .header-start .link {
          color: white;
          font-size: 1rem;
          font-weight: 600;
          -webkit-margin-end: 1rem;
                  margin-inline-end: 1rem;
          -webkit-transition: color ease-in-out 0.25s;
          transition: color ease-in-out 0.25s;
         }

         .header-start .link:hover {
          color: green;
        }
         
         .header-end button {
           -webkit-margin-start: 0.5rem;
                   margin-inline-start: 0.5rem;
         }
         
         .expand-button {
           display: none;
         }
         
         :root {
           --header-height: 64px;
         }
         
         body {
           --dd-space-1: 0.25rem;
           --dd-space-2: 0.5rem;
           --dd-space-3: 0.75rem;
         }
         
         .dropdown {
           position: relative;
         }
         
         [class*="custom-input"] {
           background: white;
           border-radius: 4px;
           border: 1px solid rgba(10, 10, 10, 0.4);
           -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02), 0 4px 8px rgba(0, 0, 0, 0.04);
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02), 0 4px 8px rgba(0, 0, 0, 0.04);
           -webkit-transition: all ease-in-out 0.15s;
           transition: all ease-in-out 0.15s;
           height: 100%;
           max-width: 100%;
           display: -webkit-box;
           display: -ms-flexbox;
           display: flex;
           -webkit-box-align: center;
               -ms-flex-align: center;
                   align-items: center;
           -webkit-box-pack: justify;
               -ms-flex-pack: justify;
                   justify-content: space-between;
           padding: var(--dd-space-2) var(--dd-space-3);
           position: relative;
           cursor: pointer;
         }
         
         [class*="custom-input"]:hover {
           border-color: #0a0a0a;
           -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.08);
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.08);
         }
         
         [class*="custom-input"]:active, [class*="custom-input"]:focus {
           border: 1px solid #0a0a0a;
           -webkit-box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
                   box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
         }
         
         [class*="custom-input"] p {
           font-size: 0.875rem;
         }
         
         [class*="custom-input"] svg {
           min-width: 1.5rem;
           min-height: 1.5rem;
           fill-opacity: 0.5;
         }
         
         [class*="custom-input"]:hover svg {
           fill-opacity: 1;
         }
         
         [class*="dropdown-content"] {
           background: rgb(41, 41, 41);
           border-radius: 4px;
           border: 1px solid rgba(10, 10, 10, 0.4);
           -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02), 0 4px 8px rgba(0, 0, 0, 0.04);
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02), 0 4px 8px rgba(0, 0, 0, 0.04);
           -webkit-transition: all ease-in-out 0.15s;
           transition: all ease-in-out 0.15s;
           display: none;
           font-family: "Inter", "Inter var", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
           font-size: 0.875rem;
           padding: var(--dd-space-2);
           position: absolute;
           min-width: -webkit-max-content;
           min-width: -moz-max-content;
           min-width: max-content;
           top: calc(100% + var(--dd-space-1));
           max-height: calc(var(--dd-space-3) * 18);
           overflow-y: scroll;
           overflow-x: hidden;
           z-index: 999;
         }
         
         [class*="dropdown-content"]:hover {
           border-color: #0a0a0a;
           -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.08);
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.08);
         }
         
         [class*="dropdown-content"]:active, [class*="dropdown-content"]:focus {
           border: 1px solid #0a0a0a;
           -webkit-box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
                   box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
         }
         
         [class*="dropdown-content"] hr {
           margin: var(--dd-space-2) auto;
         }
         
         [class*="dropdown-content"] ul {
           list-style: none;
           margin: 0;
           margin-top: 6px;
         }
         
         [class*="dropdown-content"] p {
           padding: var(--dd-space-2);
         }
         
         [class*="dropdown-content"] li {
          line-height: 1.5rem;
          background-color: rgba(20, 20, 20);
          color: #ffffff;
          opacity: 0.9;
          border-radius: 4px;
          padding: var(--dd-space-2) var(--dd-space-3);
          cursor: pointer;
          -webkit-transition: background-color ease-in-out 0.25s;
          transition: background-color ease-in-out 0.25s;
          margin-bottom: var(--dd-space-1);
         }
         
         [class*="dropdown-content"] li:last-child {
           margin-bottom: 0;
         }
         
         [class*="dropdown-content"] li:hover {
           background-color: rgba(5, 5, 5, 0.25);
           opacity: 1;
         }
         
         [class*="dropdown-content"] li span {
           display: -webkit-box;
           display: -ms-flexbox;
           display: flex;
           -webkit-box-align: center;
               -ms-flex-align: center;
                   align-items: center;
         }
         
         [class*="dropdown-content"] svg {
           -webkit-margin-end: var(--dd-space-3);
                   margin-inline-end: var(--dd-space-3);
           fill-opacity: 0.8;
           -webkit-transition: fill-opacity ease-in-out 0.25s;
           transition: fill-opacity ease-in-out 0.25s;
         }
         
         [class*="dropdown-content"] svg:hover {
           fill-opacity: 1;
         }
         
         [class*="dropdown-content"] .active-dropdown-item {
           background-color: #0a0a0a;
           color: white;
         }
         
         .dropdown-content-end {
           right: 0;
         }
         
         .dropdown-content-fit {
           min-width: unset;
           left: 0;
           right: 0;
         }
         
         :root {
           --header-height: 64px;
         }
         
         .show {
           display: inline-block !important;
         }
         
         .hide {
           display: none !important;
         }

         .shown-on-mobile {
          display: none !important;
         }
         
         @media screen and (max-width: 960px) {
           .hidden-on-mobile {
             display: none !important;
           }

           .hidden-on-web {
              display: none !important;
           }

         }
         
         @media screen and (min-width: 960px) {
           .shown-on-mobile {
             display: none !important;
           }

           .shown-on-web {
            display: none !important;
           }
         }
         
         hr {
           border: 0;
           border-top: 1px solid rgba(10, 10, 10, 0.25);
           width: 100%;
           margin: 0;
         }
         
         button {
           position: relative;
         }
         
         .comonBtn {
           color: white;
           background: #0a0a0a;
           border-radius: 4px;
           -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
           height: 3rem;
           font-size: 1rem;
           font-weight: 600;
           padding: 1em;
           -webkit-transition: all ease-in-out 0.35s;
           transition: all ease-in-out 0.35s;
         }
         
         .comonBtn:hover {
           -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16);
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16);
           -webkit-transform: translateY(-1px);
                   transform: translateY(-1px);
         }
         
         .regular-button {
           background: white;
           border-radius: 4px;
           border: 1px solid rgba(10, 10, 10, 0.4);
           -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02), 0 4px 8px rgba(0, 0, 0, 0.04);
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02), 0 4px 8px rgba(0, 0, 0, 0.04);
           -webkit-transition: all ease-in-out 0.15s;
           transition: all ease-in-out 0.15s;
           font-size: 0.875rem;
           font-weight: 600;
           height: 2.5rem;
           color: #0a0a0a;
           padding: 0 4rem;
           -ms-flex-item-align: center;
               -ms-grid-row-align: center;
               align-self: center;
         }
         
         .regular-button:hover {
           border-color: #0a0a0a;
           -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.08);
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.08);
         }
         
         .regular-button:active, .regular-button:focus {
           border: 1px solid #0a0a0a;
           -webkit-box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
                   box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
         }
         
         .button-weak {
           display: -webkit-box;
           display: -ms-flexbox;
           display: flex;
           -webkit-box-align: center;
               -ms-flex-align: center;
                   align-items: center;
           font-size: 0.875rem;
           background: rgb(26, 26, 26);
           border-radius: 4px;
           height: 2.5rem;
           color: #ffffff;
           opacity: 0.9;
           padding: 0 1em;
           -ms-flex-item-align: center;
               align-self: center;
           -webkit-transition: background ease-in-out 0.25s;
           transition: background ease-in-out 0.25s;
         }
         
         .button-weak svg {
           fill: #ffffff;
           fill-opacity: 0.6;
           -webkit-transition: fill-opacity ease-in-out 0.25s;
           transition: fill-opacity ease-in-out 0.25s;
         }
         
         .button-weak svg:hover {
           fill-opacity: 1;
         }
         
         .button-weak:hover {
           background: rgba(5, 5, 5, 0.25);
           opacity: 1;
         }
         
         .button-weak .start-icon {
           -webkit-margin-end: 0.25em;
                   margin-inline-end: 0.25em;
         }
         
         .button-weak .end-icon {
           -webkit-margin-start: 0.25em;
                   margin-inline-start: 0.25em;
         }
         
         .button-icon {
           padding: 0 0.5rem;
         }
         
         .button-icon svg {
           fill: #ffffff;
           fill-opacity: 0.8;
           -webkit-transition: fill-opacity ease-in-out 0.25s;
           transition: fill-opacity ease-in-out 0.25s;
         }
         
         .button-icon svg:hover {
           fill-opacity: 1;
         }
         
         :root {
           --header-height: 64px;
         }

         .hidden-on-web {
           display: flex;
         }

         #launcher{
           display: none;
         }
         /*# sourceMappingURL=style.css.map */
                  </style>
        <header id="header-section" class="header" style="margin: 0 auto;">
              <div class="header-start"> 
                <a id="logo" href="/HomePage" class="logo">
                  <img id="logo" src="data:image/png;base64,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"
                      style="width: 220px;"/> 
                </a>                                     
                <div id="header_btn_bar" class="links hidden-on-mobile" style="display: none;">      
                </div>
              </div>
              <div class="header-end" id="right_additional_menu">
                
            </div>
        </header>
        `;

    return str;
  };

  this.initPlugin = function () {
    var options = {
      JsURLs: [this.jsonFilePath, this.rightMenuJsonPath, this.leftMenuJsonPath, this.helperJsonPath],
      cssURLs: [],
      favIcon: this.favIconURL,
      pageTitle: this.pageTitle,
    };

    return options;
  };

  this.onPluginLoad = function (context) {
    this.context = context;

    var data = JSON.parse(context.pluginData);
    if (data) {
      this.transactionName = data.typeName || "";
      this.accountUUID = data.accountUUID || "";
    }
    customFunction.getAccountStatus();
    customHeader.getCatalogs("customHeader");
  };

  this.getSessionStorage = function (paramName) {
    return sessionStorage.getItem(paramName);
  };

  //Get Accounts
  // ---
  // Right menu

  // ---
  // Left menu

  // ---
  //

  this.getCatalogs = function (x) {
    console.log(x);
    pepperi.api.catalogs.search({
      fields: ["UUID", "ExternalID", "Description", "ID"],
      responseCallback: "customHeader.getCatalogsCallback",
      requestID: x,
    });
  };
  this.getCatalogsCallback = function (res) {
    console.log("get catalog res", res);
    res && res.objects && res.objects.length ?
      (customHeader.catalogs = res.objects) :
      false;
    var fun = eval("(" + res.requestID + ")");
    fun.buildHTML();
  };

  this.createNewActivity = function (
    in_transactionName,
    deeplink,
    customName
  ) {
    var evalCustomName = eval("(" + customName + ")");
    var bridgeObject = {
      references: {
        account: {
          UUID: evalCustomName.accountUUID,
        },
      },
      type: {
        Name: !in_transactionName ?
          evalCustomName.transactionName :
          in_transactionName,
      },

      responseCallback: "customHeader.createNewActivityCallback",
      requestID: {
        deeplink,
        customName
      },
    };

    pepperi.app.activities.add(bridgeObject);
  };
  this.createNewActivityCallback = function (res) {
    console.log(res);
    if (res && res.success) {
      var uuid = res.id;

      if (res.requestID) {
        var requestID = res.requestID.replace(
          "{{UUID}}",
          uuid.replace(/-/g, "")
        );
        customHeader.navigation(requestID);
      }
    }
  };
  this.handleAction = function (item, nameOfMainJs) {
    var deepLink = item.deepLink.replace(/\"/g, "%22");
    switch (item.action) {
      case "navigation":
        return `customHeader.navigation('${deepLink}')`;
      case "setUUIDandNav":
        return `customFunction.setUUIDandNav('${item.catalog}','${item.transaction}','${deepLink}', '${nameOfMainJs}')`;
      case "openInNewTab":
        return `customFunction.openInNewTab('${deepLink}')`;
      case "createNewActivity":
        return `customHeader.createNewActivity('${item.activity}','${deepLink}', '${nameOfMainJs}')`;
      case "createNewTransaction":
        return `customHeader.createNewOrder('${item.catalog}','${item.transaction}','${deepLink}',true, '${nameOfMainJs}')`;
      case "zendesk":
        return `location.href = 'javascript:$zopim.livechat.window.show()'`;
    }
  };
  this.navigation = function (path) {
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

  this.createNewOrder = function (
    inCatalog = null,
    in_transactionName = null,
    deepLink = null,
    skipSessionSaving,
    nameOfMainJs
  ) {
    var name = eval("(" + nameOfMainJs + ")");
    let catalogUUID = !inCatalog ?
      name.catalogs.find((el) => el.ExternalID === name.catalogName).UUID :
      name.catalogs.find((el) => el.ExternalID === inCatalog).UUID;
    var bridgeObject = {
      references: {
        account: {
          UUID: name.accountUUID,
        },
        catalog: {
          UUID: catalogUUID,
        },
      },
      type: {
        Name: !in_transactionName ? name.transactionName : in_transactionName,
      },
      responseCallback: skipSessionSaving ?
        "customHeader.createNewOrderCallback" :
        "customHeader.createNewOrderAndNavCallback",
      requestID: deepLink,
    };
    pepperi.app.transactions.add(bridgeObject);
  };

  this.createNewOrderAndNavCallback = function (res) {
    console.log("createNewOrderAndNavCallback res", res);
    if (res && res.success) {
      customHeader.setSessionStorage("LastOpenTransactionUUID", res.id);
      let uuid = res.id;
      if (res.requestID) {
        var requestID = res.requestID.replace(
          "{{UUID}}",
          uuid.replace(/-/g, "")
        );
        customHeader.navigation(requestID);
      }
    }
  };
  this.createNewOrderCallback = function (res) {
    console.log("createNewOrderCallback res", res);
    if (res && res.success) {
      let uuid = res.id;
      if (res.requestID) {
        var requestID = res.requestID.replace(
          "{{UUID}}",
          uuid.replace(/-/g, "")
        );
        customHeader.navigation(requestID);
      }
    }
  };

  this.setSessionStorage = function (paramName, data) {
    sessionStorage.setItem(paramName, data);
  };

  // ---

  this.buildHTML = function () {
    this.transactionName = Transaction;
    this.catalogName = Catalog;
    document.getElementById("logo").src = logo;

    customFunction.closeAllMenusListener();

    console.log(RightMenu);
    customHeader.HeaderRightMenu(RightMenu);

    console.log(LeftMenu);
    customHeader.HeaderLeftMenu(LeftMenu);
  };

}.apply(customHeader));