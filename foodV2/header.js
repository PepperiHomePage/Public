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

/********************* ********************************************************************************/
/********************* ********************************************************************************/
/**START CONFIG FILE */
const CATALOG_NAME = "ALL";
const TRANSACTION_NAME = "Sales Order";
const changes = '';
const Header = [{
        actionType: 'transaction',
        title: "Go to Favorites",
        deepLink: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22690f6ab9-b307-481a-a8a3-e752807a5568%5C%22%7D%22&TopPadding=0&SearchAll=false'
    },

    {
        actionType: 'navigation',
        title: "My History",
        deepLink: 'list/all_activities'
    },

    {
        actionType: 'activity',
        activityName: 'Service Request',
        title: "Contact Us",
        deepLink: 'activities/details/{{UUID}}'
    }
];
const refItem = {
    catalog: CATALOG_NAME,
    transaction: TRANSACTION_NAME,
    title: "",
    titleColor: "",
    imageURL: "",
    subTitle: "",
    subTitleColor: "",
    description: "",
    descriptionColor: "",
    deepLink: ''
}
var logo = "https://storage.pepperi.com/PreSales/NewFoodDemoImg/headerlogo@2x.png";
var hamburder_svg = "https://storage.pepperi.com/General/Icons/open-menu-white.svg";
var logout_menu_svg_color = "white";
var createNewOrder_type_name = "Service Request";
var page_title = "Food Demo";
/**END CONFIG FILE */
/********************* ********************************************************************************/
/********************* ********************************************************************************/
var customHeader = {};
(function() {
    this.context;
    this.accountUUID;
    this.transactionName;
    this.userName;
    this.userNameMainView;
    this.favIconURL = '';
    this.pageTitle = page_title;
    this.transactionName = "Sales Order";
    this.catalogs;
    this.jsFilePath = 'https://storage.pepperi.com/PreSales/food_demo_2/config_header.js'

    this.setHtml = function() {
        var str =
            `<style>
            @import url('https://fonts.googleapis.com/css?family=Montserrat:200,400,700,800,900&display=swap');
            #header-section {
                height: 64px;
                padding: 26px 0;
                display: flex;
                align-items: center;
                background: rgb(48, 37, 29);
                box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1), 0px 4px 8px 0px rgba(21, 24, 26, 0.1), 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
            }
        
            #header_btn_bar {
                display: flex;
            }
            
            #header-section .dropdown-menu:after {
                display: none;
            }
            
            #header-section .justify-content-left {
                display: flex;
                justify-content: flex-end;
                width: 100% !important;
                height: 64px;
                align-items: center;
                padding-right: 20px;
            }
            
            #header-section .header_nav_bar {
                height: 40px;
                color: #fff;
                display: flex;
                margin-right: 32px;
                font-size: 20px;
            }
            
            #header-section .btn-group ul {
                align-items: center;
                padding: 0;
                top: 13px;
            }
            
            #header-section .btn-group ul li {
                display: inline;
                padding-top: 5px;
                padding-left: 15px;
                padding-right: 5px;
                border-radius: 4px;
                height: 40px;
            }
            
            #header-section .btn-group ul li a {
                text-decoration: none;
            }
            
            .right-buttons {
                background: rgb(19, 12, 6);
                width: 40px;
                height: 40px;
                border: 1px solid rgb(26, 26, 26);
                border-radius: 4px;
                font-weight: 500;
                font-size: 14px;
                color: rgb(80, 80, 80);
                line-height: 5px;
            }
            
            .btn-group ul li a {
                color: white;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                height: 20px;
                letter-spacing: 0.12px;
                line-height: 20px;
                border: none;
                transform: scale(1, 0.9);
            }
            
            .btn-group ul li a:hover {
                cursor: pointer;
            }
            
            .btn-group .wishlist {
                color: #ffffff;
                text-decoration: none;
                cursor: pointer;
                font-size: 20px;
            }

            .logOut_hr{
            margin-top: 14px;
            margin-bottom: 14px;
            }
            .hamburger_svg{
            background-color: rgb(26, 26, 26);
            vertical-align:center;
            width:20px;
            }

            #header-section .container-fluid {
                width: 100%;
                display: flex;
                background: rgb(48, 37, 29);
                align-items: center;
                max-width: 1464px;
                padding-left: 0px;
                padding-right: 0px;
            }
            
            #header-section .btn-group {
                display: flex;
            }
            
            #header-section .btn-group button {
                outline: none;
                background-color: black;
                border: none;
                border-radius: 5px;
                color: #a29696;
                height: 40px;
                line-height: 20px;
                padding: 0 15px;
                margin-left: 10px;
            }
            
            #header-section .dropdown {
                height: 40px;
            }
            
            #header-section .dropdown .dropdown-log-in:hover {
                background-color: #a29696;
                color: #8b7e7e;
            }
            
            #header-section .dropdown .dropdown-log-in {
                background-color: transparent;
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
                border: 2px solid #8b7e7e;
                border-radius: 300px;
                color: white;
                font-family: "proxima-nova", "Helvetica Neue", Helvetica, Arial, sans-serif;
                font-weight: 750;
                letter-spacing: 2px;
                text-transform: uppercase;
                text-decoration: none;
                transition: background-color 0.2s ease-out, color 0.2s ease-out;
                -webkit-transition: background-color 0.2s ease-out, color 0.2s ease-out;
                -moz-transition: background-color 0.2s ease-out, color 0.2s ease-out;
                -o-transition: background-color 0.2s ease-out, color 0.2s ease-out;
            }
            
            #header-section .dropdown a {
                text-decoration: none;
                cursor: pointer;
                display: block;
                font-size: 10px;
            }
            
            #header-section .dropdown a:hover {
                color: white;
            }
            
            .logo {
                width: 200px;
                margin-left: 26px;
                background-color: rgb(48, 37, 29);
                color: rgb(255, 255, 255);
                font-size: 32px;
                font-family: Montserrat-Bold;
                font-weight: bold;
                letter-spacing: 1.22px;
                line-height: 40px;
                position: inherit;
                
            }
            
            .logo:hover {
                cursor: pointer;
            }
            .dotted{
              border: 2px solid white;
              border-radius: 10px;
              width: 1px;
              height: 1px;
              background-color: white;
              float: right;
              margin-top: 12px;
              margin-left: 20px;
              opacity: 60%;
            }
            .plus{
              margin-top: 3px;
              opacity: 70%;
              width: 10px;
              margin-left: 5px;
            }
            .dropdown{
            background-color: rgb(19, 12, 6);
            border: 1px solid rgb(19, 12, 6);
            border-radius: 4px;
            width: 40px;
            height: 40px;
            padding-bottom: 4px;  
            }
            .showDesktop{
              list-style: none;
            }
            #header-section .dropdown-menu:before {
                border: none !important;
            }
            
            #header-section .dropdown-menu {
                width: 304px;
                padding-left: 21px;
                text-align: center;
            }
            
            #header-section .favorite {
                position: relative;
                width: 118px;
            }
            
            .showMobile {
                display: none;
            }
            
            .dropdown-user .dropdown-content-user li {
                list-style-type: none;
            }
            
            .dropdown-user {
                position: relative;
                width: fit-content;
            }
            
            .dropdown-content-user {
                display: none;
                position: absolute;
                font-size: 14px;
                vertical-align: middle;
                min-width: 200px;
                box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                padding: 12px 16px;
                z-index: 1;
                right: 0px;
                border-radius: 4px;
            }
            
            .dropdown-content {
                display: none;
                font-size: 14px;
                vertical-align: middle;
                position: absolute;
                background-color: white;
                min-width: 200px;
                box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                padding: 14px 8px;
                z-index: 1;
                right: 0px;
                border: 1px solid gray;
                border-radius: 4px;
                top: 40px;
                padding-bottom: 0px;
            }
            
            .dropdown-content ul {
                list-style: none;
                padding: 0 10px;
                margin: 0;
            }
            
            .dropdown-content ul li {
                height: 40px;
                padding-top: 5px;
                cursor: pointer;
                color: rgb(26, 26, 26);
                font-size: 14px;
                font-weight: normal;
                letter-spacing: 0.12px;
                line-height: 13px;
                margin-bottom: 0px;
            }
            
            #userMenuMobile {
                display: none;
                margin-bottom: 20px;
                padding-bottom: 20px;
                margin-left: 10px;
                width: 45vw;
            }
            
            #userName {
                margin: 0 0 0px 10px;
                color: white;
            }
            
            #userNameMainView {
                width: 131px;
                height: 18px;
                color: rgba(26, 26, 26, 0.7);
                font-size: 14px;
                font-weight: normal;
                letter-spacing: 0.12px;
                line-height: 9px;
            }
            
            @media screen and (max-width: 768px) {
                .dotted {
                    display: none;
                }
                .show {
                    display: block;
                }
                .open>.dropdown-menu {
                    display: flex;
                }
                #userMenuMobile {
                    display: block;
                }
                #right_additional_menu {
                    display: block;
                    width: 40px;
                    height: 40px;
                }
                #header-section #dropdownMenuButton {
                    height: 40px;
                    margin-right: 4px;
                }
                #header-section .dropdown a:hover {
                    color: black;
                }
                .container-fluid {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    background-color: rgb(41, 41, 41);
                    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1), 0px 8px 16px 0px rgba(21, 24, 26, 0.1), 0px 16px 32px 0px rgba(0, 0, 0, 0.1);
                    height: 64px;
                    padding-left: 0 !important;
                }
                .dropdown-user {
                    position: relative;
                    width: fit-content;
                }
                .dropdown-content-user {
                    display: none;
                    position: absolute;
                    font-size: 14px;
                    vertical-align: middle;
                    min-width: 200px;
                    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                    padding: 12px 16px;
                    z-index: 1;
                    right: 0px;
                    border-radius: 4px;
                }
                .right-buttons {
                    background: rgb(19, 12, 6);
                    width: 40px;
                    height: 40px;
                    border: 1px solid rgb(26, 26, 26);
                    border-radius: 4px;
                    font-weight: 500;
                    font-size: 14px;
                    color: rgb(80, 80, 80);
                    line-height: 5px;
                }
                .back {
                    background-color: blue;
                    width: 20%;
                    height: 20%;
                }
                #header-section .header_nav_bar {
                    height: 40px;
                    color: #fff;
                    display: flex;
                    margin-right: 0px;
                    font-size: 20px;
                }
                #header-section .dropdown-menu-left {
                    margin-top: 14px;
                    font-size: 25px;
                    width: 100vw;
                    background-color: rgb(41, 41, 41, -2.5);
                    border: none;
                    height: 100vh;
                    min-width: 200px;
                    padding-left: 0px;
                }
                #header-section .dropdown-menu-left li {
                    text-align: left;
                    height: 40px;
                    min-width: 150px;
                    color: rgb(26, 26, 26);
                    font-size: 14px;
                    letter-spacing: 0.12px;
                    line-height: 20px;
                }
                #header-section .dropdown-menu-left li:hover {
                    background-color: transparent !important;
                }
                .dropdown-menu li:hover {
                    background-color: transparent !important;
                }
                #header-section .dropdown-menu-left li a {
                    color: black;
                    font-size: 14px;
                }
                .showMobile {
                    display: block;
                }
                #dropdownMenuButton:hover #drpd_body_menu {
                    display: block;
                }
                #drpd_body_menu {
                    color: black;
                    vertical-align: middle;
                    position: absolute;
                    background-color: white;
                    min-width: 160px;
                    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                    z-index: 1;
                    right: 4px;
                    border: 1px solid gray;
                    border-radius: 4px;
                    top: -15px;
                    padding-top: 14px;
                    padding-left: 12px;
                }
                .showDesktop,
                #header-section .btn-group ul {
                    display: none;
                }
                #userMenuMobile {
                    display: none;
                }
            }
            
            .icon-pas::before {
                content: "";
                display: inline-block;
                background-size: 20px !important;
                background: url(https://storage.pepperi.com/PreSales/NewFoodDemoImg/system-edit.svg) no-repeat;
                width: 20px;
                height: 20px;
                float: left;
                margin: -5px 8px 0 0;
            }
            
            .icon-log::before {
                content: "";
                display: inline-block;
                background-size: 20px !important;
                background: url(https://storage.pepperi.com/PreSales/NewFoodDemoImg/system-door.svg) no-repeat;
                width: 20px;
                height: 20px;
                float: left;
                margin: -5px 8px 0 0;
            }
        </style>
        <header id="header-section">
        <div class="container-fluid">
    <div>
        <img src="" class="logo" id="logo" onclick="customHeader.navigation(\'HomePage\')" />
    </div>
    <div class="d-flex justify-content-left">
        <div class="header_nav_bar">
            <div class="dropdown showMobile" id="mobile_menu"></div>
            <div class="btn-group">
                <ul id="header_btn_bar" class="showDesktop">
                </ul>
            </div>
        </div>
        <div class="d-flex justify-content-right" id="logout_menu"></div>
    </div>
</header>
        `;

        return str;
    };

    this.initPlugin = function() {
        var options = {
            JsURLs: [
                this.jsFilePath
            ],
            cssURLs: [],
            favIcon: this.favIconURL,
            pageTitle: this.pageTitle
        };

        return options;
    };

    this.onPluginLoad = function(context) {
        console.log(context)
        this.context = context;
        const { userName } = context;
        this.userName = userName;
        var data = JSON.parse(context.pluginData);
        if (data) {
            this.transactionName = data.typeName || '';
            this.accountUUID = data.accountUUID || '';
        }
        this.getAccountStatus();
    };

    this.buildHTML = function(section, caseSection, mobileDrpdMenuID, btnBarID, LogOutID) {
        document.getElementById("logo").src = logo;
        let htmlStr = '';
        let logoutStr = '';
        let mobileMenuStr = '';
        const item = refItem;
        switch (section) {
            case caseSection:
                {
                    for (const item of section) {
                        let deepLink = item.deepLink.replace(/\"/g, '%22');
                        let linkElement = ``;
                        if (item.actionType === 'navigation') {
                            linkElement = `<a onclick="customHeader.navigation('${deepLink}')">${item.title}</a>
                        <hr class="dotted">`;
                        } else if (item.actionType === 'activity') {
                            linkElement = `<a onclick="customHeader.createNewActivity('','','${deepLink}',true, '${item.activityName}')">${item.title}</a>               
                        <img src="https://storage.pepperi.com/PreSales/NewFoodDemoImg/Icon_number_plus.svg" class="plus"/>`;
                        } else if (item.actionType === 'transaction')
                            linkElement = `<a onclick="customHeader.setUUIDandNav('','','${deepLink}')">${item.title}</a>               
                        <hr class="dotted">`;
                        let catalog = this.catalogs.find((el) => el.ExternalID === item.catalog);
                        htmlStr += `<li>${linkElement}</li>`;
                    }
                }
                document.getElementById(btnBarID).innerHTML = htmlStr;
                break;
        }
        mobileMenuStr = `<button class="dropdown" type="button" id="dropdownMenuButton" onclick="customHeader.closeLogOutMenu('myDropdown')" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img class="hamburger_svg" src=${hamburder_svg} alt="user" />
    </button>
      <div id="dropdown-menu-mobile" class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton">
          <div id="drpd_body_menu">${htmlStr}</div>
      </div>`
        document.getElementById(mobileDrpdMenuID).innerHTML = mobileMenuStr;
        logoutStr = `<div id="right_additional_menu">
        <div class="dropdown">
            <button onclick="customHeader.closeHamburgerMenu('myDropdown')" class="right-buttons img-pos" id="user-drop">
              <svg class="user-img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="2 3 20 20">
                  <path fill-opacity="1" fill-rule="evenodd" fill=${logout_menu_svg_color} d="M5.87300934,20 C5.31672677,18.8352719 5,17.5623379 5,16.3333333 C5,13.9259827 6.21522434,12.2548428 8.06569509,11.3364984 C7.70530908,10.3928205 7.5,9.36966701 7.5,8.4 C7.5,5.36243388 9.51471863,4 12,4 C14.4852814,4 16.5,5.36243388 16.5,8.4 C16.5,9.36966701 16.2946909,10.3928205 15.9343049,11.3364984 C17.7847757,12.2548428 19,13.9259827 19,16.3333333 C19,17.5623379 18.6832732,18.8352719 18.1269907,20 C17.7963837,20 17.3817618,20 16.883125,20 C15.7220834,20 15.7220834,19.3712729 15.8841722,19.0335104 C16.2755898,18.2178696 16.5,17.329449 16.5,16.5 C16.5,15.0183086 15.7838916,14.0593118 14.6788931,13.5264125 C13.9304475,14.4190907 13.00359,15 12,15 C10.99641,15 10.0695525,14.4190907 9.32110687,13.5264125 C8.21610842,14.0593118 7.5,15.0183086 7.5,16.5 C7.5,17.3265901 7.72286593,18.211746 8.11178644,19.0250739 C8.2747433,19.3658565 8.2747433,20 7.14578125,20 C6.64072083,20 6.21646352,20 5.87300934,20 Z M12,12.5 C13.1045695,12.5 14,10.2997114 14,8.64285714 C14,6.98600289 13.1045695,6.5 12,6.5 C10.8954305,6.5 10,6.98600289 10,8.64285714 C10,10.2997114 10.8954305,12.5 12,12.5 Z" />
              </svg>
          </button>
            <div id="myDropdown" class="dropdown-content">
                <ul>
                    <li id='userNameMainView'>${this.userName}</li>
                    <hr class="logOut_hr">
                    <li class="icon-pas" onclick="customHeader.changePassword()">Change Password</li>
                    <li class="icon-log" onclick="customHeader.logout();">Logout</li>
                </ul>
            </div>
        </div>
    </div>`
        document.getElementById(LogOutID).innerHTML = logoutStr;
    }

    /********************* ********************************************************************************/
    /********************* ********************************************************************************/
    /**START FUNCTIONS */
    this.closeHamburgerMenu = function(drpd_id) {
        document.getElementById(drpd_id).classList.toggle('show')
    }
    this.closeLogOutMenu = function(drpd_id) {
        if (document.getElementById(drpd_id).classList.contains('show'))
            document.getElementById(drpd_id).classList.toggle('show')
    }
    this.setSessionStorage = function(paramName, data) {
        sessionStorage.setItem(paramName, data);
    }
    this.getSessionStorage = function(paramName) {
            return sessionStorage.getItem(paramName);
        }
        /**END FUNCTIONS */
        /********************* ********************************************************************************/
        /********************* ********************************************************************************/
        /**START NAVIGATION BLOCK */
    this.navigation = function(path) {
        const uuid = customHeader.getSessionStorage('LastOpenTransactionUUID');
        var eventData = {
            detail: {
                path: path
            }
        };
        var event = new CustomEvent('navigateTo', eventData);
        if (document.createEvent) {
            window.dispatchEvent(event);
        } else {
            window.fireEvent('on' + event.eventType, event);
        }
        if (window.location.href != "https://app.pepperi.com/HomePage") {
            window.location.href = path;
        }
    };
    customHeader.setUUIDandNav = function(in_catalog = null, in_transactionName = null, deepLink = null) {
        const uuid = customHeader.getSessionStorage('LastOpenTransactionUUID');
        if (uuid && uuid !== "undefined") {
            deepLink = deepLink.replace('{{UUID}}', uuid.replace(/-/g, ''));
            customHeader.navigation(deepLink);
        } else {
            customHeader.createNewOrder(in_catalog, in_transactionName, deepLink);
        }
    };
    this.openInNewTab = function(url) {
        var win = window.open(url, '_blank');
        win.focus();
    };
    this.logout = function() {
        var event = new CustomEvent('logout');
        if (document.createEvent) {
            window.dispatchEvent(event);
        } else {
            window.fireEvent('on' + event.eventType, event);
        }
    };
    this.changePassword = function() {
        window.location.href = 'https://idp.pepperi.com/Account/ChangePassword';
    };
    /**END NAVIGATION BLOCK */
    /********************* ********************************************************************************/
    /********************* ********************************************************************************/
    /**START HELPER BLOCK */
    this.getAccountStatus = function() {
        var bridgeObject = {
            fields: ['Name', 'UUID'],
            sorting: [],
            responseCallback: 'customHeader.getCurrentAccountCallback'
        };
        pepperi.api.accounts.search(bridgeObject);
    };
    this.getCurrentAccountCallback = function(res) {
        if (res && res.success && res.objects && res.objects.length)
            this.accountUUID = res.objects[0].UUID;
        this.getCatalogs();
    };
    this.getCatalogs = function() {
        pepperi.api.catalogs.search({
            fields: ["UUID", "ExternalID", "Description", "ID"],
            responseCallback: 'customHeader.getCatalogsCallback'
        });
    }
    this.getCatalogsCallback = function(res) {
        (res && res.objects && res.objects.length) ? this.catalogs = res.objects: false;
        this.buildHTML(Header, Header, 'mobile_menu', 'header_btn_bar', 'logout_menu');
    }
    this.createNewOrder = function(inCatalog = null, in_transactionName = null, deepLink = null, isActivity = false) {
        var bridgeObject = {
            references: {
                account: {
                    UUID: this.accountUUID
                },
                catalog: {
                    UUID: !inCatalog ? this.catalogName : inCatalog
                }
            },
            type: {
                Name: !in_transactionName ? this.transactionName : in_transactionName
            },
            responseCallback: "customHeader.createNewOrderCallback",
            requestID: deepLink
        };
        if (isActivity) {
            delete bridgeObject.references.catalog;
            bridgeObject.type.Name = createNewOrder_type_name;
            pepperi.app.activities.add(bridgeObject);
        } else
            pepperi.app.transactions.add(bridgeObject);
    };
    this.createNewOrderCallback = function(res) {
        if (res && res.success) {
            customHeader.setSessionStorage('LastOpenTransactionUUID', res.id);
            let uuid = res.id;
            if (res.requestID) {
                var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
                customHeader.navigation(requestID);
            }
        }
    };
    this.createNewActivity = function(inCatalog = null, in_transactionName = null, deepLink = null, isActivity = false, ActivityName = null) {
        var bridgeObject = {
            references: {
                account: {
                    UUID: this.accountUUID
                },
                catalog: {
                    UUID: !inCatalog ? this.catalogName : inCatalog
                }
            },
            type: {
                Name: !in_transactionName ? this.transactionName : in_transactionName
            },
            responseCallback: "customHeader.createNewActivityCallback",
            requestID: deepLink
        };
        if (isActivity) {
            delete bridgeObject.references.catalog;
            bridgeObject.type.Name = ActivityName;
            pepperi.app.activities.add(bridgeObject);
        } else
            pepperi.app.transactions.add(bridgeObject);


    };
    this.createNewActivityCallback = function(res) {
        if (res && res.success) {
            let uuid = res.id;
            if (res.requestID) {
                var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
                customHeader.navigation(requestID);
            }
        }
    };
    /**END HELPER BLOCK */
    /********************* ********************************************************************************/
    /********************* ********************************************************************************/


}.apply(customHeader));