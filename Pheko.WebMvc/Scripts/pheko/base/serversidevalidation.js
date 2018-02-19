var servervalidation = {
    classes: { groupIdentifier: ".form-group", error: 'has-error', success: null },
    updateClasses: function (inputElement, toAdd, toRemove) {
        var group = inputElement.closest(this.classes.groupIdentifier);
        if (group.length > 0) {
            group.addClass(toAdd).removeClass(toRemove);
        }
    },
    showError: function (inputElement, message) {
        this.updateClasses(inputElement, this.classes.error, this.classes.success);

        var errorContainer = $('<p class="text-error">' + message + '</p>');

        $(inputElement).next('p.text-error').remove();
        $(inputElement).after(errorContainer);
    },
    showSummaryError: function (errorcontainer, message) {
        if (!$(errorcontainer).hasClass('text-error')) {
            $(errorcontainer).addClass('text-error');
        }

        $(errorcontainer).append('<p>' + message + '</p>');
    },
    showMessage: function (fieldname, errormessage) {
        if (fieldname != null && fieldname != '') {
            var inputElement = $('input[name=' + fieldname);

            this.showError(inputElement, errormessage);
        }
        else {
            var errorSummaryContainer = $('div.form-error-summary');

            this.showSummaryError(errorSummaryContainer, errormessage);
        }
    },
    showMessages: function (errors) {
        if (errors) {
            for (var i = 0; i < errors.length ; i++) {
                this.showMessage(errors[i].FieldName, errors[i].Message);
            }
        }
    },
    clearSummaryErrors: function () {
        var errorSummaryContainer = $('div.form-error-summary');

        if (!$(errorSummaryContainer).hasClass('text-error')) {
            $(errorSummaryContainer).removeClass('text-error');
        }

        $(errorSummaryContainer).empty();
    }

}





//var classes = { groupIdentifier: ".form-group", error: 'has-error', success: null };
//var errorSummaryContainer = $('div.form-error-summary');

//function updateClasses(inputElement, toAdd, toRemove) {
//    var group = inputElement.closest(classes.groupIdentifier);
//    if (group.length > 0) {
//        group.addClass(toAdd).removeClass(toRemove);
//    }
//}

//function onError(inputElement, message) {
//    updateClasses(inputElement, classes.error, classes.success);

//    var errorContainer = $('<p class="text-error">' + message + '</p>');

//    $(inputElement).next('p.text-error').remove();
//    $(inputElement).after(errorContainer);
//}

//function onSummaryErrors(errorcontainer, message) {
//    if (!$(errorcontainer).hasClass('text-error')) {
//        $(errorcontainer).addClass('text-error');
//    }

//    $(errorcontainer).append('<p>' + message + '</p>');
//}

//function show_message(fieldname, errormessage) {
//    if (fieldname != null && fieldname != '') {
//        var inputElement = $('input[name=' + fieldname);

//        onError(inputElement, errormessage);
//    }
//    else {
//        onSummaryErrors(errorSummaryContainer, errormessage);
//    }
//}

//function clearSummaryErrors() {
//    if (!$(errorSummaryContainer).hasClass('text-error')) {
//        $(errorSummaryContainer).removeClass('text-error');
//    }

//    $(errorSummaryContainer).empty();
//}
