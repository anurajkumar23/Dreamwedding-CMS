import jwt from 'jsonwebtoken';

export default function signToken(id: string, role: string) {
  // console.log("Signing token with ID:", id, "and Role:", role); // Debug logging
  return jwt.sign({ id, role }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
