import 'dotenv/config';
import { createServer, Server } from 'http';
import app from './app';
import { connectToMongo } from './db/mongo.connect';

const mongoUri: string = process.env.MONGO_URI ?? 'http://localhost:27017'
connectToMongo(mongoUri);

const server: Server = createServer(app);
const port: number = Number(process.env.PORT) ?? 3000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
