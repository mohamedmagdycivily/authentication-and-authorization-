export const BASE_URL = '/api/v0';
export const SALT_ROUNDS = 12;

export const MESSAGES = {
    CREATED: 'created successfully.',
    DONE_SUCCESSFULLY: 'Done successfully.',
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
}