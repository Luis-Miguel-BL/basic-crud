import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import authConfig from '@shared/config/auth';

export default {
  async ready(request: Request, response: Response): Promise<Response> {
    const db_name = process.env.TYPEORM_DATABASE;

    const connection = getConnection();

    const query = await connection.query(
      `
      SELECT * 
      FROM pg_stat_activity
      WHERE datname = $1
      AND "state" = 'active'
    `,
      [db_name]
    );

    let database = true;
    if (!query[0]) {
      database = false;
    }

    const status = {
      database,
    };

    return response.status(200).json(status);
  },

  async status(request: Request, response: Response): Promise<Response> {
    const status = {
      application: true,
    };
    return response.status(200).json(status);
  },

  async fakeAuth(request: Request, response: Response): Promise<Response> {
     const { secret } = authConfig.jwt;

  const token = sign({}, secret);
    return response.status(200).json({token});
  },
};
