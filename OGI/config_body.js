var Transaction = 'Buyer Order';
var Catalog='ALL'
var blocks_config = {
    'active-order':
    {
        name: "My Current Order",
        table: [{
            text: "Order ID",
            field: "InternalID"
        }, {
            text: "Total",
            field: "GrandTotal"
        }, {
            text: "Frames",
            field: "QuantitiesTotal"
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
        link: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Ogi%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'https://pepperihomepage.github.io/Public/OGI/img/brand_OGI.jpg',
    },
    {
        link: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Seraphin%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'https://pepperihomepage.github.io/Public/OGI/img/brand_Seraphin.jpg',
    },
    {
        link: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Red%20Rose%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'https://pepperihomepage.github.io/Public/OGI/img/brand_Red%20Rose.jpg',
    },
    {
        link: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"DynamicFilter%5C":%5C"Item.TSASeries%5C",%5C"Value%5C":%5C"Shimmer%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Seraphin%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'https://pepperihomepage.github.io/Public/OGI/img/brand_Shimmer.jpg',
    },
    {
        link: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Ogi%20Kids%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'https://pepperihomepage.github.io/Public/OGI/img/brand_OGI%20Kids.jpg',
    },
    {
        link: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Scojo%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'https://pepperihomepage.github.io/Public/OGI/img/brand_SCOJO.jpg',
    }]
//Promotions block
var Promotions = [
    {
        title: "Top 10 Sellers",
        link: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22a58db397-4b63-4131-80fa-d8257aa33b34%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%225e41726a-2442-46e9-9825-c092569dc7a9%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        image: 'https://pepperihomepage.github.io/Public/OGI/img/1.Top%20sellers_promotions.jpg'
    },
    {
        title: "Recommended for you",
        link: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%223da50a6c-8a60-4b9c-93f6-a0c83de35072%5C%22%7D%22&TopPadding=0',
        image: 'https://pepperihomepage.github.io/Public/OGI/img/2.Recommendations_promotions.jpg'
    },
    {
        title: "Sign up for Newsletter",
        newsite: true,
        link: ' https://e.ogieyewear.com/p/4VWV-4WI/thank-you',
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
    deepLink: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"477be57a-521b-4b3d-8f04-11f4c6315e07%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Seraphin%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false'
},
{
    title: "The Sky's the Limit with OGI Eyewear",
    imageURL: 'https://pepperihomepage.github.io/Public/OGI/img/CarouselOGI.jpg',
    buttonText: 'See the Collection',
    time: 5000,
    deepLink: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Ogi%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false'
},
{
    title: 'New Seraphin Shimmer Capsule Collection',
    imageURL: 'https://pepperihomepage.github.io/Public/OGI/img/CarouselShimmer.jpg',
    buttonText: 'See the Collection',
    time: 5000,
    deepLink: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"DynamicFilter%5C":%5C"Item.TSASeries%5C",%5C"Value%5C":%5C"Shimmer%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Seraphin%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false'
},
{
    title: 'Discover Red Rose Fresh Styles',
    imageURL: 'https://pepperihomepage.github.io/Public/OGI/img/CarouselRR.jpg',
    buttonText: 'See the Collection',
    time: 5000,
    deepLink: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Red%20Rose%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false'
},
];
