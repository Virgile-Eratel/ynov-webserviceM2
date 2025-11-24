import { NextFunction, Request, Response } from 'express';
import { verify } from '../utils/jwt';
import {Role} from '../types/role';


export function auth(req: Request, res: Response, next: NextFunction){
  const h = req.header("Authorization");
  if(!h?.startsWith("Bearer "))
      throw res.status(401).json("Missing Bearer token");

  try{
    (req as any).user = verify(h.slice(7))
    next();
  } catch {
    throw res.status(401).json("Invalid or expired token")
  }
}


export function authorize(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction ) => {
    const user = (req as any).user;
    if(!user)
      throw res.status(401).json({ message: "Unauthorized" });
    
    if (roles.length && !roles.includes(user.role))
      throw res.status(403).json({ message: "Insufficient role" });

    next();
  }

}