using System.Web;
using System.Web.Optimization;

namespace Pheko.Web
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));
            bundles.Add(new StyleBundle("~/bundles/bootstrapcss").Include("~/Bootstrap/css/bootstrap.css"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/Scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include("~/Scripts/jquery.unobtrusive*", "~/Scripts/jquery.validate*"));

            //bundles.Add(new ScriptBundle("~/bundles/angular").Include("~/Scripts/angular.min.js", "~/Scripts/angular-resource.min.js"));
            bundles.Add(new ScriptBundle("~/bundles/bootstrapjs").Include("~/Bootstrap/js/bootstrap.js", "~/Bootstrap/js/bootstrap-datepicker.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-*"));


        }
    }
}