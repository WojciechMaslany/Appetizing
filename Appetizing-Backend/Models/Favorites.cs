using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Appetizing_Backend.Models
{
    public class Favorites
    {
        public bool? IsLiked { get; set; }
        public string[]? AuthorId { get; set; }
        public string? UserId { get; set; }
    }
}
