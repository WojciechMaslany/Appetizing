using MongoDB.Bson.Serialization.Attributes;

namespace Appetizing_Backend.Models
{
    public class Recipe
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;

        public string? ImageName { set; get; }

        [BsonIgnore]
        public IFormFile? ImageFile { get; set; }

        [BsonIgnore]
        public string? ImageSrc { get; set; }
        public string? CuisineType { get; set; }
        public string? MealType { get; set; }
        public string? AuthorId { get; set; }
        public string? Instructions { get; set; }
        public string[]? Ingredients { get; set; }
    }
}
