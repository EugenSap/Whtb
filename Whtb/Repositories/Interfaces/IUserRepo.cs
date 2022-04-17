using System;
using System.Collections.Generic;
using System.Linq;
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
        IQueryable<UserPoco> GetUsers();

        /// <summary>
        /// Получить список всех пользователей
        /// </summary>
        /// <returns>список всех пользователей</returns>
        IQueryable<UserPoco> GetFriends(Guid userId);

        /// <summary>
        /// Найти пользователя по логину и паролю
        /// </summary>
        /// <param name="login">login</param>
        /// <param name="password">password</param>
        /// <returns>пользователь</returns>
        UserPoco? GetUserByLoginAndPassword(string login, string password);

        /// <summary>
        /// Найти пользователя по Id
        /// </summary>
        /// <param name="userId">userId</param>
        /// <returns>пользователь</returns>
        User? GetUserById(Guid userId);

        /// <summary>
        /// Зарегать пользователя
        /// </summary>
        /// <param name="login">login</param>
        /// <param name="nick">nick</param>
        /// <param name="password">password</param>
        /// <returns>успех/неудача</returns>
        bool RegisterUser(string login, string nick, string password);
    }
}