import { transports } from 'winston';

export interface LogOptions {
  driver?: transports.ConsoleTransportInstance;
}
