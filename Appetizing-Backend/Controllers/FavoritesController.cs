using Appetizing_Backend.Interfaces;
using Appetizing_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Appetizing_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : Controller
    {
        private readonly IFavoritesService _favoritesService;

        public FavoritesController(IFavoritesService favoritesService)
        {
            _favoritesService = favoritesService;
        }

        [HttpGet]
        public ActionResult<List<Favorites>> GetFavorites(string recipeId, string userId)
        {
            return _favoritesService.GetFavorites(recipeId, userId);
        }

        [HttpPost]
        public ActionResult AddFavorite(Favorites favorites)
        {
            _favoritesService.AddFavorite(favorites);
            return Json(favorites);
        }
    }
}
