if (!customFunction)
    var customFunction = {}
customFunction.getCatalogs = function (x) {
    pepperi.api.catalogs.search({
        fields: ["UUID", "ExternalID", "Description", "ID"],
        responseCallback: 'customFunction.getCatalogsCallback',
        requestID: x        
    });
}
customFunction.getCatalogsCallback = function (res) {
    console.log("get catalog res", res);
    (res && res.objects && res.objects.length) ? customFunction.catalogs = res.objects: false;
    res.requestID.buildHTML();
}