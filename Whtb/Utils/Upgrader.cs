using System;
using System.Linq;
using Whtb.Utils.Interfaces;
using Whtb.Utils.Models;
using Xtensive.Orm;
using Xtensive.Orm.Upgrade;

namespace Whtb.Utils
{
    public class Upgrader : UpgradeHandler
    {
        public override void OnUpgrade()
        {
            var upgraders = ReflectionHelper.GetAllImplementations(typeof(IUpgrader))
                .Where(x => !Query.All<ExecutedUpgrader>().Select(up => up.SystemName).Contains(x.FullName));
            foreach (var upgrader in upgraders)
            {
                var o = (IUpgrader) ReflectionHelper.CreateObject(upgrader);
                o.Upgrade();
                var executed = new ExecutedUpgrader(Guid.NewGuid()) { Date = DateTime.Now, SystemName = o.GetType().FullName };
            }
            Session.Current.SaveChanges();
        }
    }
}
