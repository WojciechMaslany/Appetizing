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
/*        public string Difficulty { get; set; }
        public int Servings { get; set; }
        public string CusineType { get; set; }
        public string Instructions { get; set; }
        public string MealType { get; set; }
        public string Author { get; set; }*/
    }
}
