import { LogDriver } from '../utils/enum/logDriver';

export const PORT = process.env.PORT || 3000;

export const MONGODB_URI = process.env.MONGODB_URI || '';

export const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || '';
export const AUTH0_ISSUER_URL = process.env.AUTH0_ISSUER_URL || '';
export const AUTH0_TOKEN_SIGN_ALG = process.env.AUTH0_TOKEN_SIGN_ALG || '';

export const LOG_DRIVER = process.env.LOG_DRIVER || LogDriver.DEFAULT;
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
