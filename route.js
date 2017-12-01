// ROUTES
floorPlanApp.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/projects.html',
            controller: 'projectsController'
        })

        .when('/floorPlans', {
            templateUrl: 'pages/floorplans.html',
            controller: 'floorPlansController'
        })
});
