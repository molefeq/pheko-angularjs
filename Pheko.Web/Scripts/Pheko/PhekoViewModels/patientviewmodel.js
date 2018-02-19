var app = angular.module("PhekoApp", ['ui.bootstrap', 'sharedServices']);



app.controller("PatientController", function ($scope, $http, $modal, $filter, CustomValidationErrors) {
    $scope.opencalendar = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };

    $scope.patient = {};
    $scope.patientmedicalaiddepandancies = [];
    $scope.patientmedicalaiddepandancy = {};

    $scope.initialise = function (url) {
        $http({ method: 'get', url: url, cache: false, responseType: 'json' }).success(function (response) {
            $scope.patient = response.data;
            $scope.patientmedicalaiddepandancies = response.patientmedicalaiddepandancies;
        });
    };

    $scope.$watch("patient.BirthDate", function (newValue, oldValue) {
        if ($scope.patient.BirthDate != '') {
            $scope.patient.BirthDate = $filter('date')($scope.patient.BirthDate, 'dd/MM/yyyy');
        }
    });

    $scope.error = function (name) {
        var s = $scope.frmSavePatient[name];
        return s.$invalid && (s.$dirty || $scope.submitted) ? "has-error" : "";
    };

    $scope.validationmessage = function (fieldname) {
        return $scope.modelerrors && $scope.modelerrors[fieldname] ? $scope.modelerrors[fieldname] : '';
    }

    $scope.summaryerror = function () {
        return $scope.hassummaryerrors() ? "has-error" : "";
    };

    $scope.hassummaryerrors = function () {
        return $scope.modelerrors && $scope.modelerrors['summaryerrors'];
    };

    $scope.cleanmedicalaiddetails = function () {
        if (!$scope.patient.MedicalAidInd) {
            $scope.patient.MedicalAidName = '';
            $scope.patient.MedicalAidScheme = '';
            $scope.patient.MedicalAidNumber = '';
            $scope.patient.PrincipalMemberInd = false;
            $scope.patientmedicalaiddepandancies = [];
        }
    };

    $scope.isdependancyprincipalmember = function (patientmedicaldependancy) {
        if (patientmedicaldependancy.PrincipalInd) {
            return 'YES'
        }
        else {
            return 'NO'
        }
    };

    $scope.$watch('patient', function () { $scope.issuccessfulsaved = false }, true);

    $scope.savepatient = function (url, form_id, main_element) {
        $scope.submitted = true;
        $scope.modelerrors = {};
        $scope.frmSavePatient.$error.custom = true;
        $scope.issuccessfulsaved = false;

        if (!$scope.frmSavePatient.$valid) {
            return 0;
        }

        $http({ method: 'post', url: url, data: { model: $scope.patient }, cache: false, responseType: 'json' }).success(function (response) {
            if (response.errors) {
                $scope.modelerrors = CustomValidationErrors.getcutomerrors(response.errors);
            }
            else if (response.ok) {
                $scope.patient = response.data;
                $scope.issuccessfulsaved = true;

                if (!$scope.patient.MedicalAidInd) {
                    $scope.patientmedicaldependancies.removeAll();
                }

                $scope.submitted = false;
            }
        });

    };

    $scope.savecheck = function (main_element) {
        var errors = new Array();

        address_save_check(errors, $scope.patient.PhysicalAddress, 'PhysicalAddress', 'Physical Address');
        address_save_check(errors, $scope.patient.PostalAddress, 'PostalAddress', 'Postal Address');

        if (errors.length > 0) {
            $('#' + main_element).displayerrors({ errors: errors });

            return false;
        }

        return true;
    };

    $scope.printpatientschedule = function (url, saveurl, form_id, main_element) {
        $scope.submitted = true;

        if (!$scope.frmSavePatient.$valid) {
            return 0;
        }

        $http({ method: 'post', url: saveurl, data: { model: $scope.patient }, cache: false, responseType: 'json' }).success(function (response) {
            if (response.errors) {
                $('#' + main_element).displayerrors({ errors: response.errors });
            }
            else if (response.ok) {
                $scope.patient = response.data;

                if (!$scope.patient.MedicalAidInd) {
                    $scope.patientmedicaldependancies.removeAll();
                }

                window.location = url + "?patientId=" + $scope.patient.PatientId;
            }
        });

        $scope.submitted = false;
    };

    $scope.createconsultation = function (url, saveurl, form_id, main_element) {
        $scope.submitted = true;

        if (!$scope.frmSavePatient.$valid) {
            return 0;
        }

        $http({ method: 'post', url: saveurl, data: { model: $scope.patient }, cache: false, responseType: 'json' }).success(function (response) {
            if (response.errors) {
                $('#' + main_element).displayerrors({ errors: response.errors });
            }
            else if (response.ok) {
                $scope.patient = response.data;

                if (!$scope.patient.MedicalAidInd) {
                    $scope.patientmedicaldependancies.removeAll();
                }

                window.location = url;
            }
        });

        $scope.submitted = false;
    };

    $scope.initialise($('#divGetPatientViewModelUrl').attr('data-url'));

    $scope.addmedicalaiddependancy = function (patient_medical_aid_dependancy_holder, url) {
        $scope.patientmedicalaiddepandancy.PatientId = $scope.patient.PatientId;
        $('#frmSavePatientMedicalAidDependancy').removeData('validator');
        $('#frmSavePatientMedicalAidDependancy').removeData('unobtrusiveValidation');
        $.validator.unobtrusive.parse('#frmSavePatientMedicalAidDependancy');

        var modalInstance = $modal.open({
            templateUrl: 'patientdependancymodal',
            controller: 'PatientMedicalAidDependancyController',
            backdrop: 'static',
            resolve: {
                item: function () {
                    return $scope.patientmedicalaiddepandancy;
                }
            }
        });

        modalInstance.result.then(function (item) {
            $scope.patientmedicalaiddepandancies.push(item);
            $scope.patientmedicalaiddepandancy = {};
        }, function (item) {
            $scope.patientmedicalaiddepandancy = {};
        });
    };

    $scope.editmedicalaiddependancy = function (patientmedicalaiddepandancy, patient_medical_aid_dependancy_holder) {
        $scope.patientmedicalaiddepandancy = patientmedicalaiddepandancy;
        $('#frmSavePatientMedicalAidDependancy').removeData('validator');
        $('#frmSavePatientMedicalAidDependancy').removeData('unobtrusiveValidation');
        $.validator.unobtrusive.parse('#frmSavePatientMedicalAidDependancy');

        var modalInstance = $modal.open({
            templateUrl: 'patientdependancymodal',
            controller: 'PatientMedicalAidDependancyController',
            backdrop: 'static',
            resolve: {
                item: function () {
                    return $scope.patientmedicalaiddepandancy;
                }
            }
        });

        modalInstance.result.then(function (item) {
            $scope.patientmedicalaiddepandancy = {};
        }, function () {
            $scope.patientmedicalaiddepandancy = {};
        });
    };

    $scope.deletemedicalaiddependancy = function (patientmedicalaiddepandancy, url) {

        $http({ method: 'post', url: url, data: { patientMedicalAidDependancyId: patientmedicalaiddepandancy.PatientMedicalAidDependanciesId }, cache: false, responseType: 'json' }).success(function (response) {
            if (response.errors) {
                $('#' + main_element).displayerrors({ errors: response.errors });
            }
            else if (response.ok) {
                var remove_index;

                $.each($scope.patientmedicalaiddepandancies, function (index, item) {
                    if (item.PatientMedicalAidDependanciesId === patientmedicalaiddepandancy.PatientMedicalAidDependanciesId) {
                        remove_index = index;
                        return false;
                    }
                });

                $scope.patientmedicalaiddepandancies.splice(remove_index, 1);
                $scope.patientmedicalaiddepandancy = {};
            }
        });
    };

    function address_save_check(errors, address, address_type, address_name) {

        if (address.Line1 || address.Line2 || address.Suburb || address.City ||
            address.PostalCode || address.ProvinceId || address.CountryId) {

            if (!address.Line1) {
                errors.push(new FieldError(address_type + '.Line1', 'If one of ' + address_name + ' fields is filled then address line 1 is required.'));
            }

            if (!address.Suburb) {
                errors.push(new FieldError(address_type + '.Suburb', 'If one of ' + address_name + ' fields is filled then suburb is required.'));
            }

            if (!address.City) {
                errors.push(new FieldError(address_type + '.City', 'If one of ' + address_name + ' fields is filled then city is required.'));
            }

            if (!address.ProvinceId) {
                errors.push(new FieldError(address_type + '.ProvinceId', 'If one of ' + address_name + ' fields is filled then province is required.'));
            }
        }
    };
});

