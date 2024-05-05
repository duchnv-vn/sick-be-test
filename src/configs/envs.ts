import { LogDriver } from '../utils/enum/logDriver';

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || '';

export const MONGODB_URI = process.env.MONGODB_URI || '';

export const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || '';
export const AUTH0_ISSUER_URL = process.env.AUTH0_ISSUER_URL || '';
export const AUTH0_TOKEN_SIGN_ALG = process.env.AUTH0_TOKEN_SIGN_ALG || '';
export const AUTH0_MACHINE_CLIENT_ID =
  process.env.AUTH0_MACHINE_CLIENT_ID || '';
export const AUTH0_MACHINE_CLIENT_SECRECT =
  process.env.AUTH0_MACHINE_CLIENT_SECRECT || '';

export const LOG_DRIVER = process.env.LOG_DRIVER || LogDriver.DEFAULT;
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

export const AUTH0_APP_CREDENTIAL_PUBLIC_KEY =
  process.env.AUTH0_APP_CREDENTIAL_PUBLIC_KEY || '';
export const AUTH0_APP_CREDENTIAL_PRIVATE_KEY =
  process.env.AUTH0_APP_CREDENTIAL_PRIVATE_KEY || '';
