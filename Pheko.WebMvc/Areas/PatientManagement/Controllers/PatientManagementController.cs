using Pheko.WebPresentation.Library;
using Pheko.WebPresentation.ServiceHandlers.Classes;
using Pheko.WebPresentation.ServiceHandlers.Interfaces;
using Pheko.WebPresentation.Utility;
using Pheko.WebPresentation.ViewModels;

using System.Web.Mvc;

namespace Pheko.WebMvc.Areas.PatientManagement.Controllers
{
    [SecurityFilter()]
    public class PatientManagementController : PhekoController
    {
        private IPatientHandler _IPatientHandler = new PatientHandler();

        [HttpGet]
        public ActionResult PatientManagement()
        {
            return View();
        }

        [HttpPost]
        public ActionResult LoadPatients(SearchPatientViewModel searchPatientViewModel, int pageIndex, int pageSize)
        {
            try
            {
                Response.CacheControl = "no-cache";

                DataSourceResult<PatientViewModel> response = _IPatientHandler.Search(searchPatientViewModel, pageIndex, pageSize);

                return Json(new { data = response }, JsonRequestBehavior.AllowGet);
            }
            catch (ModelException ex)
            {
                return Json(new { errors = ex.ModelErrors }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SearchPatient(SearchPatientViewModel model, int pageIndex, int pageSize)
        {
            try
            {
                DataSourceResult<PatientViewModel> response = _IPatientHandler.Search(model, pageIndex, pageSize);

                return Json(new { data = response });
            }
            catch (ModelException ex)
            {
                return Json(new { errors = ex.ModelErrors });
            }
        }

        [HttpPost]
        public ActionResult CreatePatient(CreatePatientViewModel model)
        {
            try
            {
                string returnUrl = Url.Action("Patient", "Patient", new { area = "PatientManagement" });
                PatientViewModel response = _IPatientHandler.CreatePatient(model);

                PatientId = response.PatientId;

                return Json(new { ok = true, url = returnUrl });
            }
            catch (ModelException ex)
            {
                return Json(new { errors = ex.ModelErrors });
            }
        }

        [HttpGet]
        public ActionResult EditPatient(int id)
        {
            string returnUrl = Url.Action("Patient", "Patient", new { area = "PatientManagement" });

            PatientId = id;

            return Redirect(returnUrl);
        }

    }
}
