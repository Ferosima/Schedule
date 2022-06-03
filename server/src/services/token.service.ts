import db_connect from 'db/config';
import jwt from 'jsonwebtoken';
import knex from 'knex';
import UserModel from 'src/models/user.model';
import { TUser } from 'src/types/models';
import config from '../../config.json';

class Token {
  async create(email) {
    let user: TUser | undefined = await UserModel.getUserByEmail(email);
    if (user !== undefined) {
      try {
        let token = Date.now();
        await db_connect('users')
          .insert({
            user_id: user?.id,
            used: 0,
            token,
          })
          .table('password_tokens');
        return { status: true, token };
      } catch (error) {
        console.log(error);
        return { status: false, error };
      }
    } else {
      return { status: false, error: 'Incorrect email' };
    }
  }

  async validate(token) {
    try {
      let result = await db_connect('users').select().where({ token }).table('password_tokens');

      if (result.length > 0) {
        let tk = result[0];

        if (tk.used) {
          return { status: false };
        } else {
          return { status: true, token: tk };
        }
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }

  async setUsed(token) {
    await db_connect('users').update({ used: 1 }).where({ token }).table('password_tokens');
  }
}
export const token = new Token();
