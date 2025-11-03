import { createServer, Server } from "http";
import app from "./app";
import "dotenv/config";


const server: Server = createServer(app);
const port: number = Number(process.env.PORT) ?? 3000;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});
