using Appetizing_Backend.Interfaces;
using Appetizing_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Appetizing_Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {        
        private readonly IUserService _userService;
        public UserController(/*IConfiguration configuration, */IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<User>> GetUsers()
        {
            return _userService.GetUsers();
        }

        [HttpGet("{id:length(24)}")]
        public ActionResult<User> GetUser (string id)
        {
            var user = _userService.GetUser(id);
            return Json(user);
        }

        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            _userService.Create(user);
            return Json(user);
        }

        [AllowAnonymous]
        [Route("authenticate")]
        [HttpPost]
        public ActionResult Login([FromBody] User user)
        {
            var token = _userService.Authenticate(user.Email, user.Password);

            if (token == null)
                return Unauthorized();
            return Ok(new { token, user });
        }
    }
}
