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