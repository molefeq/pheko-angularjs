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
    
    public partial class PatientConsultation
    {
        public PatientConsultation()
        {
            this.PatientClinicalExaminations = new HashSet<PatientClinicalExamination>();
            this.PatientConsultationSickNotes = new HashSet<PatientConsultationSickNote>();
            this.PatientMedicalMonitorings = new HashSet<PatientMedicalMonitoring>();
            this.PatientMedicalNotes = new HashSet<PatientMedicalNote>();
            this.PatientVitalSigns = new HashSet<PatientVitalSign>();
        }
    
        public int PatientConsultationId { get; set; }
        public int DoctorId { get; set; }
        public int PatientId { get; set; }
        public string ConsultationStatus { get; set; }
        public System.DateTime StartDate { get; set; }
        public System.DateTime EndDate { get; set; }
    
        public virtual Doctor Doctor { get; set; }
        public virtual Patient Patient { get; set; }
        public virtual ICollection<PatientClinicalExamination> PatientClinicalExaminations { get; set; }
        public virtual ICollection<PatientConsultationSickNote> PatientConsultationSickNotes { get; set; }
        public virtual ICollection<PatientMedicalMonitoring> PatientMedicalMonitorings { get; set; }
        public virtual ICollection<PatientMedicalNote> PatientMedicalNotes { get; set; }
        public virtual ICollection<PatientVitalSign> PatientVitalSigns { get; set; }
    }
}
