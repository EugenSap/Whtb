using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Whtb.Models;
using Whtb.Repositories;
using Whtb.Utils;

namespace Whtb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private static IUserRepo? _repo;
        
        /// <summary>
        /// Получить всех пользователей
        /// </summary>
        /// <returns>ActionResult</returns>
        //TODO : Удалить (только для тестов или дать права только для админа)
        [HttpGet]
        public async Task<ActionResult<IQueryable<User>>> Get()
        {
            _repo ??= IoC.GetInstance<IUserRepo>();
            return new ObjectResult( _repo.GetUsers().Select(x => new {x.Id, x.Nick}));
        }
    }
}