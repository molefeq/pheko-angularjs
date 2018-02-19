using Pheko.WebPresentation.Library;
using Pheko.WebPresentation.ViewModels;

using System.Collections.Generic;
using System.Data;

namespace Pheko.WebPresentation.ServiceHandlers.Interfaces
{
    public interface IPatientHandler
    {
        PatientViewModel GetPatientDetails(int patientId, List<PatientMedicalAidDependancyViewModel> patientMedicalAidDepandancies);

        DataSourceResult<PatientViewModel> Search(SearchPatientViewModel searchPatientViewModel, int pageIndex, int pageSize);

        PatientViewModel SavePatient(PatientViewModel patientViewModel);

        PatientViewModel CreatePatient(CreatePatientViewModel createPatientViewModel);
    }
}
