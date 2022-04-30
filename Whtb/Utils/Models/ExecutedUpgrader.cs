using System;
using Xtensive.Orm;

namespace Whtb.Utils.Models
{
    [HierarchyRoot]
    public class ExecutedUpgrader : Entity
    {
        /// <summary> .ctor </summary>
        public ExecutedUpgrader(Guid id) : base(id)
        {
        }

        /// <summary> Id </summary>
        [Field]
        [Key]
        public Guid Id { get; private set; }

        /// <summary> название </summary>
        [Field]
        public string SystemName { get; set; }

        /// <summary> название </summary>
        [Field]
        public DateTime Date { get; set; }
    }
}
