using Pheko.WebPresentation.Library;
using Pheko.WebPresentation.ViewModels;

namespace Pheko.WebPresentation.ServiceHandlers.Interfaces
{
    public interface IUserHandler
    {
        SecurityUserViewModel Login(string username, string password);
        DataSourceResult<SecurityUserViewModel> GetUsers(string searchText, int pageIndex, int pageSize);
        SecurityUserViewModel SaveUser(SecurityUserViewModel securityUserViewModel);
    }
}
