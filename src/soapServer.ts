import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import * as soap from 'soap';
import { authServiceSoap } from './soap/services/auth.service.soap';
import { productsService } from './soap/services/productsService.soap';

const server = express();
const port: number = Number(process.env.SOAP_PORT) ?? 4000;
const ProductsServiceWSDL = fs.readFileSync(path.resolve('src/soap/wsdl/ProductsService.wsdl'), 'utf-8');
const AuthServiceWSDL = fs.readFileSync(path.resolve('src/soap/wsdl/AuthService.wsdl'), 'utf-8');

server.listen(port, () => {
  soap.listen(server, '/soap/products', productsService, ProductsServiceWSDL);
  soap.listen(server, '/soap/auth', authServiceSoap, AuthServiceWSDL);
  console.log(`SOAP server is running on http://localhost:${port}`);
});
