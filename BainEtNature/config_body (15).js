var Transaction = 'Commande B2B';
var Catalog='B2B'
var blocks_config = {
    'free_shipping': {
        text: "",
        field: "TSAFreeShipping",
        svg:"https://storage.pepperi.com/General/Icons/truck.svg"
    },
    'account_balance': {
        text: "Point",
        field: "TSACreditLimit",
        measure_unit: "Points",
        svg:"https://storage.pepperi.com/General/Icons/balance.svg"
    },
    'active-order':
    {
        name: "Commande en cours",
        table: [{
            text: "Sous-Total",
            field: "SubTotal"
        }, {
            text: "Total Quantit ",
            field: "QuantitiesTotal"
        }, {
            text: "Total HT",
            field: "GrandTotal"
        }]
    }
    ,
    'submitted_orders': {
        name: "Derni re commande",
        statuses: ["2"],
        table: ["ActionDateTime", "InternalID"]
    }
}
var Brands = [
    {
        bigImage: true,
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22Face%20Serums%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22023bad44-a6d3-435b-928d-bab0a41b4dc6%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: '',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Hair%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22696718b2-3431-4aad-b23a-8a6d7c824ef0%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: '',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22Dry%20Shampoo%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22696718b2-3431-4aad-b23a-8a6d7c824ef0%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: '',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22Co%20Wash%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22696718b2-3431-4aad-b23a-8a6d7c824ef0%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0',
        img: '',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Treatments%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22023bad44-a6d3-435b-928d-bab0a41b4dc6%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0',
        img: '',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Treatments%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22023bad44-a6d3-435b-928d-bab0a41b4dc6%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0',
        img: '',
    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Face%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%227142a6f9-af48-4dba-a30d-85d89b2ed083%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: '',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%223da50a6c-8a60-4b9c-93f6-a0c83de35072%5C%22%7D%22&TopPadding=0',
        img: '',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22New%20Arrivals%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22696718b2-3431-4aad-b23a-8a6d7c824ef0%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: '',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22023bad44-a6d3-435b-928d-bab0a41b4dc6%5C%22%7D%22',
        img: '',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop2%5C%22,%5C%22Value%5C%22:%5C%22New%20Arrivals%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%22696718b2-3431-4aad-b23a-8a6d7c824ef0%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: '',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%228cf1f19b-9815-40ea-becf-6eced87d910e%5C%22%7D%22&TopPadding=0',
        img: '',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22fcef195d-fcdd-4ce6-b6e7-f506bc92c46c%5C%22%7D%22&TopPadding=0',
        img: '',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Face%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%227142a6f9-af48-4dba-a30d-85d89b2ed083%5C%5C%5C%22%7D%5C%22%7D%22&amp;TopPadding=0',
        img: '',

    },
    {
        link: '/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.Prop1%5C%22,%5C%22Value%5C%22:%5C%22Masks%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%222a7c613e-1e67-4497-af60-ae8a6633487a%5C%5C%5C%22%7D%5C%22%7D%22&TopPadding=0',
        img: '',

    }]
