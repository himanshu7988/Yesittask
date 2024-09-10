const User = require("../models/user");

exports.register = (req, res) => {
  return new Promise(async function (resolve, reject) {
    try {
      const body = req.body;

      if (!body.userName) {
        return reject({
          statusCode: CONFIG.STATUS_CODE_BAD_REQUEST,
          message: CONFIG.ERROR_MISSING_USER_NAME,
        });
      }
      if (!body.email) {
        return reject({
          statusCode: CONFIG.STATUS_CODE_BAD_REQUEST,
          message: CONFIG.ERROR_MISSING_EMAIL,
        });
      }
      if (!body.password) {
        return reject({
          statusCode: CONFIG.STATUS_CODE_BAD_REQUEST,
          message: CONFIG.ERROR_MISSING_PASSWORD,
        });
      }

      var user = await User.findOne({
          email: body.email,
        });

      if (user) {
        return reject({
          statusCode: CONFIG.STATUS_CODE_BAD_REQUEST,
          message: "user already registered",
        });
      }

      user = new User({
        userName: body.userName,
        email: body.email,
        password: body.password,
      });

      await user.save();

      return resolve("user registered successfully");
    } catch (error) {
      return reject({
        statusCode: CONFIG.STATUS_CODE_INTERNAL_SERVER,
        message: error,
      });
    }
  });
};