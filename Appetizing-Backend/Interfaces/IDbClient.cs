using Appetizing_Backend.Models;
using MongoDB.Driver;

namespace Appetizing_Backend.Interfaces
{
    public interface IDbClient
    {
        IMongoCollection<Recipe> GetRecipesCollection();
        IMongoCollection<User> GetUsersCollection();
        IMongoCollection<Comment> GetCommentsCollection();
        IMongoCollection<Favorites> GetFavoritesCollection();
    }
}
