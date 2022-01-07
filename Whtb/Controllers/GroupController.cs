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
        [Authorize]
        public async Task<ActionResult<IQueryable<object>>> Get()
        {
            var id = User.Claims.Where(x => x.Type.Equals("Id")).First().Value;
            return new ObjectResult( _repo.GetUserGroups(Guid.Parse(id)).Select(x => new {x.Id, x.GroupName, x.RemainSum, x.AllSum, x.DateTime, x.GroupStatus, x.UserStatusForGroup}));
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
            var o = await GetGroupData(group);
            return o;
        }

        /// <summary>
        /// Create purchase
        /// </summary>
        /// <param name="purchaseName">purchaseName</param>
        /// <param name="purchaseCost">purchaseCost</param>
        /// <param name="groupId">groupId</param>
        /// <param name="userId">userId</param>
        /// <returns>group</returns>
        [HttpPost("AddPurchase")]
        public async Task<ActionResult<IQueryable<object>>> AddPurchase(string purchaseName, decimal purchaseCost, Guid groupId, Guid userId)
        {
            var group = _repo.GetGroupById(userId, groupId);
            var purchase = new Purchase()
            {
                Name = purchaseName,
                Cost = purchaseCost,
                Id = Guid.NewGuid()
            };
            group.Purchases.Add(purchase);
            var o = await GetGroupData(group);
            return o;
        }
        
        /// <summary>
        /// Assign purchase
        /// </summary>
        /// <param name="groupId">groupId</param>
        /// <param name="userId">userId</param>
        /// <param name="purchaseId">purchaseId</param>
        /// <returns>group</returns>
        [HttpPost("AssignPurchase")]
        public async Task<ActionResult<IQueryable<object>>> AssignPurchase(Guid groupId, Guid userId, Guid purchaseId)
        {
            var group = _repo.GetGroupById(userId, groupId);
            var user = group.Users.SingleOrDefault(x => x.Id == userId); 
            group.Purchases.Single(x => x.Id == purchaseId).User = user;
            var o = await GetGroupData(group);
            return o;
        }
        private async Task<ActionResult<IQueryable<object>>> GetGroupData(Group group)
        {
            var users = group.Users.Select(x => new {x.Id, x.Nick});
            var purchases = group.Purchases.Select(x => new {x.Id, x.Name, x.Cost, User = x.User?.Id ?? Guid.Empty});
            var o = new ObjectResult( new
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
            return o;
        }
    }
}