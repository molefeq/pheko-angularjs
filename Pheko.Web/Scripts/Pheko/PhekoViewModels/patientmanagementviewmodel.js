var app = angular.module('PhekoApp', ['ui.bootstrap', 'ngGrid']);

app.controller('SearchPatientController', function ($scope, $http, $modal, $filter) {
    $scope.patient = {};

    $scope.openbirthdatecalendar = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.birthdateopened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };

    $scope.model = {};
    $scope.showgrid = false;

    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };

    $scope.totalServerItems = 0;
    $scope.myData = [];

    $scope.pagingOptions = {
        pageSizes: [10, 20, 30],
        pageSize: 10,
        currentPage: 1
    };

    $scope.$watch("model.BirthDate", function (newValue, oldValue) {
        if ($scope.model.BirthDate != '') {
            $scope.model.BirthDate = $filter('date')($scope.model.BirthDate, 'dd/MM/yyyy');
        }
    });

    $scope.getPagedDataAsync = function (pageSize, pageIndex, url) {
        setTimeout(function () {
            $http({ method: 'post', url: url, params: { pageIndex: pageIndex, pageSize: pageSize }, data: { searchPatientViewModel: $scope.model }, cache: false, responseType: 'json' }).success(function (response) {
                $scope.myData = response.data.Data;
                $scope.totalServerItems = response.data.Total;
                $scope.showgrid = response.data.Total > 0;
                $(window).resize();

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
        }, 100);
    };

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $('form#frmPatientSearch').attr('data-url'));
        }
    }, true);

    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $('form#frmPatientSearch').attr('data-url'));
        }
    }, true);

    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        columnDefs: [
            { field: 'Title', displayName: 'Title', width: '5%' },
            { field: 'FirstName', displayName: 'FirstName', width: '35%' },
            { field: 'LastName', displayName: 'LastName', width: '35%' },
            { field: 'BirthDate', displayName: 'Date Of Birth', width: '10%' },
            { field: 'IDNumber', displayName: 'ID Number', width: '10%' },
            {
                field: 'PatientId',
                displayName: '',
                cellTemplate: '<a href="' + $('#divEditPatientUrl').attr('data-url') + '?id={{row.getProperty(col.field)}}" class="btn-edit"><div class="btn btn-default btn-xs"><i class="glyphicon glyphicon-pencil"></i> Edit</div></a>',
                width: '5%'
            }
        ]
    };

    $scope.search = function () {
        $scope.pagingOptions.pageSize = 10;
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $('form#frmPatientSearch').attr('data-url'));
    };

    $scope.createpatient = function () {
        $('#frmPatientCreate').removeData('validator');
        $('#frmPatientCreate').removeData('unobtrusiveValidation');
        $.validator.unobtrusive.parse('#frmPatientCreate');

        var modalInstance = $modal.open({
            templateUrl: 'createpatientmodal',
            controller: 'CreatePatientController',
            backdrop: 'static',
            resolve: {
                item: function () {
                    return $scope.patient;
                }
            }
        });

        modalInstance.result.then(function (url) {
            window.location = url;
        }, function (item) {
            $scope.patient = {};
        });
    };
});


app.controller('CreatePatientController', function ($scope, $modalInstance, $http, $filter, item) {
    $scope.patient = item;

    $scope.error = function (name) {
        var s = $scope.frmPatientCreate[name];
        return s.$invalid && (s.$dirty || $scope.submitted) ? "has-error" : "";
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.createpatient = function (url) {
        $scope.submitted = true;

        if (!$scope.frmPatientCreate.$valid) {
            return 0;
        }

        $http({ method: 'post', url: url, data: { model: $scope.patient }, cache: false, responseType: 'json' }).success(function (response) {
            if (response.errors) {
                $('#' + main_element).displayerrors({ errors: response.errors });
            }
            else if (response.ok) {
                $modalInstance.close(response.url);
            }
        }).error(function (response, status, headers, config) {
            alert('Error has occurred.');
            // log error 
        });

        $scope.submitted = false;
    };

});