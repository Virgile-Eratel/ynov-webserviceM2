import express, { Router } from 'express';
import { login, register } from '../controllers/auth.controller';

const router: Router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connecte un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Paramètres incorrects
 *       401:
 *         description: Informations de login invalides
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Crée un nouveau user et le login
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewUser'
 *     responses:
 *      201:
 *        description: User créé et log avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthResponse'
 *      400:
 *        description: Requête invalide
 *      401:
 *        description: Non authentifié - token manquant ou invalide
 *      500:
 *        description: Autre erreur lors de la création user
 */
router.post('/register', register);


export default router;
