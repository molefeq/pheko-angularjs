function BeginCreatePatient() {
    utils.disableButtons(this, true);

    servervalidation.clearSummaryErrors();
}

function CreatePatientSuccess(response) {
    utils.disableButtons(this, false);

    if (response.errors) {
        servervalidation.showMessages(response.errors);
    }
}
