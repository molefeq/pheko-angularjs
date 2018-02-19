var myApp = angular.module("sharedServices", []);

myApp.service('CustomValidationErrors', function () {
    this.angularerrors = {};

    this.getcutomerrors = function (errors) {
        var summaryerrors = [];

        if (errors) {

            for (var i = 0; i < errors.length ; i++) {
                if (errors[i].FieldName || errors[i].FieldName != '') {
                    this.angularerrors[errors[i].FieldName] = errors[i].Message;
                }
                else {
                    summaryerrors.push(errors[i].Message);
                }
            }

            if (summaryerrors.length > 0) {
                this.angularerrors.summaryerrors = summaryerrors;
            }
        }

        return this.angularerrors;
    };

    this.getmessage = function (fieldname) {
        this.angularerrors[fieldname];
    };

    this.getsummaryerrors = function () {
        this.angularerrors['summaryerrors'];
    };

});

myApp.directive('custom', function () {

    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            scope.$watch("modelerrors", function (newValue, oldValue) {
                if (newValue && newValue[attrs['name']]) {
                    ctrl.$setValidity('custom', false);
                }
            });
            
            ctrl.$parsers.unshift(function (viewValue) {
                if (scope.modelerrors && scope.modelerrors[attrs['name']]) {
                    delete scope.modelerrors[attrs['name']];
                    ctrl.$setValidity('custom', true);
                }
                return viewValue;
            });
        }
    };
});

myApp.directive('customSummary', function () {

    return {
        link: function (scope, elm, attrs, ctrl) {

            scope.$watch("modelerrors['summaryerrors']", function (newValue, oldValue) {
                if (newValue) {
                    elm.empty();
                    for (var i = 0; i < newValue.length; i++) {
                        var error_message = newValue[i];
                        elm.append('<li class="help-block">' + error_message + '</li>');
                    }
                }
            });

        }
    };
});

(function ($) {

    $.fn.displayerrors = function (options) {
        var settings = $.extend({
            width: '100%',
        }, options);

        if (settings.errors) {

            for (var i = 0; i < settings.errors.length ; i++) {
                show_message(this, settings.errors[i].FieldName, settings.errors[i].Message);
            }
        }

        return this;
    }

    function show_message(main_container, fieldname, errormessage) {
        if (fieldname != null && fieldname != '') {
            var validation_holder = $(main_container).find("[data-valmsg-for=" + fieldname + "]");

            validation_holder.removeClass('field-validation-valid');
            validation_holder.addClass('field-validation-error');
            validation_holder.empty();
            validation_holder.append('<span for="' + fieldname + '" generated="true">' + errormessage + '</span>');
        }
        else {
            var validation_holder = $(main_container).find("div[data-valmsg-summary=true] > ul");
            $(main_container).find("div[data-valmsg-summary=true]").removeClass('validation-summary-valid');
            $(main_container).find("div[data-valmsg-summary=true]").addClass('validation-summary-errors');

            validation_holder.append('<li>' + errormessage + '</li>');
        }
    }

}(jQuery));