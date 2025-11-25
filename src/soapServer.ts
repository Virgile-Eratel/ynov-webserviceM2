import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import * as soap from 'soap';
import { productsService } from './soap/services/productsService.soap';

const server = express();
const port: number = Number(process.env.SOAP_PORT) ?? 4000;
const ProductsServiceWSDL = fs.readFileSync(path.resolve('src/soap/wsdl/ProductsService.wsdl'), 'utf-8');

server.listen(port, () => {
  soap.listen(server, '/soap/products', productsService, ProductsServiceWSDL);
  console.log(`SOAP server is running on http://localhost:${port}`);
});
