const OtherService = require("../services/otherSerives");

exports.getUserList = (req, res) => {
  OtherService.getUserList(req, res)
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
exports.deleteUser = (req, res) => {
  OtherService.deleteUser(req, res)
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

exports.updateUser = (req, res) => {
    OtherService.updateUser(req, res)
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