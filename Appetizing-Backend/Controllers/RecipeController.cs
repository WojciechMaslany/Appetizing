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
                ImageSrc = String.Format("{0}://{1}{2}/Images/Recipes/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName),
                CuisineType = x.CuisineType,
                MealType = x.MealType,
                AuthorId = x.AuthorId,
                Instructions = x.Instructions
            }));
        }

        [HttpGet("{id}", Name = "GetRecipe")]
        public IActionResult GetRecipe(string id)
        {
            var recipeRetrieved = _recipeService.GetRecipe(id);
            var recipeToSend = new Recipe()
            {
                Id = recipeRetrieved.Id,
                Name = recipeRetrieved.Name,
                Description = recipeRetrieved.Description,
                ImageName = recipeRetrieved.ImageName,
                ImageSrc = String.Format("{0}://{1}{2}/Images/Recipes/{3}", Request.Scheme, Request.Host, Request.PathBase, recipeRetrieved.ImageName),
                CuisineType = recipeRetrieved.CuisineType,
                MealType = recipeRetrieved.MealType,
                AuthorId = recipeRetrieved.AuthorId,
                Instructions = recipeRetrieved.Instructions
            };
            return Ok(recipeToSend);
        }

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
           
           recipe.ImageName = await SaveImage(recipe.ImageFile);
           var xd = _recipeService.GetRecipe(recipe.Id);
           DeleteImage(xd.ImageName);
           return Ok(_recipeService.UpdateRecipe(recipe));
        }

        [HttpGet]
        public IActionResult SortByCuisine(string cuisine)
        {
            return Ok(_recipeService.SortByCuisine(cuisine).Select(x => new Recipe()
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                ImageName = x.ImageName,
                ImageSrc = String.Format("{0}://{1}{2}/Images/Recipes/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName),
                CuisineType = x.CuisineType,
                MealType = x.MealType,
                AuthorId = x.AuthorId,
                Instructions = x.Instructions
            }));
        }

        [HttpGet]
        public IActionResult SortByMealType(string mealType)
        {
            return Ok(_recipeService.SortByMealType(mealType).Select(x => new Recipe()
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                ImageName = x.ImageName,
                ImageSrc = String.Format("{0}://{1}{2}/Images/Recipes/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName),
                CuisineType = x.CuisineType,
                MealType = x.MealType,
                AuthorId = x.AuthorId,
                Instructions = x.Instructions
            }));
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images/Recipes", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images/Recipes", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}
