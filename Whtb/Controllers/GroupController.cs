using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Whtb.Models;
using Whtb.Repositories;
using Whtb.Utils;

using Xtensive.Orm;

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
        /// <param name="groupId">groupId</param>
        /// <returns>group data</returns>
        [HttpGet("GetGroupById")]
        [Authorize]
        public async Task<ActionResult<IQueryable<object>>> Get(Guid groupId)
        {
            var userId = User.Claims.Where(x => x.Type.Equals("Id")).First().Value;
            var group = _repo.GetGroupById(Guid.Parse(userId), groupId);
            var o = await GetGroupData(group);
            return o;
        }

        /// <summary>
        /// Create purchase
        /// </summary>
        /// <param name="purchaseName">purchaseName</param>
        /// <param name="purchaseCost">purchaseCost</param>
        /// <param name="groupId">groupId</param>
        /// <returns>group</returns>
        [HttpPost("AddPurchase")]
        public async Task<ActionResult<IQueryable<object>>> AddPurchase(string purchaseName, decimal purchaseCost, Guid groupId)
        {
            var userId = Guid.Parse(User.Claims.Where(x => x.Type.Equals("Id")).First().Value);
            var group = _repo.GetGroupById(userId, groupId);
            var purchase = new Purchase(Guid.NewGuid())
            {
                Name = purchaseName,
                Cost = purchaseCost,
            };
            group.Purchases.Add(purchase);
            Session.Current.SaveChanges();
            var o = await GetGroupData(group);
            return o;
        }

        /// <summary>
        /// Добавить пользователя в группу
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        [HttpPost("AddUserToGroup")]
        [Authorize]
        public async Task<ActionResult<IQueryable<object>>> AddUser(Guid userId, Guid groupId)
        {
            var id = Guid.Parse(User.Claims.Where(x => x.Type.Equals("Id")).First().Value);
            var group = _repo.GetGroupById(id, groupId);
            _repo.AddUser(group, userId);
            return await GetGroupData(group);
        }

        /// <summary>
        /// Assign purchase
        /// </summary>
        /// <param name="groupId">groupId</param>
        /// <param name="userId">userId</param>
        /// <param name="purchaseId">purchaseId</param>
        /// <returns>group</returns>
        [HttpPost("AssignPurchase")]
        [Authorize]
        public async Task<ActionResult<IQueryable<object>>> AssignPurchase(Guid groupId, Guid userId, Guid purchaseId)
        {
            var id = Guid.Parse(User.Claims.Where(x => x.Type.Equals("Id")).First().Value);
            var group = _repo.GetGroupById(userId, groupId) ?? _repo.GetGroupById(id, groupId);
            var user = group.Users.SingleOrDefault(x => x.Id == userId); 
            group.Purchases.Single(x => x.Id == purchaseId).User = user;
            Session.Current.SaveChanges();
            return await GetGroupData(group);
        }

        /// <summary>
        /// SetGroupDate
        /// </summary>
        /// <param name="groupId">groupId</param>
        /// <param name="date">date</param>
        /// <param name="userId">userId</param>
        /// <returns>group</returns>
        [HttpPost("SetGroupDate")]
        public async Task<ActionResult<IQueryable<object>>> SetGroupDate(Guid groupId, DateTime date)
        {
            var group = _repo.GetGroupById(Guid.Empty, groupId);
            group.DateTime = date;
            return await GetGroupData(group);
        }

        /// <summary>
        /// SetGroupDate
        /// </summary>
        /// <param name="groupName">groupName</param>
        /// <param name="date">date</param>
        /// <returns>group</returns>
        [HttpPost("CreateGroup")]
        [Authorize]
        public async Task<ActionResult<IQueryable<object>>> CreateGroup(string groupName, DateTime date)
        {
            var id = Guid.Parse(User.Claims.Where(x => x.Type.Equals("Id")).First().Value);
            var group = _repo.CreateGroup(groupName, date, id);
            return await GetGroupData(group);
        }

        private async Task<ActionResult<IQueryable<object>>> GetGroupData(Group group)
        {
            var users = group.Users.Select(x => new {x.Id, x.Nick, sum = group.Purchases.Where(p => p.User == x).Sum(p => p.Cost) });
            var purchases = group.Purchases.Select(x => new { x.Id, x.Name, x.Cost, x.Completed, User = x.User != null ? (UserPoco)x.User : new UserPoco() { Id = Guid.Empty } });
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