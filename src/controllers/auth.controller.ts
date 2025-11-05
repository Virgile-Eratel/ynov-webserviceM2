import { NextFunction, Request, Response } from "express"
import { login as loginService } from "../services/auth.service"

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password } = req.body ?? {};

  if(!email || !password){
    return res.status(400).json({ message: 'Paramètres incorrects' })
  }
  const isAuthenticated: boolean = await loginService(email, password);

  if(isAuthenticated) {
    return res.status(200).json({message: 'OK'})
  } else {
    return res.status(401).json({message: 'Informations de login invalides'})
  }
}