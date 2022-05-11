using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace Appetizing_Backend.Models
{
    [CollectionName("Users")]
    public class ApplicationRole : MongoIdentityRole<Guid>
    {
    }
}
