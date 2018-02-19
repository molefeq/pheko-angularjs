using Pheko.WebPresentation.Library;
using Pheko.WebPresentation.ViewModels;

namespace Pheko.WebPresentation.ServiceHandlers.Interfaces
{
    public interface IPatientConsultationHandler
    {
        DataSourceResult<PatientConsultationViewModel> Search(int patientId, string searchText, int pageIndex, int pageSize);

        PatientConsultationViewModel SavePatientConsultation(PatientConsultationViewModel patientConsultationViewModel);
    }
}
