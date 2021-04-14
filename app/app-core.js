var axios = require('axios');
var cheerio = require('cheerio');
var fs = require('fs');
var url = require('url');
var { websiteStartUrl } = require('../config/service-constants.js');

function appCore() {
    this.crawlWebsite = function(callback) {
        axios({
            method: 'get',
            url: websiteStartUrl
        })
        .then(function(responseHTML) {
            var internalLinks = [];
            var externalLinks = [];
            var internalImages = [];
            var $ = cheerio.load(responseHTML.data);
            
            //Extracting all internal links
            var hrefInternalLinks = $("a[href^='/']"); 
            console.log("Internal Links Count: " + hrefInternalLinks.length);
            hrefInternalLinks.each(function(i, item) {
                internalLinks.push({
                    title: $(item).text().trim(),
                    hrefLink: url.resolve(websiteStartUrl, $(item).attr('href'))
                });
            });

            //Extracting all external links
            var hrefExernalLinks = $('a:not([href^="' + websiteStartUrl + '"]):not([href^="#"]):not([href^="javascript:void(0)"]):not([href^="/"])');
            console.log("External Links Count: " + hrefExernalLinks.length);
            hrefExernalLinks.each(function(i, item) {
                externalLinks.push({
                    title: $(item).text().trim(),
                    hrefLink: $(item).attr('href')
                });
            });

            //Extracting all internal images 
            var imageInternalLinks = $("img[src^='/']");
            console.log("Internal Images Count: " + imageInternalLinks.length);
            imageInternalLinks.each(function(i, item) {
                internalImages.push({
                    image: url.resolve(websiteStartUrl, $(item).attr('src'))
                });
            });
            
            var finalOutputJson = { "Internal Links": internalLinks, "Internal Images": internalImages, "External Links": externalLinks };
            fs.writeFileSync('outputs/result.json',JSON.stringify(finalOutputJson));
        })
        .catch(function(error){
            console.log(error);
        });
    }
}

module.exports = appCore;