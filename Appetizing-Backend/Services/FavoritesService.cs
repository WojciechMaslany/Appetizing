using Appetizing_Backend.Interfaces;
using Appetizing_Backend.Models;
using MongoDB.Driver;

namespace Appetizing_Backend.Services
{
    public class FavoritesService : IFavoritesService
    {
        private readonly IMongoCollection<Favorites> _favorites;

        public FavoritesService(IDbClient dbClient)
        {
            _favorites = dbClient.GetFavoritesCollection();
        }
        public Favorites AddFavorite(Favorites favorites)
        {
            if(favorites.IsLiked == true && favorites.UserId != null)
            {
                if(favorites.AuthorId.Contains(favorites.UserId))
                {
                    _favorites.InsertOne(favorites);
                    return favorites;
                }
            }

            
            return favorites;
        }

        public List<Favorites> GetFavorites(string recipeId, string userId)
        {
            throw new NotImplementedException();
        }
        /*
       public List<Favorites> GetFavorites(string recipeId, string userId) 
           => _favorites.Find(favorites => favorites.RecipeId == recipeId && favorites.AuthorId == userId).ToList();*/
    }
}
