using Appetizing_Backend.Models;
using MongoDB.Driver;

namespace Appetizing_Backend.Interfaces
{
    public interface IDbClient
    {
        IMongoCollection<Recipe> GetRecipesCollection();
    }
}
