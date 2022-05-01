using System;
using System.Collections.Generic;
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

        protected override void AddUpgradeHints(Xtensive.Collections.ISet<UpgradeHint> hints)
        {
            var executedUpgraders = new List<string>();
            var ctx = UpgradeContext.Demand();
            var cmdText = "SELECT [SystemName] FROM [ExecutedUpgrader]";
            var connection = ctx.Connection;
            var cmd = connection.CreateCommand();
            cmd.CommandText = cmdText;
            cmd.Transaction = ctx.Transaction;
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    executedUpgraders.Add(reader.GetString(0));
                }
            }

            var upgraders = ReflectionHelper.GetAllImplementations(typeof(IUpgrader))
                    .Where(x => !executedUpgraders.Contains(x.FullName));
            foreach (var upgrader in upgraders)
            {
                var o = (IUpgrader)ReflectionHelper.CreateObject(upgrader);
                o.AddUpgradeHints(hints);
            }
        }
    }
}
