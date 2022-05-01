using Xtensive.Orm.Upgrade;

namespace Whtb.Utils.Interfaces
{
    public interface IUpgrader
    {
        void Upgrade() { }

        void AddUpgradeHints(Xtensive.Collections.ISet<UpgradeHint> hints) { }
    }
}
