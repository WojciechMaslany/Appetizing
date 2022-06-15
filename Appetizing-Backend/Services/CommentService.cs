using Appetizing_Backend.Interfaces;
using Appetizing_Backend.Models;
using MongoDB.Driver;

namespace Appetizing_Backend.Services
{
    public class CommentService : ICommentService
    {
        private readonly IMongoCollection<Comment> _comments;

        public CommentService(IDbClient dbClient)
        {
            _comments = dbClient.GetCommentsCollection();
        }
        public List<Comment> GetRecipeComments(string id) => _comments.Find(comment => comment.RecipeId == id).ToList();

        public Comment PostComment(Comment comment)
        {
            _comments.InsertOne(comment);
            return comment;
        }
    }
}
