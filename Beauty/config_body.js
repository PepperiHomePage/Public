var Transaction = 'B2B Order';
var Catalog='ALL'
var blocks_config = {
    'free_shipping': {
        text: "Free shipping for orders over $",
        field: "TSAFreeShipping",
        svg:"https://storage.pepperi.com/General/Icons/truck.svg"
    },
    'account_balance': {
        text: "Account Balance",
        field: "TSACreditLimit",
        measure_unit: "Points",
        svg:"https://storage.pepperi.com/General/Icons/balance.svg"
    },
    'active-order':
    {
        name: "My Current Order",
        table: [{
            text: "Sub Total",
            field: "SubTotal"
        }, {
            text: "Total Quantity",
            field: "QuantitiesTotal"
        }, {
            text: "Total Sum",
            field: "GrandTotal"
        }]
    },
    'submitted_orders': {
        name: "Last Orders",
        statuses: ["2"],
        table: ["ActionDateTime", "InternalID"]
    },
    'open_invoices': {
//        ​field: "TSACreditLimit",
//        measure_unit:"$", 
//        svg: "https://storage.pepperi.com/PreSales/NewFoodDemoImg/invoice.svg", 
//        text: "Open Invoices", 
//        function:`onclick="customHomepage.createNewActivity('Invoice Payment','activities/details/{​{​UUID}​}​')"`
    }​,
}
var Brands = [
    {
        bigImage: true,
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22Face%20Serums%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22023bad44-a6d3-435b-928d-bab0a41b4dc6%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: 'https://storage.pepperi.com/Beauty_demo/8.jpg',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Hair%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22696718b2-3431-4aad-b23a-8a6d7c824ef0%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: 'https://storage.pepperi.com/Beauty_demo/7.jpg',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22Dry%20Shampoo%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22696718b2-3431-4aad-b23a-8a6d7c824ef0%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: 'https://storage.pepperi.com/Beauty_demo/16.jpg',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22Co%20Wash%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22696718b2-3431-4aad-b23a-8a6d7c824ef0%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0',
        img: 'https://storage.pepperi.com/Beauty_demo/17.jpg',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Treatments%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22023bad44-a6d3-435b-928d-bab0a41b4dc6%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0',
        img: 'https://storage.pepperi.com/Beauty_demo/18.jpg',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Treatments%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22023bad44-a6d3-435b-928d-bab0a41b4dc6%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0',
        img: 'https://storage.pepperi.com/Beauty_demo/19.jpg',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Face%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%227142a6f9-af48-4dba-a30d-85d89b2ed083%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: 'https://storage.pepperi.com/Beauty_demo/23.jpg',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%223da50a6c-8a60-4b9c-93f6-a0c83de35072%5C%22%7D%22&TopPadding=0',
        img: 'https://storage.pepperi.com/Beauty_demo/6.jpg',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22New%20Arrivals%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22696718b2-3431-4aad-b23a-8a6d7c824ef0%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: 'https://storage.pepperi.com/Beauty_demo/22.jpg',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22023bad44-a6d3-435b-928d-bab0a41b4dc6%5C%22%7D%22',
        img: 'https://storage.pepperi.com/Beauty_demo/10.jpg',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22New%20Arrivals%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22696718b2-3431-4aad-b23a-8a6d7c824ef0%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: 'https://storage.pepperi.com/Beauty_demo/11.jpg',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%228cf1f19b-9815-40ea-becf-6eced87d910e%5C%22%7D%22&TopPadding=0',
        img: 'https://storage.pepperi.com/Beauty_demo/12.jpg',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22fcef195d-fcdd-4ce6-b6e7-f506bc92c46c%5C%22%7D%22&TopPadding=0',
        img: 'https://storage.pepperi.com/Beauty_demo/13.jpg',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Face%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%227142a6f9-af48-4dba-a30d-85d89b2ed083%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: 'https://storage.pepperi.com/Beauty_demo/21.jpg',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Masks%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%222a7c613e-1e67-4497-af60-ae8a6633487a%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0',
        img: 'https://storage.pepperi.com/Beauty_demo/15.jpg',

    }]
//Promotions block
var Promotions = [
    {
        title: "New kits by Paul Pitchell",
        buttonText: "Shop Now",
        link: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22e3c559be-8581-4313-9095-cb5c113c3564%5C%22%7D%22&TopPadding=0&SmartSearch=%5B%7B%22ApiName%22:%22ItemMainCategory%22,%22ComparisonType%22:%22Values%22,%22Values%22:%5B%22Paul%20Pitchell%22%5D%7D%5D',
        image: 'https://storage.pepperi.com/Beauty_demo/1.jpg'
    },
    {
        title: "New Arrivals",
        buttonText: "Shop Now",
        link: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%223da50a6c-8a60-4b9c-93f6-a0c83de35072%5C%22%7D%22&TopPadding=0',
        image: 'https://storage.pepperi.com/Beauty_demo/2.jpg'
    },
    {
        title: "This month specials",
        buttonText: "Shop Now",
        link: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22e3c559be-8581-4313-9095-cb5c113c3564%5C%22%7D%22&TopPadding=0&SmartSearch=%5B%7B%22ApiName%22:%22ItemMainCategory%22,%22ComparisonType%22:%22Values%22,%22Values%22:%5B%22Beauty%20%26%20Make%20Up%22%5D%7D%5D',
        image: 'https://storage.pepperi.com/Beauty_demo/5.jpg'
    }
]

var CaruselData = [{

    title: 'New Promotional Kits',
    imageURL: 'http://storage.pepperi.com/Beauty_demo/3.jpg',
    description: 'Buy kits and products at amazing sale prices, starting at $19',
    buttonText: 'Brands',
    time: 5000,
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22defaef5e-e6d3-4b1e-b53c-2fa41f700168%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
},
{

    title: 'Monthly Promo',
    imageURL: 'http://storage.pepperi.com/Beauty_demo/4.jpg',
    description: 'Get 50% off all make up products with purchase of $500 and above',
    buttonText: 'Specials',
    time: 5000,
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22defaef5e-e6d3-4b1e-b53c-2fa41f700168%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
},
{

    title: 'Now Available',
    imageURL: 'http://storage.pepperi.com/Beauty_demo/5.jpg',
    description: 'Enjoy launch prices of the new 2020 skin care range',
    buttonText: 'Brands',
    time: 5000,
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22defaef5e-e6d3-4b1e-b53c-2fa41f700168%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
},
];
customHomepage.test = "test"