using System.Web;
using System.Web.Optimization;

namespace Pheko.WebMvc
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));
            bundles.Add(new StyleBundle("~/Content/bootstrap/css").Include("~/Content/bootstrap/css/bootstrap.css"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/Scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include("~/Scripts/jquery.unobtrusive*", "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap/js").Include("~/Scripts/bootstrap/js/bootstrap.js", "~/Bootstrap/js/bootstrap-datepicker.js"));
            bundles.Add(new ScriptBundle("~/bundles/pheko/base").Include(
                "~/Scripts/pheko/base/jquery.validate.unobtrusive.bootstrap.tooltip.js",
                "~/Scripts/pheko/base/serversidevalidation.js",
                "~/Scripts/pheko/base/utils.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-*"));
        }
    }
}