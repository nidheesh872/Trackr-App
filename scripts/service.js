'use strict';

preferencesServices.service("dataService", ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

    var restAPIUrl = "";
    var authorization = ""

    var httpGet = function (deferred, url, options) {
        $http.get(url, options)
            .then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
    }

    var httpPost = function (deferred, url, data, options) {
        $http.post(url, data, options)
            .then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
    }
    this.getData = function (language, stars, page) {
        var deferred = $q.defer();
        var url = "http://test";
        if (language) {
            url += "language:" + language;
        } else
            url += "language:"
        if (stars) {
            url += "&stars:>" + stars;
        } else
            url += "&stars:";
        if (page) {
            url += "&page=" + page;
        } 
        url += "&per_page=50"
        httpGet(deferred, url);
        return deferred.promise;
    }

}]);