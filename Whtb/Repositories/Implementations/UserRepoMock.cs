using System;
using System.Collections.Generic;
using System.Linq;
using Whtb.Models;

namespace Whtb.Repositories
{
    /// <summary> Фейковый репозиторий пользователей </summary>
    public class UserRepoMock : IUserRepo
    {
        private static List<User> _users;

        /// <summary> .ctor </summary>
        public UserRepoMock()
        {
            if (_users == null || _users.Count < 1)
            {
                var usr1 = new User
                {
                    Id = new Guid("35F961CD-A5FF-4F2E-BAB7-1E59F6D143BB"), Nick = "Иван", Login = "Ivan", Password = "12345"
                };
                
                var usr2 = new User
                {
                    Id = new Guid("D2E6B232-762A-4A6D-A929-7CD54ACFF88F"), Nick = "Гарри Поттер", Login = "Harry", Password = "12345"
                };
                
                var usr3 = new User
                {
                    Id = new Guid("E40265E8-7716-4439-8FB0-462801F3769C"), Nick = "Мэрри Попинс", Login = "Marry", Password = "12345"
                };
                
                usr1.Friends.Add(usr2);
                usr1.Friends.Add(usr3);
                usr2.Friends.Add(usr1);
                usr3.Friends.Add(usr1);
                _users = new List<User> {usr1, usr2, usr3};
            }
        }
        
        /// <inheritdoc/>
        public List<User> GetUsers()
        {
            return _users;
        }

        public User? GetUserByLoginAndPassword(string login, string password)
        {
            return _users.Where(x => x.Login == login && x.Password == password).SingleOrDefault();
        }

        public bool RegisterUser(string login, string nick, string password)
        {
            if (_users.Any(x => x.Login == login || x.Nick == nick))
            {
                return false;
            }

            var usr = new User()
            {
                Id = Guid.NewGuid(),
                Login = login,
                Nick = nick,
                Password = password
            };
            _users.Add(usr);
            return true;
        }
    }
}