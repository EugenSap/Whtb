using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Whtb.Repositories;
using Whtb.Utils;

namespace Whtb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupController : ControllerBase
    {
        private static IGroupRepo? _repo;

        public GroupController()
        {
            _repo ??= IoC.GetInstance<IGroupRepo>();
        }
        
        /// <summary>
        /// Get groups for user 
        /// </summary>
        /// <param name="guid">user Id</param>
        /// <returns>user's groups</returns>
        [HttpGet]
        public async Task<ActionResult<IQueryable<object>>> Get(Guid guid)
        {
            return new ObjectResult( _repo.GetUserGroups(Guid.Empty).Select(x => new {x.Id, x.GroupName, x.RemainSum, x.AllSum, x.DateTime, x.GroupStatus, x.UserStatusForGroup}));
        }
        
        /// <summary>
        /// Get group
        /// </summary>
        /// <param name="userId">userId</param>
        /// <param name="groupId">groupId</param>
        /// <returns>group data</returns>
        [HttpGet("GetGroupById")]
        public async Task<ActionResult<IQueryable<object>>> Get(Guid userId, Guid groupId)
        {
            var group = _repo.GetGroupById(userId, groupId);
            var users = group.Users.Select(x => new {x.Id, x.Nick});
            var purchases = group.Purchases.Select(x => new {x.Id, x.Name, x.Cost});
            return new ObjectResult( new
            {
                group.Id,
                group.GroupName,
                group.RemainSum,
                group.AllSum,
                group.DateTime,
                group.GroupStatus,
                group.UserStatusForGroup,
                users,
                purchases,
            });
        }
    }
}