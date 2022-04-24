using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IQueryable<User>>> Get()
        {
            var id = Guid.Parse(User.Claims.Where(x => x.Type.Equals("Id")).First().Value);
            _repo ??= IoC.GetInstance<IUserRepo>();
            return new ObjectResult(_repo.GetFriends(id).Select(x => new { x.Id, x.Nick }));
        }

        /// <summary>
        /// Получить инфо Пользователя
        /// </summary>
        /// <param name="userId">Id пользователя</param>
        /// <returns>Инфо</returns>
        [HttpGet("GetUserInfo")]
        [Authorize]
        public async Task<ActionResult<UserPoco>> GetUserInfo(Guid userId)
        {
            var id = Guid.Parse(User.Claims.Where(x => x.Type.Equals("Id")).First().Value);
            _repo ??= IoC.GetInstance<IUserRepo>();
            var user = id == userId 
                ? (UserPoco)_repo.GetUserById(userId) 
                : _repo.GetFriends(id).Where(x => x.Id == userId).SingleOrDefault(); // можем получить инфо только по друзъям

            return new ObjectResult(user);
        }

        /// <summary>
        /// Добавить друга
        /// </summary>
        /// <param name="friendId">friendId</param>
        /// <returns>IActionResult</returns>
        [HttpPost("AddFriend")]
        [Authorize]
        public async Task<ActionResult<IQueryable<object>>> AddFriend(Guid friendId)
        {
            var id = Guid.Parse(User.Claims.Where(x => x.Type.Equals("Id")).First().Value);
            _repo ??= IoC.GetInstance<IUserRepo>();
            if (!_repo.AddFriend(id, friendId))
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}