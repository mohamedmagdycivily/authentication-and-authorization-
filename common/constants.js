export const BASE_URL = '/api/v0';
export const SALT_ROUNDS = 12;

export const MESSAGES = {
    CREATED: 'created successfully.',
    DONE_SUCCESSFULLY: 'Done successfully.',
    EMAIL_VERIFIED: 'Email verified successfully.',
}
export const errorCodes = {
  ILLEGAL_ARGUMENT_EXCEPTION: { message: 'Illegal argument exception.', code: 1003 },
  EMAIL_USED_BEFORE: { message: 'The email you provided is used before.', code: 1012 },
  USER_NOT_FOUND: {
    message: 'User not found',
    code: 1047,
  },
  INVALID_SIGNATURE: {
    message: 'Invalid signature',
    code: 1067,
  },
  USER_IS_NOT_VERFIED: {
    message: 'your account is not verified, please check your mail to activate your count',
    code: 1068,
  },
  LOGIN_FAILED: { message: 'Login Failed: invalid email or password.', code: 1045 },
  USER_NO_LONGER_EXIST: { message: 'The user belonging to this token does no longer exist.', code: 1050 },
  USER_CHANGED_PASSWORED: { message: 'User recently changed password! Please log in again.', code: 1060 },
}