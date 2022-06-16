﻿using Appetizing_Backend.Models;

namespace Appetizing_Backend.Interfaces
{
    public interface IUserService
    {
        List<User> GetUsers();
        User Create(User user);
        User GetUser(string id);
        User GetUserByEmail(string email);
        User GetUserByUsername(string username);
        string Authenticate(string email, string password);
    }
}