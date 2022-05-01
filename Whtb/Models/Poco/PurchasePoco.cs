using System;

namespace Whtb.Models
{
    public class PurchasePoco
    {
        /// <summary> Id </summary>
        public Guid Id { get; set; }

        /// <summary> Название </summary>
        public string Name { get; set; }

        /// <summary> Цена </summary>
        public decimal Cost { get; set; }

        /// <summary> Куплена </summary>
        public bool Completed { get; set; }

        /// <summary> Пользователь </summary>
        public User? User { get; set; }

        /// <summary> Группа </summary>
        public Group? Group { get; set; }
    }
}
