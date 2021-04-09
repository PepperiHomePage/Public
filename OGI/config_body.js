var Transaction = 'B2B Order';
var Catalog='ALL'
var blocks_config = {
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
    }
    ,
    'submitted_orders': {
        name: "Last Orders",
        statuses: ["2"],
        table: ["ActionDateTime", "InternalID"]
    }
}
var Brands = [
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Hair%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22696718b2-3431-4aad-b23a-8a6d7c824ef0%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: 'https://pepperihomepage.github.io/Public/OGI/img/brand_OGI.jpg',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22Dry%20Shampoo%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22696718b2-3431-4aad-b23a-8a6d7c824ef0%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: 'https://pepperihomepage.github.io/Public/OGI/img/brand_Seraphin.jpg',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22Co%20Wash%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22696718b2-3431-4aad-b23a-8a6d7c824ef0%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0',
        img: 'https://pepperihomepage.github.io/Public/OGI/img/brand_Red%20Rose.jpg',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Treatments%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22023bad44-a6d3-435b-928d-bab0a41b4dc6%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0',
        img: 'https://pepperihomepage.github.io/Public/OGI/img/brand_Shimmer.jpg',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Treatments%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22023bad44-a6d3-435b-928d-bab0a41b4dc6%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0',
        img: 'https://pepperihomepage.github.io/Public/OGI/img/brand_OGI%20Kids.jpg',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Face%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%227142a6f9-af48-4dba-a30d-85d89b2ed083%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: 'https://pepperihomepage.github.io/Public/OGI/img/brand_SCOJO.jpg',

    }]
//Promotions block
var Promotions = [
    {
        title: "Top 10 Sellers",
        link: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22e3c559be-8581-4313-9095-cb5c113c3564%5C%22%7D%22&TopPadding=0&SmartSearch=%5B%7B%22ApiName%22:%22ItemMainCategory%22,%22ComparisonType%22:%22Values%22,%22Values%22:%5B%22Paul%20Pitchell%22%5D%7D%5D',
        image: 'https://pepperihomepage.github.io/Public/OGI/img/1.Top%20sellers_promotions.jpg'
    },
    {
        title: "Recommendations for You",
        link: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%223da50a6c-8a60-4b9c-93f6-a0c83de35072%5C%22%7D%22&TopPadding=0',
        image: 'https://pepperihomepage.github.io/Public/OGI/img/2.Recommendations_promotions.jpg'
    },
    {
        title: "Sign up for Newsletter",
        link: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22e3c559be-8581-4313-9095-cb5c113c3564%5C%22%7D%22&TopPadding=0&SmartSearch=%5B%7B%22ApiName%22:%22ItemMainCategory%22,%22ComparisonType%22:%22Values%22,%22Values%22:%5B%22Beauty%20%26%20Make%20Up%22%5D%7D%5D',
        image: 'https://pepperihomepage.github.io/Public/OGI/img/3.Newsletter_promotions.jpg'
    },
    {
        title: "Virtual Try on",
        link: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22e3c559be-8581-4313-9095-cb5c113c3564%5C%22%7D%22&TopPadding=0&SmartSearch=%5B%7B%22ApiName%22:%22ItemMainCategory%22,%22ComparisonType%22:%22Values%22,%22Values%22:%5B%22Beauty%20%26%20Make%20Up%22%5D%7D%5D',
        image: 'https://pepperihomepage.github.io/Public/OGI/img/4.VTO_promotions.jpg'
    }
]

var CaruselData = [{

    title: 'View Seraphin Spring 2021 Collection',
    imageURL: 'https://pepperihomepage.github.io/Public/OGI/img/CarouselSeraphin.jpg',
    buttonText: 'See the Collection',
    time: 5000,
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22defaef5e-e6d3-4b1e-b53c-2fa41f700168%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
},
{

    title: "The Sky's the Limit with OGI Eyewear",
    imageURL: 'https://pepperihomepage.github.io/Public/OGI/img/CarouselOGI.jpg',
    buttonText: 'See the Collection',
    time: 5000,
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22defaef5e-e6d3-4b1e-b53c-2fa41f700168%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
},
{

    title: 'New Seraphin Shimmer Capsule Collection',
    imageURL: 'https://pepperihomepage.github.io/Public/OGI/img/CarouselShimmer.jpg',
    buttonText: 'See the Collection',
    time: 5000,
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22defaef5e-e6d3-4b1e-b53c-2fa41f700168%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
},
{

    title: 'Discover Red Rose Fresh Styles',
    imageURL: 'https://pepperihomepage.github.io/Public/OGI/img/CarouselRR.jpg',
    buttonText: 'See the Collection',
    time: 5000,
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22defaef5e-e6d3-4b1e-b53c-2fa41f700168%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
},
];
