import { RequestHandler } from "express";
import GameModel from "../models/game.model"
import { genres as validGenres } from "../models/genres";
import { GameService } from "../services/games.service";
import {ratingCategories} from "../models/ratingCategories"

export class Controller {
    private service: GameService;
    
    constructor(service: GameService){
        this.service = service;
    }

    public getAllGames: RequestHandler = async(req, res, next) => {
        try{
            const games = await this.service.getAllGames();
            res.status(200).json(games);
        }catch (error){
            next(error);
        }
    };

    public addGame: RequestHandler = async(req, res, next) => {
        try{
            let { title, description, genres, releaseYear, rating, image } = req.body;

            releaseYear = Number(releaseYear);
            rating = Number(rating);

            if (!title) {
                throw new Error("Title is required.");
            }
            if (title.length < 3) {
                throw new Error("Title must be a string of at least 3 characters.");
            }
            if (!releaseYear){
                throw new Error("Release year is required.");
            } 
            if (releaseYear < 1958 || releaseYear > 2024) {
                throw new Error("Release year must be between 1958 and 2024");
            }
            if (!description){
                throw new Error("Description is required.");
            }
            if (description.length > 220) {
                throw new Error("Description must be of maximum 220 characters");
            }
            if (!genres){
                throw new Error("At least one genre must be selected.");
            } 
            if (!Array.isArray(genres) || genres.length === 0 || genres.length > 6 || !genres.every(genre => typeof genre === "string" && validGenres.includes(genre))) {
                throw new Error("Genres must be an array of up to 6 strings");
            }
            if (!rating){
                throw new Error("Rating is required.");
            }
            if (rating < 1 || rating > 10) {
                throw new Error("Rating must be between 1 and 10");
            }
            const newGame = await this.service.addGame(title, description, genres, releaseYear, rating, image);
            res.status(200).json(newGame);
        }catch (error){
            next(error);
        }
    };

    public deleteGame: RequestHandler = async(req, res, next) => {
        try{
            const id = Number(req.params.id);
            this.service.deleteGame(id);
            const games = await this.service.getAllGames();
            res.status(200).json(games);
        }catch (error){
            next(error);
        }
    };
    public updateGame: RequestHandler = async(req, res, next) => {
        try{
            const id = Number(req.params.id);
            let {title, description, genres, releaseYear, rating, image } = req.body;
            releaseYear = Number(releaseYear);
            rating = Number(rating);

            if (!title) {
                throw new Error("Title is required.");
            }
            if (title.length < 3) {
                throw new Error("Title must be a string of at least 3 characters.");
            }
            if (!releaseYear){
                throw new Error("Release year is required.");
            } 
            if (releaseYear < 1958 || releaseYear > 2024) {
                throw new Error("Release year must be between 1958 and 2024");
            }
            if (!description){
                throw new Error("Description is required.");
            }
            if (description.length > 220) {
                throw new Error("Description must be of maximum 220 characters");
            }
            if (!genres){
                throw new Error("At least one genre must be selected.");
            } 
            if (!Array.isArray(genres) || genres.length === 0 || genres.length > 6 || !genres.every(genre => typeof genre === "string" && validGenres.includes(genre))) {
                throw new Error("Genres must be an array of up to 6 strings");
            }
            if (!rating){
                throw new Error("Rating is required.");
            }
            if (rating < 1 || rating > 10) {
                throw new Error("Rating must be between 1 and 10");
            }
            const newGame = await this.service.updateGame(id, title, description, genres, releaseYear, rating, image);
            res.status(200).json(newGame);
        } catch (error){
            next(error);
        }
    };

    public filterGamesByDescription: RequestHandler = async(req, res, next) => {
        try {
            const keyword = String(req.query.description);
            const filteredGames = await this.service.filterGamesByDescription(keyword);
            res.status(200).json(filteredGames);
        } catch (error) {
            next(error);
        }
    };

    public getGamesSorted: RequestHandler = async(req, res, next) => {
        try {
            const page = Number(req.params.page);
            const records = Number(req.params.records);
            const sortOption = req.params.sortOption;
            let sortedList;
            switch (sortOption){
                case "alphabetically-decrease":
                    sortedList = await this.service.sortDecreaseGamesByTitle();
                    break;
                case "alphabetically-increase":
                    sortedList = await this.service.sortIncreaseGamesByTitle();
                    break;
                case "year-increase":
                    sortedList = await this.service.sortIncreaseGamesByYear();
                    break;
                case "year-decrease":
                    sortedList = await this.service.sortDecreaseGamesByYear();
                    break;
                case "rating-increase":
                    sortedList = await this.service.sortIncreaseGamesByRating();
                    break;
                case "rating-decrease":
                    sortedList = await this.service.sortDecreaseGamesByRating();
                    break;
                case "not-sorted":
                    sortedList = await this.service.sortIncreaseGamesByID();
                    break;
                default:
                    sortedList = await this.service.getAllGames();
                    break;
            }
            const { currentRecords, totalPages} = await this.service.getGamesByPage(sortedList, page, records);
            res.status(200).json({ currentRecords, totalPages });
        } catch (error) {
            next(error);
        }
    };

