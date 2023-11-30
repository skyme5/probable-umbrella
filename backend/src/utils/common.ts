import { QueryFailedError } from 'typeorm';

export const queryFailedGuard = (
  err: any,
): err is QueryFailedError & {
  code: string;
  detail: string;
  constraint: string;
} => err instanceof QueryFailedError;
