using Appetizing_Backend.Interfaces;
using Appetizing_Backend.Models;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Appetizing_Backend.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _users;
        private readonly string key;

        public UserService(IDbClient dbClient, IConfiguration configuration)
        {
            _users = dbClient.GetUsersCollection();
            key = configuration.GetSection("JwtKey").ToString();
        }

        public List<User> GetUsers() => _users.Find(user => true).ToList();

        public User GetUser(string id) => _users.Find<User>(user => user.Id == id).FirstOrDefault();

        public User GetUserByEmail(string email) => _users.Find<User>(user => user.Email == email).FirstOrDefault();
        public User GetUserByUsername(string username) => _users.Find<User>(user => user.Username == username).FirstOrDefault();

        public User Create(User user)
        {
            _users.InsertOne(user);

            return user;
        }

        public string Authenticate(string username, string password)
        {
            var user = _users.Find(x => x.Username == username && x.Password == password).FirstOrDefault();

            if (user == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username)
                }),

                Expires = DateTime.UtcNow.AddHours(1),

                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature
                    )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
