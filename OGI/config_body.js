var Transaction = 'Buyer Order';
var Catalog='Ogi'
var blocks_config = {
    'submitted_orders':
    {
        name: "Last Orders",
        
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
    'active-order': {
        name: "My Current Order",
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
        img: 'https://cdn.pepperi.com/3904009/CustomizationFile/fe646a99-fc76-4d64-8dac-07a6c139d14b/OGI_Brand_Seraphin.jpg',
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
        img: 'https://pepperihomepage.github.io/Public/OGI/img/brand_OGI%20Kids.png',
    },
    {
        link: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Scojo%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'https://pepperihomepage.github.io/Public/OGI/img/brand_SCOJO.png',
    }]
//Promotions block
var Promotions = [
    {
        title: "Top Sellers",
        link: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22a58db397-4b63-4131-80fa-d8257aa33b34%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%225e41726a-2442-46e9-9825-c092569dc7a9%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        image: 'https://pepperihomepage.github.io/Public/OGI/img/1.Top%20sellers_promotions.jpg'
    },
    {
        title: "Recommended for you",
        link: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22edcb27c2-a47e-4f9c-9b31-4833ab1cee08%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%225e41726a-2442-46e9-9825-c092569dc7a9%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        image: 'https://pepperihomepage.github.io/Public/OGI/img/2.Recommendations_promotions.jpg'
    },
    {
        title: "Sign up for Newsletter",
        newsite: true,
        link: 'https://e.ogieyewear.com/p/4VWV-4WI/thank-you',
        image: 'https://pepperihomepage.github.io/Public/OGI/img/3.Newsletter_promotions.jpg'
    },
    {
        title: "Virtual Try on",
        newsite: true,
        link: 'https://www.ogieyewear.com/ogi-try-on',
        image: 'https://pepperihomepage.github.io/Public/OGI/img/4.VTO_promotions.jpg'
    }
]

var CaruselData = [{
    title: "Sky's the Limit with OGI Eyewear",
    imageURL: 'https://pepperihomepage.github.io/Public/OGI/img/sky_limit_new_ogi.jpg',
    imageURLIpad: 'https://pepperihomepage.github.io/Public/OGI/img/ipadbanners-ogi.png',
    imageURLIphone: 'https://pepperihomepage.github.io/Public/OGI/img/iphone-ogi.png',
    buttonText: 'See the Collection',
    time: 5000,
    deepLink: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Ogi%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false'
},
    {
    title: 'Try Seraphin latest styles',
    imageURL: 'https://pepperihomepage.github.io/Public/OGI/img/CarouselSeraphin.png',
    imageURLIpad: 'https://pepperihomepage.github.io/Public/OGI/img/ipadbanners-seraphin.png',
    imageURLIphone: 'https://pepperihomepage.github.io/Public/OGI/img/iphone-seraphin.png',
    buttonText: 'See the Collection',
    time: 5000,
    deepLink: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"477be57a-521b-4b3d-8f04-11f4c6315e07%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Seraphin%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false'
},

{
    title: 'New Seraphin Shimmer Capsule Collection',
    imageURL: 'https://pepperihomepage.github.io/Public/OGI/img/CarouselShimmer.png',
    imageURLIpad: 'https://pepperihomepage.github.io/Public/OGI/img/ipadbanners-shimmer.png',
    imageURLIphone: 'https://pepperihomepage.github.io/Public/OGI/img/iphone-shimmer.png',
    buttonText: 'View Timeless Seraphin Styles',
    time: 5000,
    deepLink: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"DynamicFilter%5C":%5C"Item.TSASeries%5C",%5C"Value%5C":%5C"Shimmer%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Seraphin%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false'
},
{
    title: 'Discover Red Rose Fresh Styles',
    imageURL: 'https://pepperihomepage.github.io/Public/OGI/img/CarouselRedRoseNew.png',
    imageURLIpad: 'https://pepperihomepage.github.io/Public/OGI/img/ipadbanners-redrose.png',
    imageURLIphone: 'https://pepperihomepage.github.io/Public/OGI/img/iphone-redrose.png',
    buttonText: 'See the Collection',
    time: 5000,
    deepLink: '/transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"c8ab1f8d-4ebe-4f0e-9735-0e58b50504c3%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Red%20Rose%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false'
},
];

var Footer = {
    CompanyTitle: "OGI EYEWEAR",
    CompanyLinks: [{
            Title: "Our Story",
            Link: "https://www.ogieyewear.com/our-story"
        },
        {
            Title: "General Terms and Conditions",
            Link: "https://brandfolder.com/s/77xf3gtqwhh4fh9xbj47f"
        },
        {
            Title: "News",
            Link: "https://www.ogieyewear.com/news"
        },
        {
            Title: "OGI in Press",
            Link: "https://www.ogieyewear.com/ogi-in-press"
        },
        {
            Title: "Sustainability",
            Link: "https://www.ogieyewear.com/sustainability"
        },
        {
            Title: "Privacy",
            Link: "https://www.ogieyewear.com/privacy-policy"
        }
    ],
    BrandTitle: "BRAND FOLDER",
    BrandLinks: [{
            Title: "OGI creative assets",
            Link: "https://brandfolder.com/s/fhkj88mvt7j3nztghm54k4s7"
        },
        {
            Title: "Seraphin creative assets",
            Link: "https://brandfolder.com/s/w4mx7vckxn7psjxc8tb7wbcr"
        },
        {
            Title: "Seraphin Shimmer creative assets",
            Link: "https://brandfolder.com/s/2tfzs9rb29pf7g6f8r5sxn6"
        },
        {
            Title: "Red Rose creative assets",
            Link: "https://brandfolder.com/s/ncnck6xkjxcrg3mk4nn2w4h"
        },
        {
            Title: "OGI Kids creative assets",
            Link: "https://brandfolder.com/s/8khfg5jh3ps5sknx5nxsvp"
        },
        {
            Title: "SCOJO New York creative assets",
            Link: "https://brandfolder.com/s/hgx5q88854tcbvq88t4bms"
        }
    ],
    SocialTitle: "SOCIAL MEDIA",
    SocialLinks: [{
            Title: "LinkedIn",
            Link: "https://www.linkedin.com/company/ogi-eyewear"
        },
        {
            Title: "Facebook",
            Link: "https://www.facebook.com/ogiframes"
        },
        {
            Title: "Twitter",
            Link: "https://twitter.com/OgiEyewear"
        },
        {
            Title: "Instagram",
            Link: "https://www.instagram.com/ogieyewear/"
        },
        {
            Title: "Pinterest",
            Link: "https://www.pinterest.com/ogieyewear/"
        },
        {
            Title: "Youtube",
            Link: "https://www.youtube.com/channel/UCazQOXpZYsn_i3VTHpuLWwg"
        }
    ],
    ContactTitle: "CONTACT US",
    ContactLinks: [{
            Title: "Sales Team",
            Link: "https://www.ogieyewear.com/ogi-sales-team"
        },
        {
            Title: "Customer Relations",
            Link: "https://www.ogieyewear.com/ogi-customer-relations"
        },
        {
            Title: "Shipping & Returns",
            Link: "https://www.ogieyewear.com/shipping-returns"
        },
        {
            Title: "Creative Team",
            Link: "https://www.ogieyewear.com/ogi-creative-team"
        },
        {
            Title: "Administration",
            Link: "https://www.ogieyewear.com/ogi-administration"
        },
        {
            Title: "CEO",
            Link: "https://www.ogieyewear.com/ogi-ceo"
        }
    ]
}