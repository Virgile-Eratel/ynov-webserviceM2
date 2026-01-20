import jwt from "jsonwebtoken"
import { Role } from "../types/role";

const jwtSecret = process.env.JWT_SECRET ?? ""

export const sign = (payload: object, expiresIn = "1h") =>
    jwt.sign(payload, jwtSecret, {expiresIn} as jwt.SignOptions);

export const verify = (token: string) => jwt.verify(token, jwtSecret) as { id: string, role: Role, email: string };