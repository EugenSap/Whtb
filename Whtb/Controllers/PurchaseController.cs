using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using Whtb.Models;
using Whtb.Repositories;
using Whtb.Utils;
using System.Text.Json;

namespace Whtb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private static IPurchaseRepo? _repo;

        public PurchaseController()
        {
            _repo ??= IoC.GetInstance<IPurchaseRepo>();
        }

        /// <summary>
        /// Получить покупку 
        /// </summary>
        /// <param name="guid">purchase Id</param>
        /// <returns>покупка</returns>
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Purchase>> Get(Guid guid)
        {
            var p = _repo.GetPurchase(guid);
            //return Ok(_repo.GetPurchase(guid));
            var s = new ObjectResult(new { p.Name, p.Id, p.Cost, User = (UserPoco)p.User, p.Completed });
            return s;
        }

        /// <summary>
        /// Обновить покупку
        /// </summary>
        /// <param name="purchase">purchase</param>
        /// <returns>успех/неудача</returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]PurchasePoco purchase)
        {
            var id = User.Claims.Where(x => x.Type.Equals("Id")).First().Value;
            var p = _repo.GetPurchase(purchase.Id);
            if (p == null || p.User.Id != Guid.Parse(id))
            {
                return BadRequest();
            }
            _repo.UpdatePurchase(purchase);
            return Ok();
        }
    }
}
