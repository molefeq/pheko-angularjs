using Pheko.Common.Enums;
using Pheko.Common.UtilityComponent;

using Pheko.WebPresentation.Library;
using Pheko.WebPresentation.MappingViewModelsToDtos;
using Pheko.WebPresentation.PhekoService;
using Pheko.WebPresentation.ServiceHandlers.Interfaces;
using Pheko.WebPresentation.Utility;
using Pheko.WebPresentation.ViewModels;

using System.Linq;

namespace Pheko.WebPresentation.ServiceHandlers.Classes
{
    public class UserHandler : IUserHandler
    {
        private PhekoServiceClient _PhekoServiceClient = new PhekoServiceClient();
        private SecurityUserViewModelMapper _SecurityUserViewModelMapper = new SecurityUserViewModelMapper();

        public UserHandler() { }

        public SecurityUserViewModel Login(string username, string password)
        {
            SecurityUserDtoResponse response = _PhekoServiceClient.Login(username, password);

            if (response.HasErrors)
            {
                ModelException modelException = new ModelException();

                response.FieldErrors.ToList<FieldError>().ForEach(item => modelException.ModelErrors.Add(new ModelError() { FieldName = item.FieldName, Message = item.ErrorMessage }));

                throw modelException;
            }

            return _SecurityUserViewModelMapper.MapToPatientAddressViewModel(response.Model);
        }

        public DataSourceResult<SecurityUserViewModel> GetUsers(string searchText, int pageIndex, int pageSize)
        {
            ModelPager modelPager = new ModelPager()
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                IncludeAll = false,
                SortOrder = SortOrder.ASCENDING,
                OrderColumn = "FirstName"
            };
            SecurityUserDtoResult response = _PhekoServiceClient.GetUsers(searchText, modelPager);

            return new DataSourceResult<SecurityUserViewModel>()
            {
                Total = response.Total,
                Data = response.Models.Select(item => _SecurityUserViewModelMapper.MapToPatientAddressViewModel(item)).ToList<SecurityUserViewModel>()
            };
        }

        public SecurityUserViewModel SaveUser(SecurityUserViewModel securityUserViewModel)
        {
            SecurityUserDtoResponse response = _PhekoServiceClient.SaveUser(_SecurityUserViewModelMapper.MapToSecurityUserDto(securityUserViewModel));

            if (response.HasErrors)
            {
                ModelException modelException = new ModelException();

                response.FieldErrors.ToList<FieldError>().ForEach(item => modelException.ModelErrors.Add(new ModelError() { FieldName = item.FieldName, Message = item.ErrorMessage }));

                throw modelException;
            }

            return _SecurityUserViewModelMapper.MapToPatientAddressViewModel(response.Model);
        }
    }
}
