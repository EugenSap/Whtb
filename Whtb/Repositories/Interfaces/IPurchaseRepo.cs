using System;
using System.Linq;
using Whtb.Models;

namespace Whtb.Repositories
{
    /// <summary> Репозиторий покупок </summary>
    public interface IPurchaseRepo
    {
        /// <summary>
        /// Найти покупку по id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns>Покупка</returns>
        Purchase GetPurchase(Guid id);

        /// <summary>
        /// Создать покупку
        /// </summary>
        /// <param name="purchase">покупка</param>
        /// <returns>успех/неудача</returns>
        bool CreatePurchase (Purchase purchase);

        /// <summary>
        /// Обновить покупку
        /// </summary>
        /// <param name="purchase">Покупка</param>
        /// <returns>успех/неудача</returns>
        bool UpdatePurchase (PurchasePoco purchase);

        /// <summary>
        /// Удалить покупку
        /// </summary>
        /// <param name="id">id</param>
        /// <returns>успех/неудача</returns>
        bool DeletePurchase (Guid id);
    }
}
