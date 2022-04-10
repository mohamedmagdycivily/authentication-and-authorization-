import UserService from '../services/userService';

class UserController {
  static async getUser(selector) {
    return UserService.getUser(selector);
  }
}

export default UserController;