app.controller('PatientMedicalAidDependancyController', function ($scope, $modalInstance, $http, $filter, item) {
    $scope.opencalendar = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };

    $scope.patientmedicalaiddepandancy = item;

    $scope.error = function (name) {
        var s = $scope.frmSavePatientMedicalAidDependancy[name];
        return s.$invalid && (s.$dirty || $scope.submitted) ? "has-error" : "";
    };

    $scope.savemedicalaiddependancy = function (form_id, url) {
        $scope.submitted = true;

        if (!$scope.frmSavePatientMedicalAidDependancy.$valid) {
            return 0;
        }

        $http({ method: 'post', url: url, data: { model: $scope.patientmedicalaiddepandancy }, cache: false, responseType: 'json' }).success(function (response) {
            if (response.errors) {
                $scope.modelerrors = response.errors;


                //$('#' + main_element).displayerrors({ errors: response.errors });
            }
            else if (response.ok) {
                $scope.patientmedicalaiddepandancy = response.data;
                $modalInstance.close($scope.patientmedicalaiddepandancy);
            }
        });

        $scope.submitted = false;
    };

    $scope.$watch("patientmedicalaiddepandancy.BirthDate", function (newValue, oldValue) {
        if ($scope.patientmedicalaiddepandancy.BirthDate != '') {
            $scope.patientmedicalaiddepandancy.BirthDate = $filter('date')($scope.patientmedicalaiddepandancy.BirthDate, 'dd/MM/yyyy');
        }
    });

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});