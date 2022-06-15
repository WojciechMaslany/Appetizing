using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Appetizing_Backend.Models
{
    public class Comment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string RecipeId { get; set; }
        public string AuthorId { get; set; }
        public string CommentBody { get; set; }
        public DateTime? Date { get; set; }
    }
}
