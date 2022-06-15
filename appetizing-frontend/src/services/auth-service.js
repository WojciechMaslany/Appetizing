import axios from "axios";
import { variables } from "../Variables"

const API_URL = variables.API_URL;

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "User/authenticate", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(
    username,
    email,
    password,
    imageName,
    imageFile) {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('imageName', imageName);
      formData.append('imageFile', imageFile);
    return axios.post(API_URL + "User", formData);
  }
}

export default new AuthService();