using Appetizing_Backend.Interfaces;
using Appetizing_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Appetizing_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : Controller
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        public ActionResult<List<Comment>> GetRecipeComments(string id)
        {
            return _commentService.GetRecipeComments(id);
        }

        [HttpPost]
        public ActionResult PostComment(Comment comment)
        {
            _commentService.PostComment(comment);
            return Json(comment);
        }
    }
}
