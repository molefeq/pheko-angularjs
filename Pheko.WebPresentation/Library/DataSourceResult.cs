using System.Collections.Generic;

namespace Pheko.WebPresentation.Library
{
    public class DataSourceResult<T> where T : class
    {
        public int Total { get; set; }
        public List<T> Data { get; set; }
    }
}
