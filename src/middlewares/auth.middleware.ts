import { NextFunction, Request, Response } from 'express';
import { verify } from '../utils/jwt';


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