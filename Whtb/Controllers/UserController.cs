﻿using System;
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
    }
}