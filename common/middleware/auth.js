import { UNAUTHORIZED, FORBIDDEN } from 'http-status';
import usersRoles from '../../server/users/roles';
import UserController from '../../server/users/controllers/userController'
const jwt = require("jsonwebtoken");
const roles = {
  ...usersRoles,
};

export default function AuthAPI(endPointName) {
  return async function (req, res, next) {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
      return res.status(UNAUTHORIZED).json({
        message: 'Invalid authorization token or API key.',
      });
    }

    let endPointRoles = roles[endPointName];

    if (!endPointRoles) {
      return res.status(UNAUTHORIZED).json({
        message: 'No Roles for this endpoint',
      });
    }

    // 1) Getting token and check of it's there
    const token = req.headers.authorization.split(" ")[1];

    // 2) Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 3) Check if user still exists
    const currentUser = await UserController.getUserByEmail(decoded.email.address);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    // 4) Check if user changed password after the token was issued
    const changedTimestamp = parseInt(
      currentUser.lastSessionResetDate.getTime() / 1000
    );
    if (decoded.iat < changedTimestamp) {
      return next(
        new AppError("User recently changed password! Please log in again.", 401)
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    console.log(endPointRoles);
    console.log(currentUser.roles);

    const isAuthorized = currentUser.roles.some((r) => endPointRoles.indexOf(r) > -1);
    if (isAuthorized) {
      req.user = { ...currentUser };
      return next();
    }
    res.status(FORBIDDEN).json({
      message: 'user is not authorized to perform this action',
    });
  };
}