//Promotions block
var Promotions = [
    {
        title: "MOANA",
        buttonText: "Shop Now",
        link: 'Transactions/scope_items/3f26ad66-86f7-4661-bd86-6f9c35e684d6?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22e3c559be-8581-4313-9095-cb5c113c3564%5C%22%7D%22&TopPadding=0&SmartSearch=%5B%7B%22ApiName%22:%22ItemMainCategory%22,%22ComparisonType%22:%22Values%22,%22Values%22:%5B%22Paul%20Pitchell%22%5D%7D%5D',
        image: 'https://uce5b188caa1b887b7857c2a01c6.previews.dropboxusercontent.com/p/thumb/ABBiFjjJwlKYkBX2EqpkPz1QdZzfFnuWEMDhaBdpzoxyy8-7k5SofBPLdJh_48eWpyRSZQT5yMqHA042FIx7_S0Sm__yhaCXFKEaX97oEUfocJBzm7w2O4KXZIk2n4ivfzCR88g5tLWgMkAFhqYISyixAGtWc7NuAg0MFhzcj6EbECNDOjhj3cPisKCi4CvsesEHKugMY3f-53ue4Kmc1vBW8tZRvlSwjASvlpxH8pJleeJqWMJ7dSDgoBBVGxi98ZmFscoeovsyacs-N296gFangL5gH3z_feyiEOQ76Dv6PdSwdwJhZt5-fsm0-kCUCLXUzOH3C53X1Tz6-KPYB9yJg_d0bXKjkAvKcaFxhO06ug/p.jpeg?size=178x178&size_mode=1'
    },
    {
        title: "DELIRIUM FLORAL",
        buttonText: "Shop Now",
        link: 'Transactions/scope_items/3f26ad66-86f7-4661-bd86-6f9c35e684d6?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%223da50a6c-8a60-4b9c-93f6-a0c83de35072%5C%22%7D%22&TopPadding=0',
        image: 'https://uca28b6d0df468f95c36bc842719.previews.dropboxusercontent.com/p/thumb/ABCaYaeBbe_2AjrIDtYvpl--AI9XGkHcSS5YCA7FJUW0w6YgbBFTn0zwKKSjowOmYw-ux9IrSUkU2u4LBtYUitK-rjxOwNDenTmE9hyR9RhlUdgANMPf-AWjGd-fQfH9smcicNOKOn9WzHqlmt2q8fApOPiZC3JhtqGSoI7Hy7SHB4V1WPPumjht0cBpUEARVO1jr91tykB9_rdtPqb82sVA4OwXlok3pe3wIKPO9fHGHYlRrftPTcOGWN3d0pkFYVs3sxFj97G1oJTuhcp2e7UjeiWHYGX13gIT8wEkb025sTxvo8EaRaJlJhKqtNJOPHdP9GnxPRRVYAIiA90Gaxgg7TuUVyRTPXW26P2f1CwyJg/p.png?size=178x178&size_mode=1'
    },
    {
        title: "EAUX DE PARFUM",
        buttonText: "Shop Now",
        link: 'Transactions/scope_items/3f26ad66-86f7-4661-bd86-6f9c35e684d6?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22e3c559be-8581-4313-9095-cb5c113c3564%5C%22%7D%22&TopPadding=0&SmartSearch=%5B%7B%22ApiName%22:%22ItemMainCategory%22,%22ComparisonType%22:%22Values%22,%22Values%22:%5B%22Beauty%20%26%20Make%20Up%22%5D%7D%5D',
        image: 'https://ucf3fd058710ebdd242ac2db0301.previews.dropboxusercontent.com/p/thumb/ABCS8Mp4QFVXC64oHZYyhz0YV-rySBRqnjpsHVlOC6t_eB_JmwEIU3pXpjDlN-J8CdyABPGf2AZgsvUYaJJH9TNbaJqoKnheUq5OxUv6_n0lzRroADu_enLRgS-4fW4CtDRsEq1Ow5HgLfQLoH6bDOuljosv02HGrZgMutpexIqtNjSLgsDPyq3_fz4CkTNuc_jc4lK_tCO2JSZTKfIxvCZA_nuX4uaJmcLWgRfmCvJXnxsupHbGDKduY-sapTsayFQO9Qxsu_TBRl05CYkCRAUYRqxXErCk3jmPMeVtjtsudnwKt8JRUxJ5ShJazd-iwOai5ehnZc98m7uuIvdes_gD4JJh-S6iwLnSKg_2Zdl_5m09dVArc2DUQ3T5FjylIuE_FxUhwCV6xqq_1kXa8VG65n5vw20RQUUdvTtfXhOmwVRwGK_1YTkS93-hdHcobGn2kMsNYGcW9J_KFwSJMjzo_nPabQV8n1u069tgMAVfdg/p.jpeg?size=178x178&size_mode=1'
    },
    {
        title: "CR MES MAINS",
        buttonText: "Shop Now",
        link: 'Transactions/scope_items/3f26ad66-86f7-4661-bd86-6f9c35e684d6?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22e3c559be-8581-4313-9095-cb5c113c3564%5C%22%7D%22&TopPadding=0&SmartSearch=%5B%7B%22ApiName%22:%22ItemMainCategory%22,%22ComparisonType%22:%22Values%22,%22Values%22:%5B%22Beauty%20%26%20Make%20Up%22%5D%7D%5D',
        image: 'https://uce895097c8d466d39855b7dffe9.previews.dropboxusercontent.com/p/thumb/ABAU0JO9Z0DeivRjVLVOUSuJCvIhBgJdexdVA40HvNucGh9UDocfXCUXGZOMDb9mQ0AOYS3tBMBwyIO0e8oD2K3S9oI_PcJr8CvOTQHJAAy3PB-7rDrNPJXcZa1jcR604FCbsK-xl52VUlCvPWVti7EoiT_UIu8PCgbISK1hU0ODP73JRBICrTgqjHTTEjTivqtP3vO61_gMBr53y0gaCsZOnt--X5dWQY-Mn1ItOKZwWunPZt2BnxB34aA_C59T9nh0zKBxYDpn9KvowTipwwjBxhiRnJl7mUb0ne9Ouh_AgxDPI72f_5BFPWAHCS4LGhn8Tv4ZmXuYS5Q-CYdtfpV1-BrJbbOJr-8x4XuhJU-JSiqm66EA_VdBk1597A2m7_uoyfc24NnyPhuDBtuBv9DlZKliUJ7lSeDefEnLEFisHOR6dmq8EjdCi5lw4A4pSfovA5JJjzKtO2Zh00XvMKrC7_2h5xXuaHVj_KpWcrd8og/p.png?size=178x178&size_mode=1'
    }
]

