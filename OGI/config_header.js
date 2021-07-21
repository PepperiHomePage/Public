var Transaction = 'Buyer Order';
var Catalog='Ogi'
const logo = 'https://assets2.brandfolder.io/bf-boulder-prod/qeawf1-8ab1pk-742hwo/v/25188232/original/OGI_Eyewear_Standard_RGB.png'
const DropDown = [
  {
    catalog: "Ogi",
    transaction: "B2B Order",
    title: "OGI Collection",
    action:"setUUIDandNav",
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Ogi%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false&SearchString='
  },
  {
    catalog: "Ogi",
    transaction: "B2B Order",
    title: "Seraphin Shimmer",
    action:"setUUIDandNav",
    deepLink: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.TSASeries%5C%22,%5C%22Value%5C%22:%5C%22Shimmer%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Seraphin%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false&SearchString='
  },

  {
    catalog: "Ogi",
    transaction: "B2B Order",
    title: "Seraphin",
    action:"setUUIDandNav",
    deepLink: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Seraphin%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false&SearchString='
  },

  {
    catalog: "Ogi",
    transaction: "B2B Order",
    title: "Red Rose",
    action:"setUUIDandNav",
    deepLink: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Red%20Rose%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false&SearchString='
  },
  {
    catalog: "Ogi",
    transaction: "B2B Order",
    title: "OGI Kids",
    action:"setUUIDandNav",
    deepLink: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Ogi%20Kids%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false&SearchString='
  },
  {
    catalog: "Ogi",
    transaction: "B2B Order",
    title: "Scojo New York",
    action:"setUUIDandNav",
    deepLink: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Scojo%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false&SearchString='
  },
];
const LeftMenu = [
  {
    title: "Collections",
    customFunction: "customHeader.openDropDown()",
    customFunctionMobile: "customHeader.openDropDownMobile()",
    id: "select-menu-header",
    mobileId: "select-menu-header-mobile",
    customHtmlTag : "ul",
    specialConfig : true
  },
  {
    catalog: "Ogi",
    transaction: "Buyer Order",
    title: "New Arrivals",
    action:"setUUIDandNav",
    deepLink: 'transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"477be57a-521b-4b3d-8f04-11f4c6315e07%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"JsonFilter%5C%5C%5C":%5C%5C%5C"5e41726a-2442-46e9-9825-c092569dc7a9%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false'
  },
  {
    catalog: "Ogi",
    transaction: "Buyer Order",
    title: "Best Sellers",
    action:"setUUIDandNav",
    deepLink: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"a58db397-4b63-4131-80fa-d8257aa33b34%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"JsonFilter%5C%5C%5C":%5C%5C%5C"5e41726a-2442-46e9-9825-c092569dc7a9%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false'
  },
];
const RightMenu = [
  {
    catalog: "Ogi",
    transaction: "Buyer Order",
    title: "Go to Cart",
    customFunction: "openLastTransaction"
  },
  {
    catalog: "Ogi",
    transaction: "Buyer Order",
    title: "Favorites",
    icon:`          
	<svg class="end-icon" xmlns="http://www.w3.org/2000/svg" style="width:24px !important;height:24px !important" viewBox="0 0 24 24">
        	<path fill-rule="evenodd" d="M12.0000323,6.53227886 C11.3950379,5.80461298 10.3525058,5 8.70065923,5 C5.88880809,5 4,7.6077764 4,10.0428863 C4,13.5886357 10.8032276,18.3400072 11.5787506,18.8698594 C11.7056263,18.9562023 11.8531197,19 12,19 C12.1475017,19 12.2943695,18.9568286 12.42125,18.8698594 C13.196885,18.3399111 20,13.5884756 20,10.0428863 C20,7.6077764 18.1105525,5 15.2987014,5 C13.6475588,5 12.6049947,5.80461298 12.0000323,6.53227886 Z M6,10.2704482 C6,8.89952171 7.0278555,7 8.95673632,7 C10.7115926,7 11.3312748,8.51698222 11.3554777,8.57695251 C11.4563609,8.84352483 11.7111714,9.01777838 11.9959389,9.02008266 C12.2836064,9.02008266 12.5384007,8.84467697 12.6427535,8.58156106 C12.6681193,8.51693791 13.287834,7 15.042674,7 C16.9721171,7 18,8.89943309 18,10.2704778 C18,12.0902656 14.4708072,14.9895916 11.9994572,16.75 C9.5286031,14.9907733 6,12.0925994 6,10.2704482 Z" />
	</svg> 
    `,
    action:"setUUIDandNav",
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227142a6f9-af48-4dba-a30d-85d89b2ed083%5C%22%7D%22'
  },
  {
    title: "History",
    action:"navigation",
    deepLink: 'list/all_activities'
  },
]
/*actions:

setUUIDandNav
createNewTransaction
navigation
createNewActivity
openInNewTab
zendesk
*/