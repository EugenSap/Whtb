using System;
using Whtb.Models;
using Xtensive.Orm;

namespace Whtb.Repositories
{
    /// <summary> репозиторий покупок </summary>
    public class PurchaseRepo : IPurchaseRepo
    {
        /// <inheritdoc/>
        public bool CreatePurchase(Purchase purchase)
        {
            throw new NotImplementedException();
        }

        /// <inheritdoc/>
        public bool DeletePurchase(Guid id)
        {
            throw new NotImplementedException();
        }

        /// <inheritdoc/>
        public Purchase GetPurchase(Guid id)
        {
            return Query.Single<Purchase>(id);
        }

        /// <inheritdoc/>
        public bool UpdatePurchase(PurchasePoco purchase)
        {
            try
            {
                var p = Query.Single<Purchase>(purchase.Id);
                p.Completed = purchase.Completed;
                p.Cost = purchase.Cost;
                p.Name = purchase.Name;
                Session.Current.SaveChanges();
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}
