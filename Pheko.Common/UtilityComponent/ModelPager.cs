using Pheko.Common.Enums;

namespace Pheko.Common.UtilityComponent
{
    public class ModelPager
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string OrderColumn { get; set; }
        public SortOrder SortOrder { get; set; }
        public bool IncludeAll { get; set; }
    }
}
