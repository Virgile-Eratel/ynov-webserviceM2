import express, { Router } from 'express';
import { get, getList, patch, post, put, remove } from '../controllers/products.controller';

const productsRouter: Router = express.Router();

//TODO ajouter les parameters pour la recherche et pagination
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Récupère tous les produits
 *     tags: [Products]
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        description: numero de page a retourner en fonction de limit
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: nombre d'items a retourner
 *      - in: query
 *        name: s
 *        schema:
 *          type: string
 *        description: recherche sur les Produits
 *     responses:
 *      200:
 *        description: Liste des poduits
 */
productsRouter.get('/', getList);
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Récupère un produit via son identifiant
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: Produit trouvé
 *      404:
 *        description: Produit non trouvé
 */
productsRouter.get('/:id', get);
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crée un nouveau produit
 *     tags: [Products]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewProduct'
 *     responses:
 *      201:
 *        description: Produit créé avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Requête invalide
 */
productsRouter.post('/', post);
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Modifit un produit en écrasant les données
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *     responses:
 *      200:
 *        description: Produit modifié avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Requête invalide
 *      500:
 *        description: Erreur lors de la modification
 */
productsRouter.put('/:id', put);
/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Modifit un produit sans écraser les données
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *     responses:
 *      200:
 *        description: Produit modifié avec succès
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Requête invalide
 *      500:
 *        description: Erreur lors de la modification
 */
productsRouter.patch('/:id', patch);
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Supprime un produit via son identifiant
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit
 *         schema:
 *           type: string
 *     responses:
 *      204:
 *        description: Produit supprimé
 *      500:
 *        description: Erreur lors de la suppression
 */
productsRouter.delete('/:id', remove);

export default productsRouter;
