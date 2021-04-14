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
            var extractedInternalLinks = [];
            var extracedExternalLinks = [];
            var extractedInternalImages = [];
            var extractedMultimediaElements = [];
            var tempObj = {};
            var $ = cheerio.load(responseHTML.data);
           
            //Extracting all internal links
            var hrefInternalLinks = $("a[href^='/']:not(a[href^='mailto'])"); 
            hrefInternalLinks.each(function(i, item) {
                tempObj = {
                    Title: $(item).text().trim(),
                    Link: url.resolve(websiteStartUrl, $(item).attr('href'))
                };
                if((extractedInternalLinks.findIndex(obj => obj.Link == tempObj.Link)) === -1) {
                    extractedInternalLinks.push(tempObj); 
                }
            });
            console.log("Internal Links Count: " + extractedInternalLinks.length);

            //Extracting all external links
            var hrefExernalLinks = $('a:not([href^="' + websiteStartUrl + '"])' + 
                                     ':not([href^="#"])' + 
                                     ':not([href^="javascript:void(0)"])' + 
                                     ':not([href^="/"])');
            hrefExernalLinks.each(function(i, item) {
                tempObj = {
                    Link: $(item).attr('href')
                };
                if((extracedExternalLinks.findIndex(obj => obj.Link == tempObj.Link)) === -1) {
                    extracedExternalLinks.push(tempObj);
                }
            });
            console.log("External Links Count: " + extracedExternalLinks.length);

            //Extracting all internal images 
            var imageInternalLinks = $("img[src^='/']");
            imageInternalLinks.each(function(i, item) {
                tempObj = {
                    Image: url.resolve(websiteStartUrl, $(item).attr('src'))
                };
                if((extractedInternalImages.findIndex(obj => obj.Image == tempObj.Image)) === -1) {
                    extractedInternalImages.push(tempObj);
                }
            });
            console.log("Internal Images Count: " + extractedInternalImages.length);

            //Extracting multimedia elements
            var multimediaElements = $("video > source, audio > source");
            multimediaElements.each(function(i, item) {
                tempObj = {
                    Multimedia: $(item).attr('src')
                };
                if((extractedMultimediaElements.findIndex(obj => obj.Multimedia == tempObj.Multimedia)) === -1) {
                    extractedMultimediaElements.push(tempObj);
                }
            });
            console.log("Multimedia Elements Count: " + extractedMultimediaElements.length);

            var finalOutputJson = { "Internal Links": extractedInternalLinks, "Internal Images": extractedInternalImages, "External Links": extracedExternalLinks, "Multimedias": extractedMultimediaElements };
            fs.writeFileSync('outputs/' + new URL(websiteStartUrl).hostname.replace('www.','') + '.json',JSON.stringify(finalOutputJson, null, 4));

            callback("Extracted required information, you can find results under repo's output folder", null);
        })
        .catch(function(error){
            callback(null, error);
        });
    }
}

module.exports = appCore;