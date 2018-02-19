using Pheko.Common.DataTransformObjects;
using Pheko.Common.UtilityComponent;

using Pheko.ServicePresentation.ServiceResponses;

namespace Pheko.ServicePresentation.EntityManager.Interfaces
{
    public interface IPatientConsultationManager
    {
        Result<PatientConsultationDto> GetPatientConsultations(int patientId, string searchText, ModelPager modelPager);
        Response<PatientConsultationDto> SavePatientConsultation(PatientConsultationDto patientConsultationDto);
    }
}
