import express, {NextFunction, Request, Response} from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import GameModel from "./models/game.model"
import gamesRouter from "./routes/games.routes"

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/games", gamesRouter);

app.use((req, res, next) => {
    next(Error("Endpoint not found"));
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction)=>{
    console.error(error);
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) errorMessage = error.message;
    res.status(450).json({error: errorMessage});
});


export default app; 