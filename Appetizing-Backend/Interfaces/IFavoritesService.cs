using Appetizing_Backend.Models;

namespace Appetizing_Backend.Interfaces
{
    public interface IFavoritesService
    {
        List<Favorites> GetFavorites(string recipeId, string userId);
        Favorites AddFavorite(Favorites favorites);
    }
}
