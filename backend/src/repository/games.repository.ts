import { Game } from "../models/game";
import GameModel from "../models/game.model";

export class GameRepository {
    constructor() {}

    async addGame(game: Game): Promise<Game> {
        const newGame = new GameModel(game);
        await newGame.save();
        return newGame;
    }

    async updateGame(updatedGame: Game): Promise<Game> {
        const game = await GameModel.findOne({id: updatedGame.id});
        if (!game) {
            throw new Error("Game not found");
        }
        Object.assign(game, updatedGame);
        await game.save();
        return game;
    }

    async deleteGame(gameId: number): Promise<void> {
        await GameModel.findOneAndDelete({id: gameId});
    }

    async getAllGames(): Promise<Game[]> {
        return await GameModel.find({});
    }

    async getGameById(gameId: number): Promise<Game | null> {
        return await GameModel.findOne({id: gameId});
    }
}
