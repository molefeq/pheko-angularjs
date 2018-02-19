var app = angular.module('PhekoApp', []);

app.controller('PatientVitalSignController', function ($scope, $http) {
    $scope.patientvitalsigns = [];

    $scope.initialise = function (url) {
        $http({ method: 'get', url: url, cache: false, responseType: 'json' }).success(function (response) {
            $scope.patientvitalsigns = response.patientvitalsigns;
            $scope.patientid = response.patientid;
        });
    };

    $scope.save = function (url, form_id, main_element) {
        if ($('form#' + form_id).valid()) {
            $http({ method: 'post', url: url, data: { models: $scope.patientvitalsigns }, cache: false, responseType: 'json' }).success(function (response) {
                if (response.errors) {
                    $('#' + main_element).displayerrors({ errors: response.errors });
                }
                else if (response.ok) {
                    //$scope.patientvitalsigns = response.data;
                }
            });
        }
    };


    $scope.print = function (url, saveurl, form_id, main_element) {
        if ($('form#' + form_id).valid()) {
            $http({ method: 'post', url: saveurl, data: { models: $scope.patientvitalsigns }, cache: false, responseType: 'json' }).success(function (response) {
                if (response.errors) {
                    $('#' + main_element).displayerrors({ errors: response.errors });
                }
                else if (response.ok) {
                    //$scope.patientvitalsigns = response.data;

                    window.location = url + "?patientId=" + $scope.patientid;
                }
            });
        }
    };

    $scope.initialise($('#divPatientVitalSignsHolder').attr('data-url'));
});