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
                /*var usr = new User()
                {
                    Id = Guid.NewGuid(),
                    Nick = "Неназначенные покупки"

                };*/
                var purchase = new Purchase()
                {
                    Id = Guid.Parse("AA0F1A58-A451-4514-8301-A1C305397682"),
                    Name = "Покупка1",
                    Cost = 10,
                    User = null
                };
                var purchase2 = new Purchase()
                {
                    Id = Guid.Parse("3C2F5AF5-3FCE-4200-B7FD-40CEAC375A00"),
                    Name = "Покупка2",
                    Cost = 120,
                    User = null
                };
                var purchase3 = new Purchase()
                {
                    Id = Guid.Parse("B4A2D19C-3FE5-4AB3-BE2E-CE497BCB1D2F"),
                    Name = "Покупка3",
                    Cost = 120,
                    User = null
                };
                
                var grp1 = new Group()
                {
                    Id = Guid.NewGuid(),
                    GroupName = "Группа крови",
                    DateTime = new DateTime(2022, 01, 13),
                    AllSum = 100,
                    RemainSum = 50,
                    GroupStatus = GroupStatus.NotComplete,
                    UserStatusForGroup = UserStatusForGroup.Complete,
                    Purchases = new List<Purchase>{purchase, purchase2,purchase3}
                };
                
                //grp1.Users.Add(usr);
                grp1.Users.AddRange(_userRepo.GetUsers());
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
        
        /// <inheritdoc/>
        public Group GetGroupById(Guid userId, Guid groupId)
        {
            return _groups.Where(x => x.Id == groupId).SingleOrDefault();
        }

        /// <inheritdoc/>
        public Group CreateGroup(string groupName, DateTime date, Guid userId)
        {
            var user = _userRepo.GetUserById(userId);
            if (user == null)
            {
                return null;
            }
            var group = new Group()
            {
                Id = Guid.NewGuid(),
                GroupName = groupName,
                DateTime = date,
            };
            group.Users.Add(user);
            _groups.Add(group);
            return group;
        }
    }
}