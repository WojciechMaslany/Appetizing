using Appetizing_Backend.Models;

namespace Appetizing_Backend.Interfaces
{
    public interface ICommentService
    {
        List<Comment> GetRecipeComments(string id);
        Comment PostComment(Comment comment);
    }
}
