﻿using System.Collections.Generic;
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

        /// <summary>
        /// Найти пользователя по логину и паролю
        /// </summary>
        /// <param name="login">login</param>
        /// <param name="password">password</param>
        /// <returns>пользователь</returns>
        User? GetUserByLoginAndPassword(string login, string password);

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