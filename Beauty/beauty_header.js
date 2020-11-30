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
  this.orderJsonPath = 'https://pepperihomepage.github.io/Public/headerOrder/beauty_header-order.js'
  this.helperJsonPath = 'https://pepperihomepage.github.io/Public/helper/beauty_header_helper.js'
  this.rightMenuJsonPath = 'https://pepperihomepage.github.io/Public/rightMenu/rightMenu.js'
  this.leftMenuJsonPath = 'https://pepperihomepage.github.io/Public/leftMenu/leftMenu.js'
  this.customHelperJsonPath = 'https://pepperihomepage.github.io/Public/helper/customFunction.js'

  this.setHtml = function () {
    var str =
      `
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
           background: white;
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
           max-height: 2.5rem;
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
          color: black;
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
           background: white;
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
         }
         
         [class*="dropdown-content"] p {
           padding: var(--dd-space-2);
         }
         
         [class*="dropdown-content"] li {
          line-height: 1.5rem;
          background-color: white;
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
           background-color: rgba(10, 10, 10, 0.08);
           color: #0a0a0a;
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
         
         @media screen and (max-width: 960px) {
           .hidden-on-mobile {
             display: none !important;
           }

         }

         @media screen and (min-width: 1280px) {
          .shown-on-web {
            display: none !important;
          }
        }
         
         @media screen and (min-width: 960px) {
           .shown-on-mobile {
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
           background: rgba(10, 10, 10, 0.08);
           border-radius: 4px;
           height: 2.5rem;
           color: #0a0a0a;
           padding: 0 1em;
           -ms-flex-item-align: center;
               align-self: center;
           -webkit-transition: background ease-in-out 0.25s;
           transition: background ease-in-out 0.25s;
         }
         
         .button-weak svg {
           fill: #0a0a0a;
           fill-opacity: 0.6;
           -webkit-transition: fill-opacity ease-in-out 0.25s;
           transition: fill-opacity ease-in-out 0.25s;
         }
         
         .button-weak svg:hover {
           fill-opacity: 1;
         }
         
         .button-weak:hover {
           background: rgba(10, 10, 10, 0.25);
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
           fill: #0a0a0a;
           fill-opacity: 0.6;
           -webkit-transition: fill-opacity ease-in-out 0.25s;
           transition: fill-opacity ease-in-out 0.25s;
         }
         
         .button-icon svg:hover {
           fill-opacity: 1;
         }
         
         :root {
           --header-height: 64px;
         }
         
         .wrapper {
            height: 100%;
            display: -ms-grid;
            display: grid;
                grid-template-areas: "carousal sidebar" "categories sidebar";
            -ms-grid-rows: 28rem auto;
                grid-template-rows: 28rem auto;
            -ms-grid-columns: auto 16rem;
                grid-template-columns: auto 16rem;
            gap: 2rem;
            padding-left: 2rem;
            padding-right: 2rem;
            max-width: 1464px;
            margin: 2rem auto;
         }
         
         #sidebar {
           -ms-grid-row: 1;
           -ms-grid-row-span: 2;
           -ms-grid-column: 2;
           grid-area: sidebar;
         }
         
         #carousal-content {
           -ms-grid-row: 1;
           -ms-grid-column: 1;
           grid-area: carousal;
         }
         
         @media screen and (max-width: 768px) {
           #carousal-content {
             margin-top: var(--header-height);
           }
         }
         
         #categories {
           -ms-grid-row: 2;
           -ms-grid-column: 1;
           grid-area: categories;
           display: -ms-grid;
           display: grid;
           -ms-grid-columns: 2fr minmax(10rem, 1fr);
               grid-template-columns: 2fr minmax(10rem, 1fr);
           grid-gap: 2rem;
         }
         
         @media screen and (max-width: 768px) {
           #categories {
             margin: 0 1.5rem 1.5rem 1.5rem;
             grid-gap: 1.5rem;
           }
         }
         
         @media screen and (max-width: 576px) {
           #categories {
             -ms-grid-columns: 1fr;
                 grid-template-columns: 1fr;
             margin: 0 1rem 1rem 1rem;
           }
         }
         
         #brands {
           display: -ms-grid;
           display: grid;
           -ms-grid-columns: (1fr)[4];
               grid-template-columns: repeat(4, 1fr);
           gap: 16px;
         }
         
         #brands .big-brand {
           min-height: 12rem;
           -ms-grid-column: 1;
           -ms-grid-column-span: 3;
           grid-column: 1 / 4;
           -ms-grid-row: 1;
           -ms-grid-row-span: 2;
           grid-row: 1 / 3;
         }
         
         @media screen and (max-width: 1280px) {
           #brands {
             -ms-grid-columns: (1fr)[3];
                 grid-template-columns: repeat(3, 1fr);
           }
           #brands .big-brand {
             -ms-grid-column: 1;
             -ms-grid-column-span: 2;
             grid-column: 1 / 3;
           }
         }
         
         @media screen and (max-width: 960px) {
           #brands {
             -ms-grid-columns: (1fr)[2];
                 grid-template-columns: repeat(2, 1fr);
           }
         }
         
         .brand {
           background-repeat: no-repeat;
           background-position: center;
           position: relative;
           background-color: white;
           cursor: pointer;
           -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
           border-radius: 4px;
           -webkit-transition: -webkit-box-shadow ease-in-out 0.35s;
           transition: -webkit-box-shadow ease-in-out 0.35s;
           transition: box-shadow ease-in-out 0.35s;
           transition: box-shadow ease-in-out 0.35s, -webkit-box-shadow ease-in-out 0.35s;
           background-size: cover;
           min-height: 8rem;
         }
         
         .brand:hover {
           -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16);
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16);
         }
         
         .promotion {
           background-repeat: no-repeat;
           background-position: center;
           position: relative;
           background-color: white;
           cursor: pointer;
           -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
           border-radius: 4px;
           -webkit-transition: -webkit-box-shadow ease-in-out 0.35s;
           transition: -webkit-box-shadow ease-in-out 0.35s;
           transition: box-shadow ease-in-out 0.35s;
           transition: box-shadow ease-in-out 0.35s, -webkit-box-shadow ease-in-out 0.35s;
           background-size: cover;
           margin-bottom: 1rem;
           height: 12rem;
         }
         
         .promotion .gard-overlay {
           border-radius: 4px;
           position: absolute;
           top: 0;
           bottom: 0;
           left: 0;
           right: 0;
           background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);
           padding: 1rem;
           display: -webkit-box;
           display: -ms-flexbox;
           display: flex;
           -webkit-box-orient: vertical;
           -webkit-box-direction: normal;
               -ms-flex-direction: column;
                   flex-direction: column;
           -webkit-box-pack: justify;
               -ms-flex-pack: justify;
                   justify-content: space-between;
         }
         
         .promotion:hover {
           -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16);
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16);
         }
         
         .promotion div {
           -ms-flex-item-align: end;
               align-self: flex-end;
         }
         
         :root {
           --header-height: 64px;
         }
         
         .sidebar-menu {
           display: -webkit-box;
           display: -ms-flexbox;
           display: flex;
           -webkit-box-orient: vertical;
           -webkit-box-direction: normal;
               -ms-flex-direction: column;
                   flex-direction: column;
           height: 100%;
         }
         
         .sidebar-menu .sidebar-gap {
           margin-bottom: 1rem;
         }
         
         .response-menu {
           display: none;
         }
         
         #overlay {
           display: none;
         }
         
         .sidebar-box {
           padding: 1rem;
           max-width: 100%;
           border-radius: 4px;
           background-color: rgba(10, 10, 10, 0.08);
           display: -webkit-box;
           display: -ms-flexbox;
           display: flex;
           -webkit-box-orient: vertical;
           -webkit-box-direction: normal;
               -ms-flex-direction: column;
                   flex-direction: column;
           -webkit-box-pack: justify;
               -ms-flex-pack: justify;
                   justify-content: space-between;
         }
         
         .sidebar-box h3, .sidebar-box hr, .sidebar-box ul, .sidebar-box button {
           -webkit-margin-after: 0.875rem;
                   margin-block-end: 0.875rem;
         }
         
         .sidebar-box h3:last-child, .sidebar-box hr:last-child, .sidebar-box ul:last-child, .sidebar-box button:last-child {
           -webkit-margin-after: 0;
                   margin-block-end: 0;
         }
         
         .leaders {
           padding: 0;
           width: 100%;
         }
         
         .leaders li {
           padding: 0 0.25rem;
           display: table;
         }
         
         .leaders li span {
           white-space: nowrap;
           display: table-cell;
           font-size: 0.875rem;
           line-height: 1.75rem;
         }
         
         .leaders li span:first-child {
           position: relative;
           overflow: hidden;
           /* Don't go underneath the price */
         }
         
         .leaders li span:first-child:after {
           /* dashes */
           content: "";
           position: absolute;
           bottom: 0.5em;
           /* Set as you want */
           margin-left: 0.5em;
           /* Keep same for the next span's left padding */
           width: 100%;
           border-bottom: 1px dashed rgba(10, 10, 10, 0.25);
         }
         
         .leaders li span + span {
           text-align: right;
           width: 1%;
           /* Trick it */
           vertical-align: bottom;
           /* Keep Price text bottom-aligned */
           padding-left: 0.5em;
         }
         
         .open-orders {
           padding: 1rem;
           max-width: 100%;
           border-radius: 4px;
           background-color: rgba(10, 10, 10, 0.08);
           display: -webkit-box;
           display: -ms-flexbox;
           display: flex;
           -webkit-box-orient: vertical;
           -webkit-box-direction: normal;
               -ms-flex-direction: column;
                   flex-direction: column;
           -webkit-box-pack: justify;
               -ms-flex-pack: justify;
                   justify-content: space-between;
           gap: 0.875rem;
         }
         
         @media screen and (max-width: 768px) {
           .sidebar-menu {
             background: white;
             padding: 2rem 2rem 3rem 2rem;
           }
           #sidebar {
             position: absolute;
             z-index: 900;
             min-width: 100vw;
           }
           #sidebar-sm {
             display: none;
             -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
                     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
             position: relative;
             margin-top: var(--header-height);
           }
           .response-menu {
             display: -webkit-box;
             display: -ms-flexbox;
             display: flex;
             -webkit-box-pack: center;
                 -ms-flex-pack: center;
                     justify-content: center;
             -webkit-box-sizing: border-box;
                     box-sizing: border-box;
             width: 100%;
             height: var(--header-height);
             background-color: white;
             -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
                     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
             position: fixed;
             top: var(--header-height);
             z-index: 500;
           }
           #overlay {
             background-color: rgba(0, 0, 0, 0.5);
             z-index: -100;
             position: fixed;
             /* Sit on top of the page content */
             display: none;
             /* Hidden by default */
             width: 100%;
             /* Full width (cover the whole page) */
             height: 100%;
             /* Full height (cover the whole page) */
             top: 0;
             left: 0;
             right: 0;
             bottom: 0;
           }
         }
         
         @media screen and (max-width: 576px) {
           .sidebar-menu {
             padding: 1rem 1rem 1.5rem 1rem;
           }
         }
         
         .card {
           display: -webkit-box;
           display: -ms-flexbox;
           display: flex;
           -webkit-box-orient: horizontal;
           -webkit-box-direction: normal;
               -ms-flex-direction: row;
                   flex-direction: row;
           -webkit-box-pack: justify;
               -ms-flex-pack: justify;
                   justify-content: space-between;
           background-color: rgba(10, 10, 10, 0.08);
           color: #1a1a1a;
           border-radius: 4px;
           padding: 1rem;
         }
         
         .card img {
           width: 3rem;
           -webkit-margin-start: 0.5rem;
                   margin-inline-start: 0.5rem;
         }
         
         .card p {
           line-height: 1.5rem;
         }
         
         .dark-card {
           background-color: #0a0a0a;
           color: white;
           font-weight: 500;
         }
         
         .b-img-01 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/8.jpg");
         }
         
         .b-img-02 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/7.jpg");
         }
         
         .b-img-03 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/16.jpg");
         }
         
         .b-img-04 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/17.jpg");
         }
         
         .b-img-05 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/18.jpg");
         }
         
         .b-img-06 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/19.jpg");
         }
         
         .b-img-07 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/23.jpg");
         }
         
         .b-img-08 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/6.jpg");
         }
         
         .b-img-09 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/22.jpg");
         }
         
         .b-img-10 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/10.jpg");
         }
         
         .b-img-11 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/11.jpg");
         }
         
         .b-img-12 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/12.jpg");
         }
         
         .b-img-13 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/13.jpg");
         }
         
         .b-img-14 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/21.jpg");
         }
         
         .b-img-15 {
           background-image: url("https://storage.pepperi.com/Beauty_demo/15.jpg");
         }
         
         .kits {
           background-image: url("https://storage.pepperi.com/Beauty_demo/1.jpg");
         }
         
         .arrivals {
           background-image: url("https://storage.pepperi.com/Beauty_demo/2.jpg");
         }
         
         .specials {
           background-image: url("https://storage.pepperi.com/Beauty_demo/5.jpg");
         }
         
         :root {
           --header-height: 64px;
         }
         
         #carousal-content {
           display: -ms-grid;
           display: grid;
         }
         
         .carousel {
           overflow: hidden;
           width: 100%;
           background: url("https://storage.pepperi.com/PreSales/NewFoodDemoImg/back.png");
           background-color: #e5e5e5;
           cursor: pointer;
           border-radius: 4px;
         }
         
         @media screen and (max-width: 768px) {
           .carousel {
             border-radius: 0;
           }
         }
         
         .slides {
           height: 100%;
           width: 100%;
           position: relative;
         }
         
         .slide {
           height: 100%;
           width: 100%;
           opacity: 0;
           -webkit-transition: opacity 1000ms;
           transition: opacity 1000ms;
           background-size: cover;
           background-position: center;
           background-repeat: no-repeat;
         }
         
         .slide .gard-overlay {
           position: absolute;
           top: 0;
           bottom: 0;
           left: 0;
           right: 0;
           background: linear-gradient(45deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);
           padding: 1.5rem;
           display: -webkit-box;
           display: -ms-flexbox;
           display: flex;
           -webkit-box-orient: horizontal;
           -webkit-box-direction: normal;
               -ms-flex-direction: row;
                   flex-direction: row;
           -webkit-box-pack: justify;
               -ms-flex-pack: justify;
                   justify-content: space-between;
         }
         
         @media screen and (max-width: 960px) {
           .slide .gard-overlay {
             background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);
             -webkit-box-orient: vertical;
             -webkit-box-direction: normal;
                 -ms-flex-direction: column;
                     flex-direction: column;
           }
         }
         
         .slide-text {
           -ms-flex-item-align: end;
               align-self: flex-end;
           text-align: left;
           color: white;
           opacity: 0;
           font-weight: 600;
           max-width: 35rem;
         }
         
         @media screen and (max-width: 960px) {
           .slide-text {
             -ms-flex-item-align: start;
                 align-self: flex-start;
           }
         }
         
         .slide-text #shop_now {
           font-size: 0.875rem;
           font-weight: 600;
           color: white;
           padding: 0.5em 0.7em;
           border-radius: 4px;
           background: green;
           margin-bottom: 0.25rem;
         }
         
         .slide-text .title {
           font-size: 2rem;
           margin-bottom: 0.25rem;
         }
         
         .slide-text .sub_title {
           font-size: 0.875rem;
         }
         
         .slide-text .desc {
           font-size: 1.25rem;
         }
         
         .slide:nth-child(1) {
           opacity: 1;
         }
         
         .slide-text:nth-child(1) {
           opacity: 1;
         }
         
         .slide[data-state="active"] {
           display: block;
         }
         
         .slide-controllers {
           -ms-flex-item-align: end;
               align-self: flex-end;
           display: -webkit-box;
           display: -ms-flexbox;
           display: flex;
         }
         
         .slide-controllers button {
           -webkit-margin-start: 1rem;
                   margin-inline-start: 1rem;
           background-color: rgba(255, 255, 255, 0.25);
           border-radius: 4px;
           -webkit-transition: background-color ease-in-out 0.25s, -webkit-box-shadow ease-in-out 0.125s;
           transition: background-color ease-in-out 0.25s, -webkit-box-shadow ease-in-out 0.125s;
           transition: background-color ease-in-out 0.25s, box-shadow ease-in-out 0.125s;
           transition: background-color ease-in-out 0.25s, box-shadow ease-in-out 0.125s, -webkit-box-shadow ease-in-out 0.125s;
           height: 3rem;
           width: 3rem;
           background-position: center;
           background-size: 2rem;
           background-repeat: no-repeat;
         }
         
         .slide-controllers button:hover {
           background-color: rgba(255, 255, 255, 0.4);
         }
         
         .slide-controllers button:active, .slide-controllers button:focus {
           -webkit-box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
                   box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
         }
         
         .slide-controllers .pause {
           background-image: url("https://storage.pepperi.com/PreSales/NewFoodDemoImg/pause.svg");
         }
         
         .slide-controllers .play {
           background-image: url("https://storage.pepperi.com/PreSales/NewFoodDemoImg/play.svg");
         }
         
         .indicators {
           background-color: rgba(255, 255, 255, 0.25);
           border-radius: 4px;
           -webkit-transition: background-color ease-in-out 0.25s, -webkit-box-shadow ease-in-out 0.125s;
           transition: background-color ease-in-out 0.25s, -webkit-box-shadow ease-in-out 0.125s;
           transition: background-color ease-in-out 0.25s, box-shadow ease-in-out 0.125s;
           transition: background-color ease-in-out 0.25s, box-shadow ease-in-out 0.125s, -webkit-box-shadow ease-in-out 0.125s;
           display: -webkit-box;
           display: -ms-flexbox;
           display: flex;
           -webkit-box-align: center;
               -ms-flex-align: center;
                   align-items: center;
           -ms-flex-pack: distribute;
               justify-content: space-around;
           height: 3rem;
           padding: 0 1rem;
           position: relative;
         }
         
         .indicators:hover {
           background-color: rgba(255, 255, 255, 0.4);
         }
         
         .indicators:active, .indicators:focus {
           -webkit-box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
                   box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
         }
         
         .indicators:active {
           -webkit-box-shadow: none;
                   box-shadow: none;
         }
         
         .radio-box {
           display: block;
           position: relative;
           cursor: pointer;
           -webkit-user-select: none;
              -moz-user-select: none;
               -ms-user-select: none;
                   user-select: none;
           height: 1.25rem;
           width: 1.25rem;
           -webkit-margin-end: 1rem;
                   margin-inline-end: 1rem;
         }
         
         .radio-box:last-child {
           -webkit-margin-end: 0;
                   margin-inline-end: 0;
         }
         
         .radio-box input {
           height: 1.25rem;
           width: 1.25rem;
           position: absolute;
           opacity: 0;
           cursor: pointer;
         }
         
         .radio-box input:checked ~ .radio-dot {
           background-color: #0a0a0a;
         }
         
         .radio-dot {
           position: absolute;
           top: 0;
           left: 0;
           height: 1.25rem;
           width: 1.25rem;
           background-color: rgba(10, 10, 10, 0.25);
           border-radius: 50%;
         }
         
         .radio-dot :after {
           content: "";
           position: absolute;
           display: none;
         }
         
         .radio-dot:hover {
           background-color: rgba(10, 10, 10, 0.4);
         }
         
         .radio-dot:active, .radio-dot:focus {
           -webkit-box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
                   box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
         }
         @media screen and (max-width: 1280px) {
          .hidden-on-web {
            display: none !important;
          }
        }
         #launcher
         {
           display: none;
         }
         /*# sourceMappingURL=style.css.map */
                  </style>
        <header id="header-section" class="header" style="margin: 0 auto;">
              <div class="header-start"> 
                <a id="logo" href="/HomePage" class="logo">
                  <img id="logo" src="" /> 
                </a>                                     
                <div id="header_btn_bar" class="links hidden-on-mobile">      
                </div>
              </div>
              <div class="header-end" id="right_additional_menu">
                <div class="dropdown shown-on-web">
                    <button class="button-weak button-icon" onclick="customHeader.closeMenu()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M19,16 C19.5522847,16 20,16.4477153 20,17 C20,17.5522847 19.5522847,18 19,18 L5,18 C4.44771525,18 4,17.5522847 4,17 C4,16.4477153 4.44771525,16 5,16 L19,16 Z M19,11 C19.5522847,11 20,11.4477153 20,12 C20,12.5522847 19.5522847,13 19,13 L5,13 C4.44771525,13 4,12.5522847 4,12 C4,11.4477153 4.44771525,11 5,11 L19,11 Z M19,6 C19.5522847,6 20,6.44771525 20,7 C20,7.55228475 19.5522847,8 19,8 L5,8 C4.44771525,8 4,7.55228475 4,7 C4,6.44771525 4.44771525,6 5,6 L19,6 Z" />
                        </svg>
                    </button>
                    <div class="dropdown-content-end" id="menuDropdown">
                    </div>
                </div>
                <div class="dropdown">
                    <button class="button-weak button-icon" onclick="customHeader.closeHamburgerMenu()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
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
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd"
                                        d="M21,20 C21.5522847,20 22,20.4477153 22,21 C22,21.5522847 21.5522847,22 21,22 L3,22 C2.44771525,22 2,21.5522847 2,21 C2,20.4477153 2.44771525,20 3,20 L21,20 Z M14.2071068,2.79289322 L18.2071068,6.79289322 C18.5976311,7.18341751 18.5976311,7.81658249 18.2071068,8.20710678 L9.70710678,16.7071068 C9.59733192,16.8168816 9.4635062,16.8995905 9.31622777,16.9486833 L3.31622777,18.9486833 C2.53446974,19.2092693 1.79073069,18.4655303 2.0513167,17.6837722 L4.0513167,11.6837722 C4.10040951,11.5364938 4.18311836,11.4026681 4.29289322,11.2928932 L12.7928932,2.79289322 C13.1834175,2.40236893 13.8165825,2.40236893 14.2071068,2.79289322 Z M10.9992709,7.414 L5.87403205,12.5401815 L4.58113883,16.4188612 L8.45981849,15.125968 L13.5852709,10 L10.9992709,7.414 Z M13.5,4.91421356 L12.4142709,6 L14.9992709,8.585 L16.0857864,7.5 L13.5,4.91421356 Z" />
                                </svg>
                                Change Password</span>
                            </li>
                            <li class="active" onclick="customHeader.logout();">
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd"
                                        d="M19,16.7002538 C19,17.4906313 18.534533,18.2068742 17.8122769,18.5278769 L10.7030692,21.6875248 C10.4507271,21.7996768 10.1552463,21.6860303 10.0430942,21.4336882 C10.0146811,21.3697587 10,21.3005782 10,21.230619 L10,10.2997462 C10,9.50936875 10.465467,8.79312576 11.1877231,8.47212308 L16.767,5.992 L7,5.95898437 L7,17 C7,17.5522847 6.55228475,18 6,18 C5.44771525,18 5,17.5522847 5,17 L5,5 C5,4.44771525 5.44771525,4 6,4 L18,4 C18.5522847,4 19,4.44771525 19,5 L19,16.7002538 Z" />
                                </svg>
                                Logout</span>
                            </li>
                        </ul>
                    </div>
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
        this.orderJsonPath,
        this.helperJsonPath,
        this.rightMenuJsonPath,
        this.leftMenuJsonPath,
        this.customHelperJsonPath
      ],
      cssURLs: [],
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
  };




  this.setUUIDandNav = function (in_catalog = null, in_transactionName = null, deepLink = null) {
    const uuid = customHeader.getSessionStorage('LastOpenTransactionUUID');
    if (uuid && uuid !== "undefined") {
      deepLink = deepLink.replace('{{UUID}}', uuid.replace(/-/g, ''));
      customHeader.navigation(deepLink);
    } else {
      customHeader.createNewOrder(in_catalog, in_transactionName, deepLink);
    }
  };



  customHeader.setSessionStorage = function (paramName, data) {
    sessionStorage.setItem(paramName, data);
  };

  customHeader.getSessionStorage = function (paramName) {
    return sessionStorage.getItem(paramName);
  };

  this.buildHTML = function () {
    this.transactionName = Transaction
    this.catalogName = Catalog
    document.getElementById("logo").src = logo
    customHeader.closeAllMenusListener();

    console.log(LeftMenu)
    customHeader.HeaderLeftMenu(LeftMenu);


    console.log(RightMenu)
    customHeader.RightMenu(RightMenu);
  }
  this.handleAction = function (item) {
    var deepLink = item.deepLink.replace(/\"/g, '%22');
    switch (item.action) {
      case 'navigation':
        return `customHeader.navigation('${deepLink}')`;
      case 'setUUIDandNav':
        return `customHeader.setUUIDandNav('${item.catalog}','${item.transaction}','${deepLink}')`;
      case 'openInNewTab':
        return `customHeader.openInNewTab('${deepLink}')`;
      case 'createNewActivity':
        return `customHeader.createNewActivity('${item.activity}','${deepLink}')`;
      case 'createNewTransaction':
        return `customHeader.createNewOrder('${item.catalog}','${item.transaction}','${deepLink}',true)`;
      case 'zendesk':
        return `location.href = 'javascript:$zopim.livechat.window.show()'`
    }
  }




}.apply(customHeader));