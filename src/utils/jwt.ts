import jwt from "jsonwebtoken"

const jwtSecret = process.env.JWT_SECRET ?? ""

export const sign = (payload: object, expiresIn = "1h") =>
    jwt.sign(payload, jwtSecret, {expiresIn} as jwt.SignOptions);

export const verify = (token: string) => jwt.verify(token, jwtSecret) as any;