exports.PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;
exports.EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
exports.MONGO_QUERY_REGEX = /\b(gte|gt|lte|lt)\b/g;
exports.POS_WHOLE_NUM_REGEX = /^(0|[1-9]\d*)$/;
