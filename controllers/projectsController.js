floorPlanApp.controller('projectsController', ['$scope', '$http', 'Upload',
    function ($scope, $http, Upload) {
        var baseUrl = 'http://localhost:8084';

        $scope.model = {};
        $scope.selectedFile = [];
        $scope.uploadProgress = 0;

        $scope.id = '2';
        $scope.projectName = 'Dev';
        $scope.displayName = 'test.pdf';
        $scope.fileType = 'pdf';
        $scope.replaceFlag = true;

        $scope.uploadFile = function () {
            var file = $scope.selectedFile[0];
            $scope.upload = Upload.upload({
                url: baseUrl + '/floorplans/upload',
                method: 'POST',
                data: angular.toJson($scope.model),
                file: file,
                headers: {
                    'secret-key': 'mySecretKey'
                },
                params: {
                    'id': $scope.id,
                    'projectName' : $scope.projectName,
                    'displayName' : $scope.displayName,
                    'fileType' : $scope.fileType,
                    'replaceFlag' : $scope.replaceFlag
                }
            }).progress(function (evt) {
                $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
            }).success(function (data) {
                //do something
            });
        };

        $scope.onFileSelect = function ($files) {
            $scope.uploadProgress = 0;
            $scope.selectedFile = $files;
        };

        $scope.showAddProjectForm = false;
        $scope.showUploadFloorForm = false;
        $scope.buttonToggleText = "Add Project"

        $scope.$watch('showAddProjectForm', function (newValue, oldValue) {
            $scope.buttonToggleText = !$scope.showAddProjectForm ? "Add Project" : "Cancel"
        });

        $scope.$watch('showUploadFloorForm', function (newValue, oldValue) {
            $scope.buttonToggleTextFloor = !$scope.showUploadFloorForm ? "Upload Floor Plans" : "Cancel"
        });

        $scope.getProjects = function () {
            $http({
                method: 'GET',
                url: baseUrl + '/projects/',
                headers: {
                    'secret-key': 'mySecretKey'
                }
            }).success(function (data, status) {
                // console.log(data);
                $scope.results = data;
            }).error(function (status) {
                console.log('Error occurred while getting projects ' + status);
            });
        }

        $scope.addProject = function () {
            $http({
                method: 'GET',
                url: baseUrl + '/projects/add',
                headers: {'secret-key': 'mySecretKey'},
                params: {'projectName': $scope.projectName}
            }).success(function (data, status) {
                $scope.results = data;
            }).error(function (status) {
                console.log('Error occurred while adding projects ' + status);
            });
        }

        $scope.getFloorPlans = function (row) {
            // console.log("Inside getFloorPlans function " + row.projectName + " " + row.index);
            $scope.floorPlanRequested = true;
            $scope.selectedProject = row.projectName;
            $scope.id = row.index;
            $http({
                method: 'GET',
                url: baseUrl + '/floorplans',
                headers: {'secret-key': 'mySecretKey'},
                params: {'projectId': row.index}
            }).success(function (data, status) {
                $scope.floorResults = data;
            }).error(function (status) {
                console.log('Error occurred while getting floor plans for project ' + row.projectName + ' :' + status);
            });
        }

        $scope.getProjects();

    }]);