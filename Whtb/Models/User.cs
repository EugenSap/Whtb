using System;
using System.Collections.Generic;

namespace Whtb.Models
{
    /// <summary> Пользователь </summary>
    public class User
    {
        /// <summary> .ctor </summary>
        public User()
        {
            Friends = new List<User>();
        }
        
        /// <summary> Id </summary>
        public Guid Id { get; set; }
        
        /// <summary> Ник </summary>
        public string Nick { get; set; }

        /// <summary> Логин </summary>
        public string Login { get; set; }

        /// <summary> Пароль </summary>
        public string Password { get; set; }

        /// <summary> Друзья </summary>
        public List<User> Friends { get; set; }
    }
}