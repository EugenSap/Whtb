using System;
using System.Collections.Generic;
using System.Linq;
using Whtb.Enums;
using Whtb.Models;
using Whtb.Utils;

using Xtensive.Core;
using Xtensive.Orm;

namespace Whtb.Repositories
{
    /// <summary> Фейковый репозиторий групп </summary>
    public class GroupRepo : IGroupRepo
    {
        private IUserRepo _userRepo;

        /// <summary> .ctor </summary>
        public GroupRepo()
        {
            _userRepo ??= IoC.GetInstance<IUserRepo>();
        }
        
        /// <inheritdoc/>
        public IQueryable<Group> GetUserGroups(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return new List<Group>().AsQueryable();
            }
            var user = Query.All<User>().Where(x => x.Id == userId).SingleOrDefault();
            return Query.All<Group>().Where(x => x.Users.Contains(user));
        }
        
        /// <inheritdoc/>
        public Group GetGroupById(Guid userId, Guid groupId)
        {
            return Query.All<Group>().Where(x => x.Id == groupId).SingleOrDefault();
        }

        /// <inheritdoc/>
        public Group CreateGroup(string groupName, DateTime date, Guid userId)
        {
            var user = _userRepo.GetUserById(userId);
            if (user == null)
            {
                return null;
            }
            var group = new Group(Guid.NewGuid())
            {
                GroupName = groupName,
                DateTime = date,
            };
            group.Users.Add(user);
            Session.Current.SaveChanges();
            return group;
        }
    }
}