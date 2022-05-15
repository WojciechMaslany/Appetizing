using Appetizing_Backend.Models;

namespace Appetizing_Backend.Interfaces
{
    public interface IRecipeService
    {
        List<Recipe> GetRecipes();
        Recipe AddRecipe(Recipe recipe);
        Recipe GetRecipe(string id);
    }
}
