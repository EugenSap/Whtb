using System;
using System.Collections.Generic;
using System.Linq;
using Whtb.Models;
using Xtensive.Core;
using Xtensive.Orm;

namespace Whtb.Repositories
{
    /// <summary>
    /// UserRepo
    /// </summary>
    public class UserRepo : IUserRepo
    {
        public bool AddFriend(Guid userId, Guid friendId)
        {
            try
            {
                var user = Query.All<User>().Where(x => x.Id == userId).Single();
                if (user.Friends.Any(x => x.Id == friendId))
                {
                    return true;
                }
                var friend = Query.All<User>().Where(x => x.Id == friendId).Single();
                friend.Friends.Add(user);
                user.Friends.Add(friend);
                Session.Current.SaveChanges();
            }
            catch
            {
                return false;
            }
            return true;
        }

        /// <inheritdoc/>
        public IQueryable<UserPoco> GetFriends(Guid userId)
        {
            return Query.All<User>().Where(x => x.Id == userId).SingleOrDefault().Friends.Select(x => (UserPoco)x);
        }

        /// <inheritdoc/>
        public User? GetUserById(Guid userId)
        {
            return Query.All<User>().Where(x => x.Id == userId).SingleOrDefault();
        }

        /// <inheritdoc/>
        public UserPoco? GetUserByLoginAndPassword(string login, string password)
        {
            return (UserPoco)Query.All<User>().Where(x => x.Login == login && x.Password == password).SingleOrDefault();
        }

        /// <inheritdoc/>
        public IQueryable<UserPoco> GetUsers()
        {
            return Query.All<User>().Select(x => (UserPoco)x);
        }

        /// <inheritdoc/>
        public bool RegisterUser(string login, string nick, string password)
        {
            try
            {
                var existedUser = Query.All<User>().Where(x => x.Login == login).SingleOrDefault();
                if (existedUser != null)
                {
                    return false;
                }

                var user = new User(Guid.NewGuid()) { Login = login, Password = password, Nick = nick };
                Session.Current.SaveChanges();
            }
            catch
            {
                return false;
            }
            
            return true;
        }
    }
}
