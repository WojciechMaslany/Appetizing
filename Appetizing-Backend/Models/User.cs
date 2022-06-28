using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Appetizing_Backend.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Email")]
        public string? Email { get; set; }

        [BsonElement("Username")]
        public string Username { get; set; }

        [BsonElement("Password")]
        public string Password { get; set; }
        [BsonElement("Role")]
        public string Role { get; set; } = "User";

        public string? accessToken { get; set; }
        public string? ImageName { set; get; }

        [BsonIgnore]
        public IFormFile? ImageFile { get; set; }

        [BsonIgnore]
        public string? ImageSrc { get; set; }

        public int? UserRecipesCount { get; set; }
        public string? UserFavoriteCuisine { get; set; }
    }
}
