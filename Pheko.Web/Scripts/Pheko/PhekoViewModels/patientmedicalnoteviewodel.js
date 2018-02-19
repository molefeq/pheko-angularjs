var app = angular.module("PhekoApp", ['ui.bootstrap']);


app.controller("PatientMedicalNoteController", function ($scope, $http, $filter) {
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

    $scope.patientmedicalnotes = [];
    $scope.patientchronicdeseases = [];
    $scope.patientpastmedicalhistories = [];
    $scope.patientdeseasescreenings = [];
    $scope.patientclinicalexaminations = [];
    $scope.patientmedicalmonitorings = [];
    $scope.patientconsultationsicknote = {};

    $scope.initialise = function (url) {
        $http({ method: 'get', url: url, cache: false, responseType: 'json' }).success(function (response) {
            $scope.patientmedicalnotes = response.patientmedicalnotes;
            $scope.patientchronicdeseases = response.patientchronicdeseases;
            $scope.patientpastmedicalhistories = response.patientpastmedicalhistories;
            $scope.patientdeseasescreenings = response.patientdeseasescreenings;
            $scope.patientclinicalexaminations = response.patientclinicalexaminations;
            $scope.patientmedicalmonitorings = response.patientmedicalmonitorings;
            $scope.patientconsultationsicknote = response.patientconsultationsicknote;
        });
    };

    $scope.initialise($('#PatientMedicalNoteHolder').attr('data-url'));

    $scope.save = function (url, form_id, main_element) {

        if ($('form#' + form_id).valid()) {
            $http({
                method: 'post', url: url, data: {
                    patientMedicalNoteViewModels: $scope.patientmedicalnotes,
                    patientChronicDeseaseViewModels: $scope.patientchronicdeseases,
                    patientPastMedicalHistoryViewModels: $scope.patientpastmedicalhistories,
                    patientDeseaseScreeningViewModels: $scope.patientdeseasescreenings,
                    patientClinicalExaminationViewModels: $scope.patientclinicalexaminations,
                    patientMedicalMonitoringViewModels: $scope.patientmedicalmonitorings,
                    patientConsultationSickNoteViewModel: $scope.patientconsultationsicknote
                }, cache: false, responseType: 'json'
            }).success(function (response) {
                if (response.errors) {
                    $('#' + main_element).displayerrors({ errors: response.errors });
                }
                else if (response.ok) {
                }
            });
        }
    };

    $scope.print = function (url, saveurl, form_id, main_element) {

        if ($('form#' + form_id).valid()) {
            $http({
                method: 'post', url: saveurl, data: {
                    patientMedicalNoteViewModels: $scope.patientmedicalnotes,
                    patientChronicDeseaseViewModels: $scope.patientchronicdeseases,
                    patientPastMedicalHistoryViewModels: $scope.patientpastmedicalhistories,
                    patientDeseaseScreeningViewModels: $scope.patientdeseasescreenings,
                    patientClinicalExaminationViewModels: $scope.patientclinicalexaminations,
                    patientMedicalMonitoringViewModels: $scope.patientmedicalmonitorings,
                    patientConsultationSickNoteViewModel: $scope.patientconsultationsicknote
                }, cache: false, responseType: 'json'
            }).success(function (response) {
                if (response.errors) {
                    $('#' + main_element).displayerrors({ errors: response.errors });
                }
                else if (response.ok) {
                    window.location = url + "?patientId=" + response.patientId;
                }
            });
        }
    };

    $scope.printsicknote = function (url, saveurl) {

        $http({
            method: 'post', url: saveurl, data: {
                patientConsultationSickNoteViewModel: $scope.patientconsultationsicknote
            }, cache: false, responseType: 'json'
        }).success(function (response) {
            if (response.errors) {
                $('#' + main_element).displayerrors({ errors: response.errors });
            }
            else if (response.ok) {
                window.location = url + '?patientConsultationId=' + response.patientConsultationId;
            }
        });

    };

    $scope.$watch("patientconsultationsicknote.StartDate", function (newValue, oldValue) {
        if ($scope.patientconsultationsicknote.StartDate != '') {
            $scope.patientconsultationsicknote.StartDate = $filter('date')($scope.patientconsultationsicknote.StartDate, 'dd/MM/yyyy');
        }
    });

    $scope.$watch("patientconsultationsicknote.EndDate", function (newValue, oldValue) {
        if ($scope.patientconsultationsicknote.EndDate != '') {
            $scope.patientconsultationsicknote.EndDate = $filter('date')($scope.patientconsultationsicknote.EndDate, 'dd/MM/yyyy');
        }
    });
});