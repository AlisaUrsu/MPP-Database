import { GameMedia } from "../models/gameMedia";
import GameMediaModel from "../models/gameMedia.model";

export class GameMediaRepository {
    constructor() {}

    async addGameMedia(gameMedia: GameMedia): Promise<GameMedia> {
        const newGameMedia = new GameMediaModel(gameMedia);
        await newGameMedia.save();
        return newGameMedia;
    }

    async updateGameMedia(updatedGameMedia: GameMedia): Promise<GameMedia> {
        const gameMedia = await GameMediaModel.findOne({id: updatedGameMedia.id});
        if (!gameMedia) {
            throw new Error("Game not found");
        }
        Object.assign(gameMedia, updatedGameMedia);
        await gameMedia.save();
        return gameMedia;
    }

    async deleteGameMedia(gameMediaId: number): Promise<void> {
        await GameMediaModel.findOneAndDelete({id: gameMediaId});
    }

    async getAllGameMedia(): Promise<GameMedia[]> {
        return await GameMediaModel.find({});
    }

    async getGameMediaById(gameMediaId: number): Promise<GameMedia | null> {
        return await GameMediaModel.findOne({id: gameMediaId});
    }

    async getGameMediaByGameId(gameId: number): Promise<GameMedia[]> {
        return await GameMediaModel.find({ gameId: gameId });
    }
}