    public searchGamesByTitle: RequestHandler = async(req, res, next) => {
        try {
            const page = Number(req.params.page);
            const records = Number(req.params.records);
            const title = String(req.query.title);
            const filteredGames = await this.service.searchGamesByTitle(title);
            const { currentRecords, totalPages} = await this.service.getGamesByPage(filteredGames, page, records);
            res.status(200).json({ currentRecords, totalPages });
        } catch (error) {
            next(error);
        
        }
    }

    public getChart: RequestHandler = async(req, res, next) => {
        try {
            const genres = await this.service.getChartData();
            res.status(200).json(genres);
        } catch (error) {
            next(error);
        
        }
    }

    public getGamesByPage: RequestHandler = async(req, res, next) => {
        try {
            const page = Number(req.params.page);
            const records = Number(req.params.records);
            const games = await this.service.getAllGames()
            const { currentRecords, totalPages} = await this.service.getGamesByPage(games, page, records);
            res.status(200).json({ currentRecords, totalPages });
        } catch (error) {
            next(error);
        
        }
    }

    public filterGamesByGenres: RequestHandler = async(req, res, next) => {
        try {
            const page = Number(req.params.page);
            const records = Number(req.params.records);
            let genres: string[] = [];

            if (req.query.genres) {
                genres = (req.query.genres as string).split(','); 
            }
        
            const filteredGames = await this.service.filterGamesByGenres(genres);
            const { currentRecords, totalPages} = await this.service.getGamesByPage(filteredGames, page, records);
            res.status(200).json({ currentRecords, totalPages });
        } catch (error) {
            next(error);
        }
    };
    
    public filterGamesByRating: RequestHandler = async(req, res, next) => {
        try{
            const page = Number(req.params.page);
            const records = Number(req.params.records);
            const ratingCategory = req.params.ratingCategory;
            if (!ratingCategory || !ratingCategories.includes(ratingCategory)) {
                return res.status(400).json({ error: "Invalid or missing rating category" });
            }
            const [minRating, maxRating] = ratingCategory.split("-").map(parseFloat);
            const games = await this.service.getAllGames();
            const filteredGames = games.filter(game => game.rating >= minRating && game.rating <= maxRating);
            const { currentRecords, totalPages} = await this.service.getGamesByPage(filteredGames, page, records);
            res.status(200).json({ currentRecords, totalPages });
        }  catch (error) {
            next(error);
        }
    };

    public getRatingCategories: RequestHandler = async(req, res, next) => {
        try{
            res.status(200).json(ratingCategories);
        }catch (error){
            next(error);
        }
    }

    public getAllMedia: RequestHandler = async(req, res, next) => {
        try {
            const media = await this.service.getAllGameMedia();
            res.status(200).json(media);
        } catch (error) {
            next(error);
        }
    }

    public addMedia: RequestHandler = async(req, res, next) => {
        try{
            let { gameId, mediaType, url} = req.body;

            gameId = Number(gameId);

            if (!gameId) {
                throw new Error("Game ID is required.");
            }

            if (!mediaType){
                throw new Error("Media type is required.");
            } 
            if (!['screenshot', 'video', 'artwork', 'trailer', 'other'].includes(mediaType)) {
                throw new Error("Invalid media type.");
            }
            if (!url){
                throw new Error("URL is required.");
            }

            const newMedia = await this.service.addGameMedia(gameId, mediaType, url);
            res.status(200).json(newMedia);
        }catch (error){
            next(error);
        }
    }

    public deleteMedia: RequestHandler = async(req, res, next) => {
        try{
            const id = Number(req.params.id);
            this.service.deleteGameMedia(id);
            res.status(200).json("Media deleted successfully.");
        }catch (error){
            next(error);
        }
    };

    public updateMedia: RequestHandler = async(req, res, next) => {
        try{
            const id = Number(req.params.id);
            let {gameId, mediaType, url} = req.body;
            gameId = Number(gameId);

            if (!gameId) {
                throw new Error("Game ID is required.");
            }

            if (!mediaType){
                throw new Error("Media type is required.");
            } 
            if (!['screenshot', 'video', 'artwork', 'trailer', 'other'].includes(mediaType)) {
                throw new Error("Invalid media type.");
            }
            if (!url){
                throw new Error("URL is required.");
            }

            const newMedia = await this.service.updateGameMedia(id, gameId, mediaType, url);
            res.status(200).json(newMedia);
        } catch (error){
            next(error);
        }
    };

    public filterMediaByGame: RequestHandler = async(req, res, next) => {
        try {
            const gameId = Number(req.params.gameId);
            const media = this.service.getMediaByGameId(gameId);
            res.status(200).json(media);
        }catch (error){
            next(error);
        }
    }
}