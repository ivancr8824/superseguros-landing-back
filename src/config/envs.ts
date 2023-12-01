import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  MYSQL_URL: get('MYSQL_URL').required().asString(),
  MYSQL_DB: get('MYSQL_DB').required().asString(),
  MYSQL_USER: get('MYSQL_USER').required().asString(),
  MYSQL_PASSWORD: get('MYSQL_PASSWORD').required().asString(),
  MYSQL_PORT: get('MYSQL_PORT').required().asPortNumber(),
}