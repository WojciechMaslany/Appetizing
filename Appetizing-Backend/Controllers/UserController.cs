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
        private readonly IWebHostEnvironment _hostEnvironment;
        public UserController(IUserService userService, IWebHostEnvironment hostEnvironment)
        {
            _userService = userService;
            this._hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public ActionResult<List<User>> GetUsers()
        {
            return _userService.GetUsers();
        }

        [AllowAnonymous]
        [HttpGet("{id:length(24)}")]
        public ActionResult<User> GetUser (string id)
        {
            var user = _userService.GetUser(id);
            var userToSend = new User()
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                Password = user.Password,
                ImageSrc = String.Format("{0}://{1}{2}/Images/Users/{3}", Request.Scheme, Request.Host, Request.PathBase, user.ImageName),
                UserRecipesCount = user.UserRecipesCount,
                UserFavoriteCuisine = user.UserFavoriteCuisine
            };
            return Json(userToSend);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create([FromForm]User user)
        {
            user.ImageName = await SaveImage(user.ImageFile);
            _userService.Create(user);
            return Json(user);
        }

        [AllowAnonymous]
        [Route("GetTopUsers")]
        [HttpGet]
        public ActionResult<List<User>> GetTopUsers()
        {
            return Ok(_userService.GetTopUsers().Select(x => new User()
            {
                Id = x.Id,
                Email = x.Email,
                Username = x.Username,
                Password = x.Password,
                ImageSrc = String.Format("{0}://{1}{2}/Images/Users/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName),
                UserRecipesCount = x.UserRecipesCount,
                UserFavoriteCuisine = x.UserFavoriteCuisine
            }));
        }

        [AllowAnonymous]
        [Route("authenticate")]
        [HttpPost]
        public ActionResult Login([FromBody] User user)
        {
            var token = _userService.Authenticate(user.Username, user.Password);
            user = _userService.GetUserByUsername(user.Username);

            if (token == null)
                return Unauthorized();
            user.accessToken = token;
            var userToSend = new User()
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                Password = user.Password,
                accessToken = token,
                ImageSrc = String.Format("{0}://{1}{2}/Images/Users/{3}", Request.Scheme, Request.Host, Request.PathBase, user.ImageName)
            };
            return Ok(userToSend);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images/Users", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images/Users", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}
