var utils = {
    disableButtons: function (holder, disabled) {
        $('input[type=submit]', holder).attr("disabled", disabled);
    },
    serverUrls: {
        'PatientManagement': 'PatientManagement/PatientManagement/PatientManagement'
    }
}
