using System;
using System.Collections.Generic;
using Whtb.Enums;

namespace Whtb.Models
{
    /// <summary>
    /// Группа
    /// </summary>
    public class Group
    {
        public Group()
        {
            Users = new List<User>();
            Purchases = new List<Purchase>();
            GroupName = string.Empty;
        }
        
        /// <summary> Id </summary>
        public Guid Id { get; set; }
        
        /// <summary> Статус группы </summary>
        public GroupStatus GroupStatus { get; set; }
        
        /// <summary> Дата группы </summary>
        public DateTime DateTime { get; set; }
        
        /// <summary> Название группы </summary>
        public string GroupName { get; set; }
        
        /// <summary> Полная сумма </summary>
        public decimal AllSum { get; set; }
        
        /// <summary> Оставшаяся сумма </summary>
        public decimal RemainSum { get; set; }
        
        /// <summary> Полная сумма пользователя </summary>
        public decimal AllUserSum { get; set; }
        
        /// <summary> Оставшаяся сумма пользователя </summary>
        public decimal RemainUserSum { get; set; }
        
        /// <summary> Пользователи группы </summary>
        public List<User> Users { get; set; }
        
        /// <summary> Статус пользователя в группе </summary>
        public UserStatusForGroup UserStatusForGroup { get; set; }
        
        /// <summary> Список покупок </summary>
        public List<Purchase> Purchases { get; set; }
    }
}