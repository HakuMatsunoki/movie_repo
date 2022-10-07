module.exports = {
  ACCESS_DENIED: { code: 403, msg: 'Access denied..' },
  CONFLICT: { code: 409, msg: 'Conflict occured..' },

  FAILED_AUTH: { code: 401, msg: 'Please, provide valid email and password..' },

  FAILED_COURSE_ACTIVE: { code: 400, msg: 'Course must have an activity status..' },
  FAILED_COURSE_COVER: { code: 400, msg: 'Course must have a cover..' },
  FAILED_COURSE_DESC: { code: 400, msg: 'Course must have a max 500 characters long description..' },
  FAILED_COURSE_DIFFICULTY: { code: 400, msg: 'Course must have a one of the "easy", "medium", "hard" difficulty..' },
  FAILED_COURSE_DURATION: { code: 400, msg: 'Course must have a valid duration number..' },
  FAILED_COURSE_EXISTS: { code: 409, msg: 'Course with this name already exists..' },
  FAILED_COURSE_NAME: { code: 400, msg: 'Course must have a valid name min 10, max 40 characters long..' },
  FAILED_COURSE_PRICE: { code: 400, msg: 'Course must have a valid price..' },

  FAILED_LESSON_DESC: { code: 400, msg: 'Lesson description must be a max 500 characters long string..' },
  FAILED_LESSON_LINK: { code: 400, msg: 'Lesson must have a valid hosting link..' },
  FAILED_LESSON_NAME: { code: 400, msg: 'Lesson must have a valid name min 10, max 40 characters long..' },

  FAILED_USER_EMAIL: { code: 400, msg: 'User must have a valid email..' },
  FAILED_USER_EXISTS: { code: 409, msg: 'This email already exists..' },
  FAILED_USER_HAS_COURSE: { code: 409, msg: 'You already owned this course..' },
  FAILED_USER_NAME: { code: 400, msg: 'User must have a valid name..' },
  FAILED_USER_PASSWD: {
    code: 400,
    msg: 'User must have a password min 8 characters long, contains capital letters, numbers and special characters..'
  },
  FAILED_USER_PASSWD_DIFF: { code: 400, msg: 'Passwords do not match..' },

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
