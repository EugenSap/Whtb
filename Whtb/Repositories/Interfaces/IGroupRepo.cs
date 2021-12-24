using System;
using System.Collections.Generic;
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
        List<Group> GetUserGroups(Guid userId);

        /// <summary>
        /// Получить группу по Id
        /// </summary>
        /// <param name="userId">userId</param>
        /// <param name="groupId">groupId</param>
        /// <returns>Группа</returns>
        Group GetGroupById(Guid userId, Guid groupId);
    }
}