import express from "express";
import request from "supertest";
import { Controller } from "../controllers/games.controllers";
import { GameRepository } from "../repository/games.repository";
import { GameService } from "../services/games.service";
import { GameMediaRepository } from "../repository/gamesMedia.repository";
import { UserRepository } from "../repository/user.repository";

const repo = new GameRepository();
const mediaRepo = new GameMediaRepository();
const userRepo = new UserRepository();
const service = new GameService(repo, mediaRepo, userRepo);
service.sortIncreaseGamesByID();
const controller = new Controller(service);
const userRouter = express.Router();

userRouter.post("/signup", controller.signUp);
userRouter.get("/", controller.getAuthenticatedUser);
userRouter.post("/login", controller.login);
userRouter.post("/logout", controller.logout);

export default userRouter;