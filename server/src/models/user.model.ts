import bcrypt from "bcrypt";
import db_connect from "../../db/config";
import { validation } from "../middleware/validation";
import {
  USER_CREATE_VALIDATION,
  USER_LOGIN_VALIDATION
} from "../validation/user.validation";

class UserModel {
  /**
   * Get user by id
   *
   * @static
   * @param {*} req
   * @param {*} result
   * @memberof UserModel
   */
  static getUserByID = (req: any, result: any) => {
    db_connect.query(
      `SELECT * FROM users WHERE id = ${req.params.id}`,
      (err, res) => {
        if (err) {
          console.log("ERROR getUserByIDList", { err });
          result(400, err);
        } else {
          console.log("SUCCESS getUserByIDList", res);
          result(null, res);
        }
      }
    );
  };

  /**
   * Create a new user
   *
   * @static
   * @param {*} req
   * @param {*} result
   * @memberof UserModel
   */
  static createUser = async (req: any, result: any) => {
    // Validation body data
    const error_validation = validation(req.body, USER_CREATE_VALIDATION);
    // If data not valid send errors
    if (Object.keys(error_validation)?.length !== 0) {
      result(400, { success: false, message: error_validation });
    }
    // If data is valid query to DB
    else {
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      console.log(req.body.password);
      req.body.password = await bcrypt.hash(req.body.password, salt);

      db_connect.query(`INSERT INTO users SET ?`, req.body, (err, res) => {
        // If DB error send error
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            result(400, {
              success: false,
              error: { email: "User with this email already exist" },
            });
          }
          result(400, { success: false, error: err });
        } // Send success data
        else {
          result(null, res);
        }
      });
    }
  };

  static loginUser = async (req: any, result: any) => {
    // Validation body data
    const error_validation = validation(req.body, USER_LOGIN_VALIDATION);
    // If data not valid send errors
    if (Object.keys(error_validation)?.length !== 0) {
      result(400, { success: false, message: error_validation });
    }
    db_connect.query(
      `SELECT * FROM users WHERE email = ?`,
      req.body.email,
      async (err, res: any) => {
        // If db send error or user not found
        if (err || !res?.length) {
          result(400, {
            success: false,
            error: "Email or password is incorrect",
          });
        } // Send success data
        else {
          const user = res[0];
          // Check password
          const validPassword = await bcrypt.compare(req.body.password, user);
          if (validPassword) {
            // Remove password
            user.password = undefined;
            result(null, user);
          }
          result(400, {
            success: false,
            error: "Email or password is incorrect",
          });
        }
      }
    );
  };
}

export default UserModel;
