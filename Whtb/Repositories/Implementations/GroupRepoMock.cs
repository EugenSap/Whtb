using System;
using System.Collections.Generic;
using System.Linq;
using Whtb.Enums;
using Whtb.Models;
using Whtb.Utils;

namespace Whtb.Repositories
{
    /// <summary> Фейковый репозиторий групп </summary>
    public class GroupRepoMock : IGroupRepo
    {
        private IUserRepo _userRepo;
        private List<Group> _groups;
        /// <summary> .ctor </summary>
        public GroupRepoMock()
        {
            _userRepo = IoC.GetInstance<IUserRepo>();
            if (_groups == null || _groups.Count < 1)
            {
                var grp1 = new Group()
                {
                    Id = Guid.NewGuid(),
                    GroupName = "Группа крови",
                    DateTime = new DateTime(2022, 01, 13),
                    AllSum = 100,
                    RemainSum = 50,
                    GroupStatus = GroupStatus.NotComplete,
                    UserStatusForGroup = UserStatusForGroup.Complete
                };

                _groups = new List<Group> {grp1};
            }
        }
        
        /// <inheritdoc/>
        public List<Group> GetUserGroups(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return _groups;
            }

            return _groups.Where(x => x.Users.Any(z => z.Id == userId)).ToList();
        }
    }
}