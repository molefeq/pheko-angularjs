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
    
    public partial class SecurityRole
    {
        public SecurityRole()
        {
            this.SecurityObjectRights = new HashSet<SecurityObjectRight>();
            this.SecurityUserRoles = new HashSet<SecurityUserRole>();
        }
    
        public int SecurityRoleId { get; set; }
        public string SecurityRoleName { get; set; }
    
        public virtual ICollection<SecurityObjectRight> SecurityObjectRights { get; set; }
        public virtual ICollection<SecurityUserRole> SecurityUserRoles { get; set; }
    }
}