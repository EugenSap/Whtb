using System;
using System.Collections.Generic;
using System.Linq;
using Whtb.Models;

namespace Whtb.Repositories
{
    /// <summary> Репозиторий групп </summary>
    public interface IGroupRepo
    {
        /// <summary>
        /// Получить группы пользователя
        /// </summary>
        /// <param name="userId"> Id пользователя</param>
        /// <returns>Группы пользователя</returns>
        IQueryable<Group> GetUserGroups(Guid userId);

        /// <summary>
        /// Получить группу по Id
        /// </summary>
        /// <param name="userId">userId</param>
        /// <param name="groupId">groupId</param>
        /// <returns>Группа</returns>
        Group GetGroupById(Guid userId, Guid groupId);

        /// <summary>
        /// Создать группу
        /// </summary>
        /// <param name="groupName">groupName</param>
        /// <param name="date">date</param>
        /// <param name="userId">userId</param>
        /// <returns>Группа</returns>
        Group CreateGroup(string groupName, DateTime date, Guid userId);

        /// <summary>
        /// Добавить пользователя в группу
        /// </summary>
        /// <param name="group">group</param>
        /// <param name="user">user</param>
        /// <returns>Group</returns>
        Group AddUser(Group group, Guid user);
    }
}