using Pheko.WebPresentation.Library;
using Pheko.WebPresentation.ServiceHandlers.Classes;
using Pheko.WebPresentation.ServiceHandlers.Interfaces;
using Pheko.WebPresentation.Utility;
using Pheko.WebPresentation.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pheko.Web.Areas.Admin.Controllers
{
    [SecurityFilter()]
    public class UserAdministrationController : PhekoController
    {
        private IUserHandler _IUserHandler = new UserHandler();
        private IListHandler _IListHandler = new ListHandler();

        [HttpGet]
        public ActionResult UserAdministration()
        {
            ViewBag.Titles = _IListHandler.GetFieldValues("Patient", "Title");
            ViewBag.Genders = _IListHandler.GetFieldValues("Patient", "Gender");
            ViewBag.SecurityUserRoles = _IListHandler.GetRoles();

            return View();
        }

        [HttpPost]
        public ActionResult LoadUsers(string searchText, int pageIndex, int pageSize)
        {
            try
            {
                Response.CacheControl = "no-cache";

                DataSourceResult<SecurityUserViewModel> response = _IUserHandler.GetUsers(searchText, pageIndex, pageSize);

                return Json(new { data = response }, JsonRequestBehavior.AllowGet);
            }
            catch (ModelException ex)
            {
                return Json(new { errors = ex.ModelErrors }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult SaveUser(SecurityUserViewModel model)
        {
            try
            {
                Response.CacheControl = "no-cache";

                SecurityUserViewModel securityUserViewModel = _IUserHandler.SaveUser(model);

                return Json(new { ok = true, data = securityUserViewModel });
            }
            catch (ModelException ex)
            {
                return Json(new { errors = ex.ModelErrors });
            }
        }
    }
}
