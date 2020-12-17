var Transaction = 'B2B Order';
var Catalog='ALL'
const logo = 'https://storage.pepperi.com/PreSales/beauty_demo/logo.png';

const LeftMenu = [
    {
      catalog: "ALL",
      transaction: "B2B Order",
      title: "Facial Cosmetics",
      action:"setUUIDandNav",
      deepLink: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227142a6f9-af48-4dba-a30d-85d89b2ed083%5C%22%7D%22'
    },
    {
      catalog: "ALL",
      transaction: "B2B Order",
      title: "Hands Cosmetics",
      action:"setUUIDandNav",
      deepLink: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22023bad44-a6d3-435b-928d-bab0a41b4dc6%5C%22%7D%22'
    },
  
    {
      catalog: "ALL",
      transaction: "B2B Order",
      title: "Hair Care",
      action:"setUUIDandNav",
      deepLink: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22696718b2-3431-4aad-b23a-8a6d7c824ef0%5C%22%7D%22'
    },
  
    {
      catalog: "ALL",
      transaction: "B2B Order",
      title: "Masks",
      action:"setUUIDandNav",
      deepLink: 'Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%222a7c613e-1e67-4497-af60-ae8a6633487a%5C%22%7D%22'
    },
    {
      catalog: "ALL",
      transaction: "Print Catalog",
      title: "Line Sheet",
      action:"createNewTransaction",
      deepLink: 'Transactions/scope_items/{{UUID}}'
    }
  ];
  const RightMenu = [
    {
      catalog: "ALL",
      transaction: "B2B Order",
      title: "Order Center",
      action: "setUUIDandNav",
      deepLink:
        "/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227142a6f9-af48-4dba-a30d-85d89b2ed083%5C%22%7D%22",
    },
    {
      title: "Activity",
      action: "navigation",
      deepLink: "list/all_activities",
    },
    {
      title: "Open Orders",
      action: "navigation",
      deepLink:
        "list/all_activities?listTabName=%5BGL%232a1f287e-c00c-41ae-975f-06731cec76c9%5DListView&listView=1&ListTitle=Open%20Orders&TopPadding=0",
    },
    {
      title: "Pay Invoices",
      action: "navigation",
      deepLink:
        "list/all_activities?listTabName=%5BGL%23d620d113-470a-4de0-a610-85cf7534b454%5DListView&listView=1&ListTitle=Invoices&TopPadding=0",
    },
  ];