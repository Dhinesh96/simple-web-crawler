var assert = require('assert');
var appCore = require('../app/app-core.js');

describe('appCore', () => {
    describe('crawlWebsite()', () => {
        it('should create the output file that contains the extracted information', () => {
            var appCoreObj = new appCore;
            appCoreObj.crawlWebsite('https://www.wipro.com/', function(actual, error){
                assert.deepStrictEqual(actual, "Extracted required information, you can find results under repo's output folder");
            });
        });
    });
});