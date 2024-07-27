import jwt from 'jsonwebtoken';

export default function signToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
