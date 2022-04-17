using System;
using System.Collections.Generic;
using Whtb.Enums;
using Xtensive.Orm;

namespace Whtb.Models
{
    /// <summary>
    /// Группа
    /// </summary>
    [HierarchyRoot]
    public class Group : Entity
    {
        public Group(Guid id) : base(id)
        {
        }
        
        /// <summary> Id </summary>
        [Field]
        [Key]
        public Guid Id { get; set; }

        /// <summary> Статус группы </summary>
        [Field]
        public GroupStatus GroupStatus { get; set; }

        /// <summary> Дата группы </summary>
        [Field]
        public DateTime DateTime { get; set; }

        /// <summary> Название группы </summary>
        [Field]
        public string GroupName { get; set; }

        /// <summary> Полная сумма </summary>
        [Field]
        public decimal AllSum { get; set; }

        /// <summary> Оставшаяся сумма </summary>
        [Field]
        public decimal RemainSum { get; set; }

        /// <summary> Полная сумма пользователя </summary>
        [Field]
        public decimal AllUserSum { get; set; }

        /// <summary> Оставшаяся сумма пользователя </summary>
        [Field]
        public decimal RemainUserSum { get; set; }

        /// <summary> Пользователи группы </summary>
        [Field]
        public EntitySet<User> Users { get; set; }

        /// <summary> Статус пользователя в группе </summary>
        [Field]
        public UserStatusForGroup UserStatusForGroup { get; set; }

        /// <summary> Список покупок </summary>
        [Field]
        public EntitySet<Purchase> Purchases { get; set; }
    }
}