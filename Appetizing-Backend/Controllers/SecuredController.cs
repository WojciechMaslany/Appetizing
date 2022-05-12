using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Appetizing_Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SecuredController : Controller
    {
        [Authorize(Roles ="Admin")]

        [HttpGet]
        public async Task<IActionResult> CanSeeThis()
        {
            return Ok("You would see that.");
        }

        // More or less its done. Get to recipes next.
    }
}
