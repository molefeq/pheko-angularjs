function BeginLogin() {
    utils.disableButtons(this, true);

    servervalidation.clearSummaryErrors();
}

function UpdateLogin(response) {
    utils.disableButtons(this, false);

    if (response.errors) {
        servervalidation.showMessages(response.errors);
    }
    else {
        window.location = utils.serverUrls.PatientManagement;
    }
}
