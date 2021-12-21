using System;
using System.Collections.Generic;
using Whtb.Models;

namespace Whtb.Repositories
{
    public class UserRepoMock : IUserRepo
    {
        private static List<User> _users;

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
    }
}