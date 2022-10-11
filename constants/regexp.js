exports.PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;
exports.EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
exports.POS_WHOLE_NUM_REGEX = /^(0|[1-9]\d*)$/;
exports.NAME_REGEX = /^[\w\u0400-\u04ff-,'\s]+$/;
