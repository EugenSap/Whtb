using Whtb.Extensions;
using Whtb.Models;
using Whtb.Utils.Interfaces;
using Xtensive.Orm;

namespace Whtb.Upgraders
{
    public class WHTB27Upgrader : IUpgrader
    {
        void IUpgrader.Upgrade() 
        {
            foreach (var user in Query.All<User>())
            {
                user.Password = user.Password.GetHash();
            }
            Session.Current.SaveChanges();
        }
    }
}
