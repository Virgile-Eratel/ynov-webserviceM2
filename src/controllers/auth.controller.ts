import { Request, Response } from 'express';
import *  as authService from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Paramètres incorrects' });
  }
  const { token, isAuthenticated }: { token: string| null; isAuthenticated: boolean } = await authService.login(
    email,
    password,
  );
  if (isAuthenticated && token) {
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: 'Informations de login invalides' });
  }
};
