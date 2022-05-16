﻿using Appetizing_Backend.Interfaces;
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
    }
}