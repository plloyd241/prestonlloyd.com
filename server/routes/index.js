'use strict';
var Route;
(function (Route) {
    var Index = (function () {
        function Index() {
        }
        Index.prototype.render = function (req, res) {
            res.send("<h1>Testing testing 123</h1>");
        };
        return Index;
    }());
    Route.Index = Index;
})(Route || (Route = {}));
module.exports = Route;
