import bcrypt from 'bcrypt';
import { validation } from '../services/validation.service';
import db_connect from '../../db/config';
import { USER_CREATE_VALIDATION, USER_LOGIN_VALIDATION } from '../validation/user.validation';
import { TUser } from 'src/types/models';

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
    db_connect('users')
      .select()
      .where('id', req.params.id)
      .then(data => {
        result(null, data);
      })
      .catch(error => {
        result(400, error);
      });
  };

  static getUserByEmail = (email): TUser | undefined => {
    db_connect('users')
      .select()
      .where('email', email)
      .then(data => {
        return data;
      })
      .catch(error => {
        throw new Error(error);
      });
    return;
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
      req.body.password = await bcrypt.hash(req.body.password, salt);

      db_connect('users')
        .insert(req.body)
        .then(data => {
          result(null, data);
        })
        .catch(error => {
          if (error.code === 'ER_DUP_ENTRY') {
            result(400, {
              success: false,
              error: { email: 'User with this email already exist' },
            });
          }
          result(400, { success: false, error: error });
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

    db_connect('users')
      .select()
      .where('email', req.body.email)
      .then(async data => {
        const user = data[0];
        // Check password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
          // Remove password
          user.password = undefined;
          result(null, user);
        }
        result(400, {
          success: false,
          error: 'Email or password is incorrect',
        });
      })
      .catch(error => {
        result(400, {
          success: false,
          error: 'Email or password is incorrect',
        });
      });
  };

  changePassword = async (req: any, result: any) => {
    let token = req.body.token;
    let password = req.body.password;

    let isValidToken = await token.validate(token);

    if (isValidToken.status) {
      const salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(password, salt);
      await db_connect('users').update({ password: hash }).where({ id:isValidToken.token.user_id }).table('users');
      await token.setUsed(isValidToken.token.token);
      result.status(200);
      result.send('Password changed!');
    } else {
      result.status(406);
      result.send('Invalid Token');
    }

 
  };
}

export default UserModel;
