import express from "express";
import request from "supertest";
import { Controller } from "../controllers/games.controllers";
import { GameRepository } from "../repository/games.repository";
import { GameService } from "../services/games.service";
import { GameMediaRepository } from "../repository/gamesMedia.repository";

const repo = new GameRepository();
const mediaRepo = new GameMediaRepository();
const service = new GameService(repo, mediaRepo);
service.sortIncreaseGamesByID();
const controller = new Controller(service);
const router = express.Router();

//router.get("/", controller.getAllGames);
router.post("/add", controller.addGame);
router.put("/update/:id", controller.updateGame);
router.delete("/delete/:id", controller.deleteGame);
router.get("/:page/:records/filter", controller.filterGamesByDescription);
router.get("/:page/:records/sort/:sortOption", controller.getGamesSorted);
router.get("/search", controller.searchGamesByTitle);
router.get("/chart", controller.getChart);
router.get("/:page/:records/", controller.getGamesByPage);
router.get("/:page/:records/filter/genres", controller.filterGamesByGenres);
router.get("/:page/:records/filter/ratingCategories/:ratingCategory", controller.filterGamesByRating);
router.get("/ratingCategories", controller.getRatingCategories);

router.get("/media", controller.getAllMedia);
router.delete("/media/delete/:id", controller.deleteMedia);
router.post("/media/add", controller.addMedia);
router.put("/media/update/:id", controller.updateMedia);
router.get("/media/:gameId",controller.filterMediaByGame);
export default router;  