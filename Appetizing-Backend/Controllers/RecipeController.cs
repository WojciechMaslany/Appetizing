using Appetizing_Backend.Interfaces;
using Appetizing_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Appetizing_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class RecipeController : Controller
    {
        // dependency injection
        private readonly IRecipeService _recipeService;
        private readonly IWebHostEnvironment _hostEnvironment;
        public RecipeController(IRecipeService recipeService, IWebHostEnvironment hostEnvironment)
        {
            _recipeService = recipeService;
            this._hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public IActionResult GetRecipes()
        {
            return Ok(_recipeService.GetRecipes().Select(x => new Recipe()
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                ImageName = x.ImageName,
                ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName)
            }));
        }

        [HttpGet("{id}", Name = "GetRecipe")]
        public IActionResult GetRecipe(string id) => Ok(_recipeService.GetRecipe(id));

        [HttpDelete("{id}/{imageName}")]
        public IActionResult DeleteRecipe(string id, string imageName)
        {
            DeleteImage(imageName);
            _recipeService.DeleteRecipe(id);
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> AddRecipe([FromForm]Recipe recipe)
        {
            recipe.ImageName = await SaveImage(recipe.ImageFile);
            _recipeService.AddRecipe(recipe);
            return CreatedAtRoute("GetRecipe", new { id = recipe.Id }, recipe);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateRecipe([FromForm] Recipe recipe)
        {
            if (recipe.ImageFile != null)
            {
                DeleteImage(recipe.ImageName);
                recipe.ImageName = await SaveImage(recipe.ImageFile);
            }
            return Ok(_recipeService.UpdateRecipe(recipe));
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}
