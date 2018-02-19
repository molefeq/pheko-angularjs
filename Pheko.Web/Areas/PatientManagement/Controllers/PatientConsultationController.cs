using Pheko.WebPresentation.Library;
using Pheko.WebPresentation.ServiceHandlers.Classes;
using Pheko.WebPresentation.ServiceHandlers.Interfaces;
using Pheko.WebPresentation.Utility;
using Pheko.WebPresentation.ViewModels;
using System;
using System.Web.Mvc;

namespace Pheko.Web.Areas.PatientManagement.Controllers
{
    [SecurityFilter()]
    public class PatientConsultationController : PhekoController
    {
        private IPatientConsultationHandler _IPatientConsultationHandler = new PatientConsultationHandler();
        private IListHandler _IListHandler = new ListHandler();

        [HttpGet]
        public ActionResult PatientConsultation()
        {
            ViewBag.Doctors = _IListHandler.GetDoctors();

            return View();
        }

        [HttpGet]
        public ActionResult GetPatientConsultationData()
        {
            if (PatientId == null)
            {
                throw new Exception("Patient Unknown.");
            }
            return Json(new { patientid = PatientId, consultationstatus = "NEW" }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult SearchPatientConsultations(int pageSize, int pageIndex)
        {
            DataSourceResult<PatientConsultationViewModel> result = _IPatientConsultationHandler.Search(PatientId.Value, string.Empty, pageIndex, pageSize);

            return Json(new { data = result }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SavePatientConsultation(PatientConsultationViewModel model)
        {
            try
            {
                PatientConsultationViewModel patientConsultationViewModel = _IPatientConsultationHandler.SavePatientConsultation(model);

                PatientConsultationId = patientConsultationViewModel.PatientConsultationId;

                string returnUrl = Url.Action("PatientVitalSigns", "PatientVitalSigns", new { area = "PatientManagement" });

                return Json(new { ok = true, url = returnUrl });
            }
            catch (ModelException ex)
            {
                return Json(new { errors = ex.ModelErrors });
            }
        }

        [HttpGet]
        public ActionResult ViewPatientConsultation(int id)
        {
            PatientConsultationId = id;

            string returnUrl = Url.Action("PatientVitalSigns", "PatientVitalSigns", new { area = "PatientManagement" });

            return Redirect(returnUrl);
        }
    }
}
