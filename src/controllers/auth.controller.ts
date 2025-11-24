import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { User } from '../types/user';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Paramètres incorrects' });
  }
  const { token, isAuthenticated }: { token: string | null; isAuthenticated: boolean } = await authService.login(
    email,
    password,
  );
  if (isAuthenticated && token) {
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: 'Informations de login invalides' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body ?? {};

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Paramètres incorrects' });
  }
  try {
    const {user, token} :{user: Omit<User, 'passwordHash'> | null,token: string| null} = await authService.register(email, password, role);
    if (user && token) {
      return res.status(201).json({ user,token });
    } else {
      return res.status(401).json({ message: 'Informations de register invalides' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
