// MODULE
var floorPlanApp = angular.module('floorPlanApp', ['ngRoute', 'ngResource', 'ngFileUpload']);


floorPlanApp.directive('progressBar', [
    function () {
        return {
            link: function ($scope, el, attrs) {
                $scope.$watch(attrs.progressBar, function (newValue) {
                    el.css('width', newValue.toString() + '%');
                });
            }
        };
    }
]);
