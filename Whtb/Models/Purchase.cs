using System;

namespace Whtb.Models
{
    /// <summary> Покупка </summary>
    public class Purchase
    {
        /// <summary> Id </summary>
        public Guid Id { get; set; }
        
        /// <summary> Название </summary>
        public string Name { get; set; }
        
        /// <summary> Цена </summary>
        public decimal Cost { get; set; }
        
        /// <summary> Куплена </summary>
        public bool Complited { get; set; }
        
        /// <summary> Пользователь </summary>
        public User? User { get; set; }
    }
}