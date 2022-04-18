using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Whtb.Models;
using Whtb.Repositories;
using Whtb.Utils;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;

namespace Whtb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private static IUserRepo? _repo;
        
        public AuthController()
        {
            _repo ??= IoC.GetInstance<IUserRepo>();
        }
        
        [HttpPost("Login")]
        public IActionResult LoginController(string username, string password)
        {
            return Login(username, password);
        }

        [HttpPost("Register")]
        public IActionResult Register(string username, string nick, string password)
        {
            if (!_repo.RegisterUser(username,nick,password))
            {
                return BadRequest();
            }
            return Login(username, password);
        }

        private IActionResult Login(string username, string password)
        {
            var identity = GetIdentity(username, password);
            if (identity == null)
            {
                return BadRequest();
            }

            var encodedJwt = GetTocken(identity);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name,
                id = identity.Claims.Where(x => x.Type == "Id").Single().Value
            };

            return Ok(response);
        }

        private string GetTocken(ClaimsIdentity identity)
        {
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }

        private ClaimsIdentity? GetIdentity(string username, string password)
        {
            var usr = _repo.GetUserByLoginAndPassword(username, password);
            if (usr != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, usr.Nick),
                    new Claim("Id", usr.Id.ToString())
                };
                ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                        ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }
 
            // если пользователя не найдено
            return null;
        }
    }
}