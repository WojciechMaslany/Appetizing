import axios from 'axios';
import authHeader from './auth-header';
import { variables } from "../Variables"
const API_URL = variables.API_URL;
class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
}
export default new UserService();