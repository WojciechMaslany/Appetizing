using Appetizing_Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Appetizing_Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private RoleManager<ApplicationRole> _roleManager;
        public UserController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
        }

        [HttpPost]
        public async Task<IActionResult> Create(User user)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser appUser = new ApplicationUser
                {
                    UserName = user.Name,
                    Email = user.Email
                };

                IdentityResult result = await _userManager.CreateAsync(appUser, user.Password);
                if (result.Succeeded)
                    return Ok("User created successfully");
                else
                {
                    string errors = "";
                    foreach (IdentityError error in result.Errors)
                    {
                        errors += error.Description + " ";
                    }
                    return Ok(errors);
                }
            }
            return BadRequest("Does not match");
        }

        [HttpPost]
        public async Task<IActionResult> CreateRole(UserRole userRole)
        {
            if (ModelState.IsValid)
            {
                IdentityResult result = await _roleManager.CreateAsync(new ApplicationRole() { Name = userRole.RoleName});
                if (result.Succeeded)
                    return Ok("Role created successfully.");
                else
                {
                    string errors = "";
                    foreach (IdentityError error in result.Errors)
                    {
                        errors += error.Description + " ";
                    }
                    return Ok(errors);
                }
            }
            return BadRequest("Nothing happened.");
        }
    }
}
