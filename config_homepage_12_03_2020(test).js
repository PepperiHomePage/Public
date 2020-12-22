var Transaction = 'B2B Order';
var Catalog='StoreFront Catalog'
var blocks_config = {
    'free_shipping': {
        text: "Free shipping for orders over $99",
        svg:"https://storage.pepperi.com/General/Icons/truck.svg"
    },
    'active-order':
    {
        name: "My Current Order",
        table: [{
            text: "SubTotal",
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
        name: "My Current Order",
        statuses: ["2"],
        table: ["ActionDateTime", "InternalID"]
    }
}

//Small images under "Our Brands"
var Brands = [
    {           
        link: 'transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"7c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Oligo%20Professional%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'https://princessprofessional.com/wp-content/uploads/2020/10/Oligo_Logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?CurrentTab="%7B%5C"JsonFilter%5C":%5C"7c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Reuzel%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'https://princessprofessional.com/wp-content/uploads/2020/10/Reuzel_Logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?CurrentTab="%7B%5C"JsonFilter%5C":%5C"7c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Living%20Proof%5C%5C%5C"%7D%5C"%7D"&TopPadding=100&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/10/Living_Proof_Logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"7c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Lakme%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'https://princessprofessional.com/wp-content/uploads/2020/10/Lakme_logo.png',
    }, 
	{
        link: 'transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"7c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Color%20WOW%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/10/ColorWOW_Logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"7c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"JKS%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'https://princessprofessional.com/wp-content/uploads/2020/10/jks_logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?SearchString=&CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.TSACategory2%5C%22,%5C%22Value%5C%22:%5C%22Framar%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.TSACategory1%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Accessories%5C%5C%5C%22,%5C%5C%5C%22Parent%5C%5C%5C%22:%5C%5C%5C%22%7B%5C%5C%5C%5C%5C%5C%5C%22DynamicFilter%5C%5C%5C%5C%5C%5C%5C%22:%5C%5C%5C%5C%5C%5C%5C%22Item.MainCategory%5C%5C%5C%5C%5C%5C%5C%22,%5C%5C%5C%5C%5C%5C%5C%22Value%5C%5C%5C%5C%5C%5C%5C%22:%5C%5C%5C%5C%5C%5C%5C%222-Tools%20And%20Appliances%5C%5C%5C%5C%5C%5C%5C%22%7D%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/10/Framar_Logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?SearchString=&CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.TSACategory2%5C%22,%5C%22Value%5C%22:%5C%22Product%20Club%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.TSACategory1%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Accessories%5C%5C%5C%22,%5C%5C%5C%22Parent%5C%5C%5C%22:%5C%5C%5C%22%7B%5C%5C%5C%5C%5C%5C%5C%22DynamicFilter%5C%5C%5C%5C%5C%5C%5C%22:%5C%5C%5C%5C%5C%5C%5C%22Item.MainCategory%5C%5C%5C%5C%5C%5C%5C%22,%5C%5C%5C%5C%5C%5C%5C%22Value%5C%5C%5C%5C%5C%5C%5C%22:%5C%5C%5C%5C%5C%5C%5C%222-Tools%20And%20Appliances%5C%5C%5C%5C%5C%5C%5C%22%7D%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/11/PC_logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?SearchString=&CurrentTab="%7B%5C"JsonFilter%5C":%5C"7c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"GK%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/10/GK_Logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?String=&CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Biotop%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/10/Biotop_logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?SearchString=&CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Babe%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/10/Babe_Logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?SearchString=&CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Aluram%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/10/Aluram_logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab="%7B%5C"JsonFilter%5C":%5C"7c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Megix10%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/10/Megix10_logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Saints%20And%20Sinners%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/11/Saintssinners_logo.png'
    },
	{
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Pai%20Shau%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/11/Paishau_logo.png'
    },
    {
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Neuma%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/10/Neuma_Logo.png',
    },
	{
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22N4%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/11/N4_logo.png',
    },	
    {
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab="%7B%5C"JsonFilter%5C":%5C"7c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Ethica%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/10/Ethica_Logo.png',
    },
	{
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Keranique%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/11/KQ_logo.png',
    },
	{
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Uniq%20One%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/11/uniqone_logo.png',
    },
	{
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Style%20Edit%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/11/StyleEdit_logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab="%7B%5C"JsonFilter%5C":%5C"7c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C",%5C"Parent%5C":%5C"%7B%5C%5C%5C"DynamicFilter%5C%5C%5C":%5C%5C%5C"Item.MainCategory%5C%5C%5C",%5C%5C%5C"Value%5C%5C%5C":%5C%5C%5C"Lilash%20And%20Librow%5C%5C%5C"%7D%5C"%7D"&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/10/LIlash_Logo.png',
    },
	{
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Neu%20LASH%20and%20Neu%20BROW%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/11/NeuLash_logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Sunlights%20Balayage%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/11/Sunlights_logo.png',
    },
    {
        link: 'transactions/scope_items/{{UUID}}?SearchString=SCurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Nufree%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/11/Nufree_logo.png',
    },
	{
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22CBD%20Daily%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/11/CBDdaily_logo.png',
    },
	{
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Hemp%20Beauty%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/11/Hemp_Beaut-_logo.png',
    },
	{
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.TSACategory2%5C%22,%5C%22Value%5C%22:%5C%22Gama%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.TSACategory1%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Appliances%5C%5C%5C%22,%5C%5C%5C%22Parent%5C%5C%5C%22:%5C%5C%5C%22%7B%5C%5C%5C%5C%5C%5C%5C%22DynamicFilter%5C%5C%5C%5C%5C%5C%5C%22:%5C%5C%5C%5C%5C%5C%5C%22Item.MainCategory%5C%5C%5C%5C%5C%5C%5C%22,%5C%5C%5C%5C%5C%5C%5C%22Value%5C%5C%5C%5C%5C%5C%5C%22:%5C%5C%5C%5C%5C%5C%5C%222-Tools%20And%20Appliances%5C%5C%5C%5C%5C%5C%5C%22%7D%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/10/Gamma_Logo.png',
    },
	{
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.TSACategory2%5C%22,%5C%22Value%5C%22:%5C%22T3%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.TSACategory1%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Appliances%5C%5C%5C%22,%5C%5C%5C%22Parent%5C%5C%5C%22:%5C%5C%5C%22%7B%5C%5C%5C%5C%5C%5C%5C%22DynamicFilter%5C%5C%5C%5C%5C%5C%5C%22:%5C%5C%5C%5C%5C%5C%5C%22Item.MainCategory%5C%5C%5C%5C%5C%5C%5C%22,%5C%5C%5C%5C%5C%5C%5C%22Value%5C%5C%5C%5C%5C%5C%5C%22:%5C%5C%5C%5C%5C%5C%5C%222-Tools%20And%20Appliances%5C%5C%5C%5C%5C%5C%5C%22%7D%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/10/t3_Logo.png',
    },
	{
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.TSACategory2%5C%22,%5C%22Value%5C%22:%5C%22Croc%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.TSACategory1%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Appliances%5C%5C%5C%22,%5C%5C%5C%22Parent%5C%5C%5C%22:%5C%5C%5C%22%7B%5C%5C%5C%5C%5C%5C%5C%22DynamicFilter%5C%5C%5C%5C%5C%5C%5C%22:%5C%5C%5C%5C%5C%5C%5C%22Item.MainCategory%5C%5C%5C%5C%5C%5C%5C%22,%5C%5C%5C%5C%5C%5C%5C%22Value%5C%5C%5C%5C%5C%5C%5C%22:%5C%5C%5C%5C%5C%5C%5C%222-Tools%20And%20Appliances%5C%5C%5C%5C%5C%5C%5C%22%7D%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        img: 'http://princessprofessional.com/wp-content/uploads/2020/11/croc_logo.png',
    },]

//Medium images next to "Our brands"
var Promotions = [
    {
        title: "Brazilian Blowout",
        buttonText: "Shop Now",
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Brazilian%20Blowout%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        image: 'http://princessprofessional.com/wp-content/uploads/2020/11/Medium-Image-1.png'
    },
    {
        title: "B3 Brazilian Bond Build3r",
        buttonText: "Shop Now",
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22B3%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        image: 'http://princessprofessional.com/wp-content/uploads/2020/11/Medium-Image-2.png'
    },
    {
        title: "Leaf+Flower",
        buttonText: "Shop Now",
        link: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Leaf%20And%20Flower%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false',
        image: 'http://princessprofessional.com/wp-content/uploads/2020/11/Medium-Image-3.png'
    }
]

//Large banner images
var CaruselData = [{

    imageURL: 'http://princessprofessional.com/wp-content/uploads/2020/12/Main-image1.png',
    buttonText: 'Shop Now',
    title: 'NEW: CBD Molecular Skin Shield',
    description: 'Stop dry chapped skin',
    deepLink: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%227c36fb8f-c04e-4435-bc7a-315ef721ca6c%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Leaf%20And%20Flower%5C%5C%5C%22%7D%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&SearchAll=false'
},
{

    imageURL: 'http://princessprofessional.com/wp-content/uploads/2020/11/BP-USA-USA-Holiday-2020.png',
    buttonText: 'Shop Now',
    title: 'BIOTOP Holiday Boxes',
    description:'',
    deepLink: 'transactions/scope_items/{{UUID}}?SearchString=CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.TSAOnPromotion%5C%22,%5C%22Value%5C%22:%5C%22On%20Promotion%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22DynamicFilter%5C%5C%5C%22:%5C%5C%5C%22Item.MainCategory%5C%5C%5C%22,%5C%5C%5C%22Value%5C%5C%5C%22:%5C%5C%5C%22Biotop%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0&SearchAll=false'
}
];