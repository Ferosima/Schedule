import UserModel from "../models/user.model";

class UserController {
  /**
   * Get user by id
   *
   * @param {*} req
   * @param {*} res
   * @memberof UserController
   */
  getUserByID = (req: any, res: any) => {
    UserModel.getUserByID(req, (err: any, list: any) => {
      if (err) res.send(err);
      res.send(list);
    });
  };

  /**
   * Create new user
   *
   * @param {*} req
   * @param {*} res
   * @memberof UserController
   */
  createUser = (req: any, res: any) => {
    UserModel.createUser(req, (err: any, data: any) => {
      if (err) res.status(err).send(data);
      res.send(data);
    });
  };

  loginUser = (req: any, res: any) => {
    UserModel.loginUser(req, (err: any, data: any) => {
      if (err) res.status(err).send(data);
      res.send(data);
    });
  };
}

const userController = new UserController();
export default userController;
