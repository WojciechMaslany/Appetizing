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

        [HttpDelete("{id}")]
        public IActionResult DeleteRecipe(string id)
        {
            _recipeService.DeleteRecipe(id);
            return NoContent();
        }

        [HttpPost]
        public IActionResult AddRecipe(Recipe recipe)
        {
            _recipeService.AddRecipe(recipe);
            return CreatedAtRoute("GetRecipe", new { id = recipe.Id }, recipe);
        }

        [HttpPut]
        public IActionResult UpdateRecipe(Recipe recipe)
        {
            return Ok(_recipeService.UpdateRecipe(recipe));
        }
    }
}
