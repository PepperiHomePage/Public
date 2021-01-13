var CaruselData = [
    {
        title: '3 wines for $80',
        subTitle: 'Wines',
        imageURL: 'https://storage.pepperi.com/PreSales/NewFoodDemoImg/hero-Wine.jpg',
        description: 'The Taste Of Wine',
        buttonText: 'Buy wine now',
        time: 5000,
        deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%2294a76287-e375-4068-b753-d4cee02371ca%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
    },
    {
        title: ' Yes, we can',
        subTitle: 'Food',
        imageURL: 'https://storage.pepperi.com/PreSales/NewFoodDemoImg/hero - cannedFood.jpg',
        description: 'Check our Monthly Canned food promotion',
        buttonText: 'Buy now food',
        time: 5000,
        deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%2223263086-5e78-4db8-ad2f-da3cac60ddba%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
    },
    {
        title: 'Tiered Discount',
        subTitle: 'Promotions',
        imageURL: 'https://storage.pepperi.com/PreSales/NewFoodDemoImg/hero - Sale.jpg',
        description: 'Buy above $1000 get 5%, $2000 get 7%, $3000 get 8%',
        buttonText: 'Buy now promotions',
        time: 5000,
        deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22adcaf7e0-3730-4e25-ab7c-5f6627208741%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
    },
];

var shipping = {
    title: "Free delivery for orders over $250",
    buttonText: "Find out more",
    deepLink: "/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%223da50a6c-8a60-4b9c-93f6-a0c83de35072%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false"
};

var list = [
    {
        listLabel: "Meat",
        deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22MEAT-DOMESTIC%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
    },
    {
        listLabel: "Dairy",
        deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22CHEESE-DOMESTIC%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
    },
    {
        listLabel: "Dry products",
        deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22GROCERY-DOMESTIC%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=300&SearchAll=false'
    },
];



var left_top_img_left = {
    title: 'Pets',
    image: "https://storage.pepperi.com/PreSales/NewFoodDemoImg/Pets.png",
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22CHEESE-EU%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
}
var left_top_img_right = {
    title: 'Our delicatessen',
    image: "https://storage.pepperi.com/PreSales/NewFoodDemoImg/Meat.png",
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22CHEESE-NONEU%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
}
var left_bottom_img = {
    title: 'Top selling beverages',
    image: "https://storage.pepperi.com/PreSales/NewFoodDemoImg/Beverages.png",
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22GROCERY-IMPORTED%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
}
var midle_top_left_img = {
    title: 'Best Sellers',
    image: "https://storage.pepperi.com/PreSales/NewFoodDemoImg/bestSeller.jpg",
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22LABELS%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
}
var midle_bottom_left_img = {
    title: 'Ice Cream',
    image: "https://storage.pepperi.com/PreSales/NewFoodDemoImg/iceCream.png",
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22MEAT-DOMESTIC%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
}
var midle_right_img = {
    title: 'Fruits of the season',
    image: "https://storage.pepperi.com/PreSales/NewFoodDemoImg/Fruits.png",
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22MEAT-IMPORTED%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
}
var right_top_img = {
    title: 'Dairy',
    image: "https://storage.pepperi.com/PreSales/NewFoodDemoImg/Dairy.jpg",
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22PROMO%20ITEM%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
}
var right_bottom_img = {
    title: 'Bakery',
    image: "https://storage.pepperi.com/PreSales/NewFoodDemoImg/Bakery.jpg",
    deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
}