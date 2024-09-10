const User = require("../models/user");

exports.getUserList = (req, res) => {
  return new Promise(async function (resolve, reject) {
    try {
      const { page, pageSize, keyword } = req.query;

      if (isNaN(page) || page < 1 || isNaN(pageSize) || pageSize < 1) {
        return reject({
          message: "Invalid page or pageSize",
          statusCode: CONFIG.ERROR_CODE,
        });
      }

      const query = {
        $or: [
          { userName: new RegExp(keyword, "i") },
          { email: new RegExp(keyword, "i") },
        ],
      };

      const users = await User.find(query)
        .select("-password")
        .skip((page - 1) * pageSize)
        .limit(parseInt(pageSize));

      const totalUsers = await User.countDocuments(query);

      return resolve({
        users,
        pagination: {
          totalRecords: totalUsers,
          page: parseInt(page),
          pageSize: parseInt(pageSize),
        },
      });
    } catch (error) {
      return reject({
        statusCode: CONFIG.STATUS_CODE_INTERNAL_SERVER,
        message: error,
      });
    }
  });
};
exports.deleteUser = (req, res) => {
  return new Promise(async function (resolve, reject) {
    try {
      const { id } = req.query;

      if (!id) {
        return reject({
          message: "User ID is required",
          statusCode: CONFIG.ERROR_CODE,
        });
      }

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return reject({
          message: "User not found",
          statusCode: CONFIG.ERROR_CODE,
        });
      }

      return resolve("User deleted successfully");
    } catch (error) {
      return reject({
        statusCode: CONFIG.STATUS_CODE_INTERNAL_SERVER,
        message: error,
      });
    }
  });
};
exports.updateUser = (req, res) => {
  return new Promise(async function (resolve, reject) {
    try {
      const { id, ...updateData } = req.body;

      if (!id) {
        return reject({
          success: false,
          message: "User ID is required",
        });
      }

      const user = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return reject({
          success: false,
          message: "User not found",
        });
      }

      user.password = undefined;

      return resolve("updated successfully");
    } catch (error) {
      return reject({
        statusCode: CONFIG.STATUS_CODE_INTERNAL_SERVER,
        message: error,
      });
    }
  });
};
