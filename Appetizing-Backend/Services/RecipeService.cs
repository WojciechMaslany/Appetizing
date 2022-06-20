using Appetizing_Backend.Interfaces;
using Appetizing_Backend.Models;
using MongoDB.Driver;

namespace Appetizing_Backend.Services
{
    public class RecipeService : IRecipeService
    {
        private readonly IMongoCollection<Recipe> _recipes;
        public RecipeService(IDbClient dbClient)
        {
            _recipes = dbClient.GetRecipesCollection();
        }

        public Recipe AddRecipe(Recipe recipe)
        {
            _recipes.InsertOne(recipe);
            return recipe;
        }

        public void DeleteRecipe(string id) => _recipes.DeleteOne(recipe => recipe.Id == id);

        public Recipe GetRecipe(string id) => _recipes.Find(recipe => recipe.Id == id).First();
           

        public List<Recipe> GetRecipes() => _recipes.Find(recipe => true).ToList();

        public Recipe UpdateRecipe(Recipe recipe)
        {
            GetRecipe(recipe.Id);
            _recipes.ReplaceOne(r => r.Id == recipe.Id, recipe);
            return recipe;
        }

        public List<Recipe> SortByCuisine(string cuisine) => _recipes.Find(recipe => recipe.CuisineType == cuisine).ToList();
        public List<Recipe> SortByMealType(string mealType) => _recipes.Find(recipe => recipe.MealType == mealType).ToList();

        public string AddFavorite(Recipe recipe)
        {
            if (recipe.Likes.IsLiked == true && recipe.Likes.UserId != null)
            {
                if (recipe.Likes.AuthorId.Contains(recipe.Likes.UserId))
                {  
                    return "Already liked";
                } 
                else
                {
                    recipe.Likes.AuthorId = recipe.Likes.AuthorId.Append(recipe.Likes.UserId).ToArray();
                    _recipes.ReplaceOne(r => r.Id == recipe.Id, recipe);
                    return "Recipe Liked";
                }
            } 
            else if (recipe.Likes.IsLiked == false && recipe.Likes.UserId != null)
            {
                if (recipe.Likes.AuthorId.Contains(recipe.Likes.UserId))
                {
                    string idToRemove = recipe.Likes.UserId;
                    recipe.Likes.AuthorId = recipe.Likes.AuthorId.Where(val => val != idToRemove).ToArray();
                    _recipes.ReplaceOne(r => r.Id == recipe.Id, recipe);
                    return "Recipe unliked";
                } else
                {
                    return "Recipe was not liked anyway";
                }
            }
            return "";
        }
    }
}
