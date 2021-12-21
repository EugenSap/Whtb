using System.Collections.Generic;
using Whtb.Models;

namespace Whtb.Repositories
{
    /// <summary> Репозиторий пользователей </summary>
    public interface IUserRepo
    {
        /// <summary>
        /// Получить список всех пользователей
        /// </summary>
        /// <returns>список всех пользователей</returns>
        List<User> GetUsers();
    }
}