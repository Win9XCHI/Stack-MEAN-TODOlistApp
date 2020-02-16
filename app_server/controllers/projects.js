var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://protected-crag-50525.herokuapp.com/";
}

var requestOptions = {
    url: "http://protected-crag-50525.herokuapp.com/api/path",
    method: "GET",
    json: {},
    qs: { offset: 20}
};

request(requestOptions, function(err, response, body) {
    if (err) {
        console.log(err);
    } else if (response.statusCode === 200) {
        console.log(body);
    } else {
        console.log(response.statusCode);
    }
});

var renderHomepage = function(req, res, responseBody) {

    if (res.statusCode != 200) {
        _showError(req, res, res.statusCode);
    } else {    
        res.render('project-list', { 
            title: 'Test',
            description: 'For Ruby Garage',
            projects: responseBody
        });
    }
};

/* Output (GET) home page */
module.exports.homelist = function (req, res) {
    var requestOptions, path;
    path = 'api/';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(
        requestOptions,
        function(err, response, body) {
            renderHomepage(req, res, body);
        }
    );
};

var _showError = function(req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title: title,
        content: content
    });
};