var CaruselData = [{
  title: 'Special Sweet Sale',
  imageURL: 'https://storage.pepperi.com/PreSales/NewFoodDemoImg/Banner-01.jpg',
  description: '4 Macaron box by BAKELUV for $20',
  buttonText: 'Bakery',
  comment: {
    header: 'Status:&nbsp;',
  },
  time: 5000,
  deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22defaef5e-e6d3-4b1e-b53c-2fa41f700168%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
},
{
  title: 'Special Sweet Sale',
  imageURL: 'https://storage.pepperi.com/PreSales/NewFoodDemoImg/Banner-02.jpg',
  description: '4 Macaron box by BAKELUV for $20',
  buttonText: 'Beverages',
  comment: {
    header: 'Status:&nbsp;',
  },
  time: 5000,
  deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22defaef5e-e6d3-4b1e-b53c-2fa41f700168%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
},
{
  title: 'Tiered Discount',
  imageURL: 'https://storage.pepperi.com/PreSales/NewFoodDemoImg/Banner-03.jpg',
  description: 'Buy above $1000 get 5%, $2000 get 7%, $3000 get 8%',
  buttonText: 'Fruits & Vegetables',
  comment: {
    header: 'Status:&nbsp;',
    text: 'Comming soon'
  },
  time: 5000,
  deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22defaef5e-e6d3-4b1e-b53c-2fa41f700168%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
},
];
var udtTable = {
  udtOfItemsStorage: { name: "List Items" },
  udtOfCategotyListStorage: { name: "Homepage Lists" }
};
var ImagesBottomBlock = [
  {
    leftPart: {
      leftTop: {
        deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%228081b582-f69c-4d14-b063-72dd884ba1b1%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=133.3333282470703&SearchAll=false&SearchString=',
        img: 'https://storage.pepperi.com/PreSales/NewFoodDemoImg/New_Arrivals.jpg',
        overlay: 'New Arrivals'
      },
      leftBottom: {
        deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%221193386f-d8c0-4323-bb75-b5cc8c76384f%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false',
        img: 'https://storage.pepperi.com/PreSales/NewFoodDemoImg/Best_Sellers.jpg',
        overlay: 'Best Sellers'
      }
    },
    middlePart: {
      leftTop: {
        deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.MainCategory%5C%22,%5C%22Value%5C%22:%5C%22Fruits%20%26%20Vegetables%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%224cb18aba-1986-43a0-a5d1-f53433c6a589%5C%5C%5C%22%7D%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false',
        img: 'https://storage.pepperi.com/PreSales/NewFoodDemoImg/Fruits.jpg',
        overlay: 'Fruits'
      },
      leftBottom: {
        deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.MainCategory%5C%22,%5C%22Value%5C%22:%5C%22Fruits%20%26%20Vegetables%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%224cb18aba-1986-43a0-a5d1-f53433c6a589%5C%5C%5C%22%7D%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false',
        img: 'https://storage.pepperi.com/PreSales/NewFoodDemoImg/Vegetables.jpg',
        overlay: 'Vegetables'
      },
      rightTop: {
        deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.MainCategory%5C%22,%5C%22Value%5C%22:%5C%22Beverages%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%224cb18aba-1986-43a0-a5d1-f53433c6a589%5C%5C%5C%22%7D%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false&SearchString=',
        img: 'https://storage.pepperi.com/PreSales/NewFoodDemoImg/Soft-Drinks.jpg',
        overlay: 'Soft Drinks'
      },
      rightBottom: {
        deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.MainCategory%5C%22,%5C%22Value%5C%22:%5C%22Snacks%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%224cb18aba-1986-43a0-a5d1-f53433c6a589%5C%5C%5C%22%7D%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false',
        img: 'https://storage.pepperi.com/PreSales/NewFoodDemoImg/Candies.jpg',
        overlay: 'Candy land'
      }
    },
    rigthPart: {
      rightTop: {
        deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.MainCategory%5C%22,%5C%22Value%5C%22:%5C%22Dairy%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%224cb18aba-1986-43a0-a5d1-f53433c6a589%5C%5C%5C%22%7D%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false',
        img: 'https://storage.pepperi.com/PreSales/NewFoodDemoImg/Dairy.jpg',
        overlay: 'Dairy'
      },
      rightBottom: {
        deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.MainCategory%5C%22,%5C%22Value%5C%22:%5C%22Grains%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%224cb18aba-1986-43a0-a5d1-f53433c6a589%5C%5C%5C%22%7D%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false',
        img: 'https://storage.pepperi.com/PreSales/NewFoodDemoImg/Ingerdeants.jpg',
        overlay: 'Dry Ingredients'
      }
    }
  }

];
var blocks_config = {
  'credit_line': {
    heading: "Credit line",
    field: "TSACredit",
    svg: "https://storage.pepperi.com/PreSales/NewFoodDemoImg/credit.svg"
  },
  'invoice-balance': {
    heading: "Open Invoices",
    field: ["TSA130Days", "TSA31to60Days", "TSA6190Days"],
    type: "Aging Line",
    status: ["2", "19"],
    svg: "https://storage.pepperi.com/PreSales/NewFoodDemoImg/invoice.svg"
  }
}
var replenishment = {
  catalogUUID: "af13721e-0924-4371-9e4b-38a4f425a693",
  typeName: "Replenishment",
  requestID: "Transactions/Cart/{{UUID}}"
}
var aging = {
  typeName: "Aging Line",
  requestID: "list/all_activities?listTabName=%5BGL%23ea471fa6-f4e0-495a-85c7-5685229f3c8b%5DListView&listView=1&ListTitle=Aging&TopPadding=0"
}
