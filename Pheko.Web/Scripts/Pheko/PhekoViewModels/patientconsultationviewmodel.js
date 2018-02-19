var app = angular.module("PhekoApp", ['ui.bootstrap', 'ngGrid']);

app.controller("PatientConsultationController", function ($scope, $http, $modal, $filter) {
    $scope.patientconsultation = {};

    $scope.initialise = function (url) {
        $http({ method: 'get', url: url, cache: false, responseType: 'json' }).success(function (response) {
            $scope.patientid = response.patientid;
            $scope.consultationstatus = response.consultationstatus;
        });
    };

    $scope.initialise($('#divGetPatientConsultationDataUrl').attr('data-url'));

    $scope.addpatientconsultation = function () {
        $scope.patientconsultation.PatientId = $scope.patientid;
        $scope.patientconsultation.ConsultationStatus = $scope.consultationstatus;

        $('#frmPatientConsultation').removeData('validator');
        $('#frmPatientConsultation').removeData('unobtrusiveValidation');
        $.validator.unobtrusive.parse('#frmPatientConsultation');

        var modalInstance = $modal.open({
            templateUrl: 'patientconsultationmodal',
            controller: 'PatientConsultationEditorController',
            backdrop: 'static',
            resolve: {
                item: function () {
                    return $scope.patientconsultation;
                }
            }
        });

        modalInstance.result.then(function (url) {
            window.location.href = url;
        }, function (item) {
            $scope.patientconsultation = {};
        });
    };

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

    $scope.getPagedDataAsync = function (pageSize, pageIndex, url) {
        setTimeout(function () {
            $http({ method: 'get', url: url, params: { pageIndex: pageIndex, pageSize: pageSize }, cache: false, responseType: 'json' }).success(function (response) {
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
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $('#divSearchPatientConsultationsUrl').attr('data-url'));
        }
    }, true);

    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $('#divSearchPatientConsultationsUrl').attr('data-url'));
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
            { field: 'ConsultationStatus', displayName: 'Status' },
            { field: 'StartDate', displayName: 'Start Date' },
            { field: 'EndDate', displayName: 'End Date' },
            {
                field: 'PatientConsultationId',
                displayName: '',
                cellTemplate: '<a href="' + $('#divViewPatientConsultationUrl').attr('data-url') + '?id={{row.getProperty(col.field)}}" class="btn-edit"><div class="btn btn-default btn-xs"><i class="glyphicon glyphicon-pencil"></i> View</div></a>'
            }
        ]
    };

    $scope.pagingOptions.pageSize = 10;
    $scope.pagingOptions.currentPage = 1;
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $('#divSearchPatientConsultationsUrl').attr('data-url'));

});


app.controller('PatientConsultationEditorController', function ($scope, $modalInstance, $http, $filter, item) {
    $scope.openstartdatecalendar = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.startdateopened = true;
    };

    $scope.openenddatecalendar = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.enddateopened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };

    $scope.patientconsultation = item;

    $scope.error = function (name) {
        var s = $scope.frmPatientConsultation[name];
        return s.$invalid && (s.$dirty || $scope.submitted) ? "has-error" : "";
    };

    $scope.savepatientconsultation = function (form_id, url) {
        $scope.submitted = true;

        if (!$scope.frmPatientConsultation.$valid) {
            return 0;
        }

        $http({ method: 'post', url: url, data: { model: $scope.patientconsultation }, cache: false, responseType: 'json' }).success(function (response) {
            if (response.errors) {
                $('#' + main_element).displayerrors({ errors: response.errors });
            }
            else if (response.ok) {
                $modalInstance.close(response.url);
            }
        });

        $scope.submitted = false;
    };

    $scope.$watch("patientconsultation.StartDate", function (newValue, oldValue) {
        if ($scope.patientconsultation.StartDate != '') {
            $scope.patientconsultation.StartDate = $filter('date')($scope.patientconsultation.StartDate, 'dd/MM/yyyy');
        }
    });

    $scope.$watch("patientconsultation.EndDate", function (newValue, oldValue) {
        if ($scope.patientconsultation.EndDate != '') {
            $scope.patientconsultation.EndDate = $filter('date')($scope.patientconsultation.EndDate, 'dd/MM/yyyy');
        }
    });

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});