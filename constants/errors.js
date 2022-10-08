module.exports = {
  ACCESS_DENIED: { code: 403, msg: 'Access denied..' },
  CONFLICT: { code: 409, msg: 'Conflict occured..' },

  FAILED_AUTH: { code: 401, msg: 'Please, provide valid email and password..' },

  FAILED_USER_EMAIL: { code: 400, msg: 'User must have a valid email..' },
  FAILED_USER_EXISTS: { code: 409, msg: 'This email already exists..' },
  FAILED_USER_NAME: { code: 400, msg: 'User must have a valid name..' },
  FAILED_USER_PASSWD: {
    code: 400,
    msg: 'User must have a password min 8 characters long, contains capital letters, numbers and special characters..'
  },

  FILE_TOO_LARGE: { code: 500, msg: 'File too large, try another one..' },
  INTERNAL: { code: 500, msg: 'Something went wrong. Try again later..' },

  INVALID_CURR_PASSWD: { code: 400, msg: 'Current password invalid..' },
  INVALID_DATA: { code: 400, msg: 'Invalid data..' },
  INVALID_EMAIL: { code: 400, msg: 'Please, provide valid email..' },
  INVALID_FORMAT: { code: 400, msg: 'Invalid data format..' },
  INVALID_TOKEN: { code: 401, msg: 'Token is invalid or has expired..' },

  NO_LOGIN: { code: 401, msg: 'Please log in to get access..' },
  NO_USER: { code: 404, msg: 'User not found..' },
  NOT_FOUND: { code: 404, msg: 'Document not found..' }
};
