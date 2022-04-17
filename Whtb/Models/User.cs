using System;
using System.Collections.Generic;
using Xtensive.Orm;

namespace Whtb.Models
{
    /// <summary> Пользователь </summary>
    [HierarchyRoot]
    public class User : Entity
    {
        /// <summary> .ctor </summary>
        public User(Guid id): base(id)
        {
        }

        /// <summary> Id </summary>
        [Field]
        [Key]
        public Guid Id { get; private set; }

        /// <summary> Ник </summary>
        [Field]
        public string Nick { get; set; }

        /// <summary> Логин </summary>
        [Field]
        public string Login { get; set; }

        /// <summary> Пароль </summary>
        [Field]
        public string Password { get; set; }

        /// <summary> Друзья </summary>
        [Field]
        public EntitySet<User> Friends { get; set; }

        public static explicit operator UserPoco(User user)
        {
            return user == null ? null : new UserPoco { Id = user.Id, Nick = user.Nick };
        }
    }
}