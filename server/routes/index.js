'use strict';
var Controller;
(function (Controller) {
    var Index = (function () {
        function Index() {
        }
        Index.prototype.render = function (req, res) {
            res.send("<h1>Testing testing 123</h1>");
        };
        return Index;
    }());
    Controller.Index = Index;
})(Controller || (Controller = {}));
module.exports = Controller;
