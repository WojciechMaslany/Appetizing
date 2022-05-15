using Appetizing_Backend.Interfaces;
using Appetizing_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Appetizing_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeController : Controller
    {
        // dependency injection
        private readonly IRecipeService _recipeService;
        public RecipeController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
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

        [HttpPost]
        public IActionResult AddRecipe(Recipe recipe)
        {
            _recipeService.AddRecipe(recipe);
            return CreatedAtRoute("GetRecipe", new { id = recipe.Id }, recipe);
        }
    }
}