var CaruselData = [
    {

    title: '',
    imageURL: 'https://uc2be454a4c7f8526de23d72996d.previews.dropboxusercontent.com/p/thumb/ABCRZZCA_70PGGrs5NjIJwpEzGerMA3tx813QIIZKBzIYICiHPyfNSVo-bhQwls8HK7sZFf-LnYxOZOiFWd_Vi7IV-7S-Mtu9_Fqn6ntoNK9mZe_OfqTsoRPSpL6C1YwHSWDnRJVVkCNjUkRU18G8HLZPMceMVsBjIlj6vCBygKy14DBlAW3kHDM2Uf6A23f-rvlHH6sSe_YtWqOlcg61Qn4jGEMq8m3E-vP9YtC8eEFjqX-OH083Fz2x85ZADeeTnMkKI_iPK4wwj2-sOMSx7RhDJ2tz5qTs1Lnog4Noi0FwVqaenzzy7-yxHZPH5SMkAPMs_uAMXkTJGIvnh0A4Q-k5DeirrsfWrjZ5UHc1aSWFQ/p.png?size=178x178&size_mode=1',
    description: '',
    buttonText: '',
    time: 5000,
    deepLink: '/Transactions/scope_items/3f26ad66-86f7-4661-bd86-6f9c35e684d6?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22defaef5e-e6d3-4b1e-b53c-2fa41f700168%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
    },
{

    title: '',
    imageURL: 'https://ucd67453f8435fd24a9ba3b0200b.previews.dropboxusercontent.com/p/thumb/ABAgMj3PklNSVi69-Yia4br2mL7DCupdFtnhmh6SPIOW9Orf11_FtAF2EhuRcifk_uNFQ8fE3_tbHzpMHEeFwG4dH_s8ixTGh1qwWJ0Z1wtm_9TGVNMp_xJVwOySlwwuCZ93lic9hZiwA1LraRhyU-sjIPjnMti7at65Ak-SBlMhy6eFhT5DmKks9cuDQywAHoTvhElPI60IZcTsC1tgAe4zo75UIxcznuZ_jSdXEoOhe5KmgTg8GpThQtk2TNNrdctytfSFLhC04H-o7flANFyfEhRG2M_4mRi2fV_h2Stu-lO-oCnCfISwNIF0b3BduA1uyXwSJl3vrqE4NILkLdK5wsVG0oa1H4KHcTq22vS56A/p.png?size=178x178&size_mode=1',
    description: '',
    buttonText: '',
    time: 5000,
    deepLink: '/Transactions/scope_items/3f26ad66-86f7-4661-bd86-6f9c35e684d6?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22defaef5e-e6d3-4b1e-b53c-2fa41f700168%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
},
{

    title: '',
    imageURL: 'https://www.dropbox.com/sh/q633strtdfsizi9/AACXSfaElNIoq2d4owfuRSx3a/5-BANDEAU%20NOUVEAUT%C3%89/5-BANDEAU%20NOUVEAUT%C3%89/3.BANNI%C3%88RE.png?dl=0',
    description: '',
    buttonText: '',
    time: 5000,
    deepLink: '/Transactions/scope_items/3f26ad66-86f7-4661-bd86-6f9c35e684d6?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22defaef5e-e6d3-4b1e-b53c-2fa41f700168%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
},
{

    title: '',
    imageURL: 'https://uc5b10bb0460d0257e759f9de15e.previews.dropboxusercontent.com/p/thumb/ABAyMPM5uw3_q2qP7LXlgoSeRBBMTTbG3yW1hQPHVu8RSR8cdkZlZX7Tzfwz9Pca7lTRf_PKOLJ389KzGKFgsfvbGJGZRYdtR1_DP9M748vW_fSPNTSpvcfQdVq_MUCMMgSWFxCPLM_QYAOLlouY2rwBhnOXu7g6Yj3xiySl1_9jwDA2SSP7aDXYUgumEx6pQ2LZwKO21SkSia5iO93W1M1ASi4cJU-OvHJca_NPJmCBYh9_rPNVd1NDm8zyKbbcAtZkUt44aA0ZB41SVmJCWEjazKeBhJIxKnbgz_t4p1T1nUzHBTIvuaGMhKvHzQL-0aEJq5Ohxqtz_jpJ1kZN1J8RFuq_ezmobIVc6cjtP2mCtw/p.png?size=178x178&size_mode=1',
    description: '',
    buttonText: '',
    time: 5000,
    deepLink: '/Transactions/scope_items/3f26ad66-86f7-4661-bd86-6f9c35e684d6?CurrentTab=%22%7B%5C%22JsonFilter%5C%22:%5C%22defaef5e-e6d3-4b1e-b53c-2fa41f700168%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false'
},
];
customHomepage.test = "test"
