var appCore = require('../app/app-core.js');

module.exports = {
    crawlWebsite: function(request, response) {
        var appCoreObj = new appCore;
        var url = request.query.url;
        appCoreObj.crawlWebsite(url, function(data, error){
            if(error != null){
                response.send(error);
            }
            else {
                response.send(data);
            }
        })
    }
};