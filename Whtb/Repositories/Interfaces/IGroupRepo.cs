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
    }
}