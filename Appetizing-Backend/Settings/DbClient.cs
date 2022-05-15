using Appetizing_Backend.Interfaces;
using Appetizing_Backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Appetizing_Backend.Settings
{
    public class DbClient : IDbClient
    {
        private readonly IMongoCollection<Recipe> _recipes;
        public DbClient(IOptions<MongoDbConfig> mongoDbConfig)
        {
            MongoClient client = new MongoClient(mongoDbConfig.Value.ConnectionString);
            IMongoDatabase database = client.GetDatabase(mongoDbConfig.Value.Name);

            _recipes = database.GetCollection<Recipe>("Recipes");
        }

        public IMongoCollection<Recipe> GetRecipesCollection() => _recipes;
    }
}
