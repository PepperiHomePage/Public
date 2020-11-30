if (!customFunction)
    var customFunction = {}
(function(){
    customFunction.getCatalogs = function () {
        pepperi.api.catalogs.search({
            fields: ["UUID", "ExternalID", "Description", "ID"],
            responseCallback: 'customFunction.getCatalogsCallback'
        });
    }
    customFunction.getCatalogsCallback = function (res) {
        console.log("get catalog res", res);
        (res && res.objects && res.objects.length) ? customFunction.catalogs = res.objects: false;
        customHeader.buildHTML();
        customHomepage.buildHTML();
    }
}.apply(customFunction))
