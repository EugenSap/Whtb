using Whtb.Models;
using Whtb.Utils.Interfaces;
using Xtensive.Orm.Upgrade;

namespace Whtb.Upgraders
{
    public class WHTB24Upgrader : IUpgrader
    {
        void IUpgrader.AddUpgradeHints(Xtensive.Collections.ISet<Xtensive.Orm.Upgrade.UpgradeHint> hints)
        {
            hints.Add(new RenameFieldHint(typeof(Purchase), "Complited", "Completed"));
        }
    }
}
