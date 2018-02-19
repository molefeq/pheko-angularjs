var app = angular.module("PhekoApp", []);

app.controller("LoginController", function ($scope, $http) {
    $scope.model = {};

    $scope.error = function (name) {
        var s = $scope.frmLogin[name];
        return s.$invalid && (s.$dirty || $scope.submitted) ? "has-error" : "";
    };

    $scope.login = function () {
        $scope.submitted = true;
        if (!$scope.frmLogin.$valid) {
            return 0;
        }

        var url = 'Home/Login/';//$('form#frmLogin').attr('data-url');

        $http.post(url, $scope.model).success(function (response, status, headers, config) {
            window.location = response.data_url;
            //$scope.posts = data;
        }).error(function (response, status, headers, config) {
            alert('Error has occurred.');
            // log error 
        });
        $scope.submitted = false;
    };

    function failure(response) {
        for (var i = 0; i < response.errors.length ; i++) {
            var fieldname = response.errors[i].FieldName;
            $scope.form[fieldname].$dirty = true;
            $scope.form[fieldname].$setValidity(e, false);
            show_message(this, settings.errors[i].FieldName, settings.errors[i].Message);
        }

        _.each(response.data, function (errors, key) {
            _.each(errors, function (e) {
                $scope.form[key].$dirty = true;
                $scope.form[key].$setValidity(e, false);
            });
        });
    }
});