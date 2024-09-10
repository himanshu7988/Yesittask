const AuthenticationService = require("../services/auth_service");

exports.register = (req, res) => {
  AuthenticationService.register(req, res)
    .then((result) => {
      return ReS(res, { data: result }, CONFIG.STATUS_CODE_OK);
    })
    .catch((error) => {
      return ReE(
        res,
        { message: error.message ? error.message : error },
        error.statusCode ? error.statusCode : CONFIG.ERROR_CODE
      );
    });
};