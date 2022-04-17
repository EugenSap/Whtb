using System;
using Xtensive.Orm;

namespace Whtb.Models
{
    /// <summary> Покупка </summary>
    [HierarchyRoot]
    public class Purchase : Entity
    {
        /// <summary> .ctor </summary>
        public Purchase (Guid id) : base(id)
        {
        }

        /// <summary> Id </summary>
        [Field]
        [Key]
        public Guid Id { get; set; }

        /// <summary> Название </summary>
        [Field]
        public string Name { get; set; }

        /// <summary> Цена </summary>
        [Field]
        public decimal Cost { get; set; }

        /// <summary> Куплена </summary>
        [Field]
        public bool Complited { get; set; }

        /// <summary> Пользователь </summary>
        [Field]
        public User? User { get; set; }

        /// <summary> Группа </summary>
        public Group Group { get; set; }
    }
}