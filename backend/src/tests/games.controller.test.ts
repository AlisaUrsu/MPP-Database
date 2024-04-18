import express, {NextFunction, Request, Response} from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import GameModel from "../models/game.model"
import gamesRouter from "../routes/games.routes"
import request from "supertest";
import { GameRepository } from "../repository/games.repository";
import { Game } from "../models/game";
import { GameService } from "../services/games.service";
import { Controller } from "../controllers/games.controllers";


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/games", gamesRouter);

describe("Games Routes", () => {
    let gameService: GameService;
    let gameRepository: GameRepository;
    let controller: Controller;
  
    beforeEach(() => {
      gameRepository = new GameRepository()
      gameService = new GameService(gameRepository);
      controller = new Controller(gameService)
    });

    test("GET /games should respond with 200", async () => {
      const response = await request(app).get("/games");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(16);
    });

    test("GET / should respond with 404", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(404);
    })

    test("POST /games/add should respond with 200", async () => {
        const newGame = {
            title: "New Game",
            description: "A new game description",
            genres: ["Action", "Adventure"],
            releaseYear: 2022,
            rating: 4.5,
            image: "image.png"
        };
        const response = await request(app).post("/games/add").send(newGame);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(17);
        expect(response.body.title).toBe("New Game"),
        expect(response.body.description).toBe("A new game description");
        expect(response.body.releaseYear).toBe(2022);
        expect(response.body.rating).toBe(4.5);
        expect(response.body.image).toBe("image.png");
    });

    test("DELETE /games/delete/:id should respond with 200", async () => {
        const gameIdToDelete = 1;
        const response = await request(app)
            .delete(`/games/delete/${gameIdToDelete}`);

        expect(response.status).toBe(200);
    });

    test("DELETE /games/:id should respond with 404", async () => {
        const gameIdToDelete = 3;
        const response = await request(app).delete(`/games/${gameIdToDelete}`);

        expect(response.status).toBe(404);
    });

    test("PUT /games/update/:id should respond with 200", async () => {
        const gameIdToUpdate = 3;

        const updatedGame = {
            title: "Updated Game Title",
            description: "Updated game description",
            genres: ["Action", "Adventure"],
            releaseYear: 2023,
            rating: 4.7,
            image: "updated-image.png"
        };

        const response = await request(app).put(`/games/update/${gameIdToUpdate}`).send(updatedGame);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(3);
        expect(response.body.title).toBe("Updated Game Title"),
        expect(response.body.description).toBe("Updated game description");
        expect(response.body.releaseYear).toBe(2023);
        expect(response.body.rating).toBe(4.7);
        expect(response.body.image).toBe("updated-image.png");
    });

    test("GET /games/filter should respond with 200", async () => {
        const response = await request(app).get("/games/filter").query({ description: "action" });
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    test("GET /games/filter/ratingCategories should respond with 200", async () => {
        const response = await request(app).get("/games/filter/ratingCategories");
        expect(response.status).toBe(200);
    });

    test("GET /games/filter/ratingCategories/:ratingCategory should respond with 200", async () => {
        const ratingFilter = "8-10";
        const response = await request(app).get(`/games/filter/ratingCategories/${ratingFilter}`);
        expect(response.body.length).toBe(7);
        expect(response.status).toBe(200);
    });
  });
