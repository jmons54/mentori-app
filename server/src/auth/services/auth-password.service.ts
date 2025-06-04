import bcrypt from 'bcrypt';

const SALT_ROUND = 10;

export function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUND);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
