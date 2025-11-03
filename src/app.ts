import express, {Request, Response} from "express";

const app = express();
const router = express.Router();

router.get("/", (_req: Request, res: Response) => res.send("Hello World"));

app.use(router);

export default app;