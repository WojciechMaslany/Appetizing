using Appetizing_Backend.Interfaces;
using Appetizing_Backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Appetizing_Backend.Settings
{
    public class DbClient : IDbClient
    {
        private readonly IMongoCollection<Recipe> _recipes;
        private readonly IMongoCollection<User> _users;
        private readonly IMongoCollection<Comment> _comments;
        private readonly IMongoCollection<Favorites> _favorites;
        public DbClient(IOptions<MongoDbConfig> mongoDbConfig)
        {
            MongoClient client = new MongoClient(mongoDbConfig.Value.ConnectionString);
            IMongoDatabase database = client.GetDatabase(mongoDbConfig.Value.Name);

            _recipes = database.GetCollection<Recipe>("Recipes");
            _users = database.GetCollection<User>("Users");
            _comments = database.GetCollection<Comment>("Comment");
            _favorites = database.GetCollection<Favorites>("Favorites");
        }

        public IMongoCollection<Recipe> GetRecipesCollection() => _recipes;
        public IMongoCollection<User> GetUsersCollection() => _users;
        public IMongoCollection<Comment> GetCommentsCollection() => _comments;
        public IMongoCollection<Favorites> GetFavoritesCollection() => _favorites;
    }
}
