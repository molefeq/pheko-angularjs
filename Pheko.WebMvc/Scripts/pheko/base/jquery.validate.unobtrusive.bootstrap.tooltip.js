(function ($) {
    var classes = { groupIdentifier: ".form-group", error: 'has-error', success: null };//success: 'has-success' 

    function updateClasses(inputElement, toAdd, toRemove) {
        var group = inputElement.closest(classes.groupIdentifier);
        if (group.length > 0) {
            group.addClass(toAdd).removeClass(toRemove);
        }
    }

    function onError(inputElement, message) {
        updateClasses(inputElement, classes.error, classes.success);

        var errorContainer = $('<p class="text-error">' + message + '</p>');

        $(inputElement).next('p.text-error').remove();
        $(inputElement).after(errorContainer);
    }

    function onSuccess(inputElement) {
        updateClasses(inputElement, classes.success, classes.error);
        $(inputElement).next('p.text-error').remove();
    }

    function onValidated(errorMap, errorList) {
        $.each(errorList, function () {
            onError($(this.element), this.message);
        });

        if (this.settings.success) {
            $.each(this.successList, function () {
                onSuccess($(this));
            });
        }
    }

    $(function () {
        $('form').each(function () {
            var validator = $(this).data('validator');
            validator.settings.showErrors = onValidated;
        });
    });
}(jQuery));