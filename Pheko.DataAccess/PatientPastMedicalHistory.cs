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
    
    public partial class PatientPastMedicalHistory
    {
        public int PatientPastMedicalHistoryId { get; set; }
        public int PatientId { get; set; }
        public int PastMedicalHistoryId { get; set; }
        public string Value { get; set; }
    
        public virtual PastMedicalHistory PastMedicalHistory { get; set; }
        public virtual Patient Patient { get; set; }
    }
}
