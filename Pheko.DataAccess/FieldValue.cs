//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Pheko.DataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class FieldValue
    {
        public int FieldValueId { get; set; }
        public int FieldId { get; set; }
        public Nullable<int> SortOrder { get; set; }
        public string PropertyValue { get; set; }
        public string DisplayValue { get; set; }
    
        public virtual Field Field { get; set; }
    }
}