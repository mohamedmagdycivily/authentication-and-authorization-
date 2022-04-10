import UserService from '../services/userService';

class UserController {
  static async getUserByEmail(email) {
    return UserService.getUserByEmail(email);
  }
  static async getUserById(id) {
    return UserService.getUserById(id);
  }
}

export default UserController;
