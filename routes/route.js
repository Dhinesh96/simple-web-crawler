var express = require('express'); 
var app = express();

var { servicePort } = require('../config/service-constants.js');
var routeData = require('./route-data.js');

app.listen(servicePort, function() {
    console.log('Service running on ' + servicePort);
});

app.get('/crawlWebsite', routeData.crawlWebsite);