import UserService from '../services/userService';

class UserController {
  static async getUserByEmail(email) {
    return UserService.getUserByEmail(email);
  }
}

export default UserController;
