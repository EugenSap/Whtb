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
        
        [HttpGet]
        public async Task<ActionResult<IQueryable<object>>> Get(Guid guid)
        {
            return new ObjectResult( _repo.GetUserGroups(Guid.Empty).Select(x => new {x.Id, x.GroupName, x.RemainSum, x.AllSum, x.DateTime, x.GroupStatus, x.UserStatusForGroup}));
        }
    }
}