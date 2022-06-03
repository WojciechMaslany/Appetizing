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
            return Ok(_recipeService.GetRecipes());
        }

        [HttpGet("{id}", Name = "GetRecipe")]
        public IActionResult GetRecipe(string id)
        {
            return Ok(_recipeService.GetRecipe(id));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteRecipe(string id)
        {
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
        public IActionResult UpdateRecipe(Recipe recipe)
        {
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
    }
}
