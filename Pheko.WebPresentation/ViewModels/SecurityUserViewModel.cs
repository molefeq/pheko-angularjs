using System;
using System.ComponentModel.DataAnnotations;

namespace Pheko.WebPresentation.ViewModels
{
    public class SecurityUserViewModel
    {
        public int? SecurityUserId { get; set; }

        [Display(Name = "UserName")]
        [Required]
        [StringLength(50)]
        public string UserName { get; set; }

        [Display(Name = "Title")]
        [StringLength(10)]
        public string Title { get; set; }

        [Display(Name = "Initials")]
        [StringLength(10)]
        public string Initials { get; set; }

        [Display(Name = "FirstName")]
        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Display(Name = "LastName")]
        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Display(Name = "ID Number")]
        [StringLength(20)]
        public string IDNumber { get; set; }

        [Display(Name = "Date Of Birth")]
        public DateTime? BirthDate { get; set; }

        [Display(Name = "Gender")]
        [StringLength(10)]
        public string Gender { get; set; }

        [Display(Name = "Work Telephone")]
        [StringLength(10)]
        public string WorkTelephoneCode { get; set; }

        [Display(Name = "Work Telephone")]
        [StringLength(10)]
        public string WorkTelephoneNumber { get; set; }

        [Display(Name = "Fax Number")]
        [StringLength(10)]
        public string FaxCode { get; set; }

        [Display(Name = "Fax Number")]
        [StringLength(10)]
        public string FaxNumber { get; set; }

        [Display(Name = "Mobile")]
        [StringLength(10)]
        public string MobileNumber { get; set; }

        [Display(Name = "Email Address")]
        [StringLength(100)]
        public string EmailAddress { get; set; }

        [Display(Name = "Employee Number")]
        [StringLength(50)]
        public string EmployeeNumber { get; set; }

        [Display(Name = "Disable Date")]
        public DateTime? DisabledDate { get; set; }

        [Display(Name = "Employee Type")]
        [Required]
        [StringLength(50)]
        public int? SecurityUserRoleId { get; set; }
    }
}
