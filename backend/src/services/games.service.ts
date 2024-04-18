import { genres as validGenres } from "../models/genres";
import { GameRepository } from "../repository/games.repository";
import { GameMediaRepository } from "../repository/gamesMedia.repository";
import {Game} from "../models/game";
import { GameMedia } from "../models/gameMedia";

export class GameService{
    private repository: GameRepository;
    private mediaRepository: GameMediaRepository;

    constructor(gameRepository: GameRepository, mediaRepository: GameMediaRepository) {
        this.repository = gameRepository;
        this.mediaRepository = mediaRepository;
    }

    public async getAllGames() {
        return await this.repository.getAllGames();
    }

    public async getNextAvailableId(): Promise<number> {
        const games = await this.getAllGames();
        if (games.length > 0) {
            const nextAvailableId = games.reduce((maxId, game) => Math.max(maxId, game.id), 0);
            return nextAvailableId + 1;
        } else {
            return 1;
        }
    }

    public async gameExists(title: string, releaseYear: number): Promise<boolean> {
        const games = await this.getAllGames();
        return games.some(game => game.title === title && game.releaseYear === releaseYear);
    }

    public async gameExistsWithDifferentID(title: string, releaseYear: number, id: number): Promise<boolean> {
        const games = await this.getAllGames();
        return games.some(game => game.title === title && game.releaseYear === releaseYear && game.id !== id);
    }

    public async addGame(title: string, description: string, genres: string[], releaseYear: number, rating: number, image: string): Promise<Game> {
        if (await this.gameExists(title, releaseYear)) {
            throw new Error("Game already exists!");
        }
        const id = await this.getNextAvailableId();
        const newGame = new Game(id, title, releaseYear, description, genres, rating, image);
        return await this.repository.addGame(newGame);
    }

    public async getGameById(id: number): Promise<Game | null> {
        return await this.repository.getGameById(id);
    }

    public async deleteGame(id: number): Promise<void> {
        await this.repository.deleteGame(id);
    }

    public async updateGame(id: number, newTitle: string, newDescription: string, newGenres: string[], newReleaseYear: number, newRating: number, newImage = "placeholder.png"): Promise<Game> {
        if (await this.gameExistsWithDifferentID(newTitle, newReleaseYear, id)) {
            throw new Error("Game already exists!");
        }
        const modifiedGame = new Game(id, newTitle, newReleaseYear, newDescription, newGenres, newRating, newImage);
        return await this.repository.updateGame(modifiedGame);
    }
 

    public async filterGamesByDescription(keyword: string): Promise<Game[]> {
        const games = await this.getAllGames();
        return games.filter(game => game.description.toLowerCase().includes(keyword.toLowerCase()));
    }

    
    public async sortDecreaseGamesByTitle(): Promise<Game[]> {
        const games = await this.getAllGames();
        return games.sort((a, b) => b.title.localeCompare(a.title));
    };

    public async sortIncreaseGamesByTitle(): Promise<Game[]> {
        const games = await this.getAllGames();
        return games.sort((a, b) => a.title.localeCompare(b.title));
    };

    public async sortIncreaseGamesByYear(): Promise<Game[]> {
        const games = await this.getAllGames();
        return games.sort((a, b) => a.releaseYear - b.releaseYear);
    };

    public async sortDecreaseGamesByYear(): Promise<Game[]> {
        const games = await this.getAllGames();
        return games.sort((a, b) => b.releaseYear - a.releaseYear);
    };

    public async sortIncreaseGamesByRating(): Promise<Game[]> {
        const games = await this.getAllGames();
        return games.sort((a, b) => a.rating - b.rating);
    };

    public async sortDecreaseGamesByRating(): Promise<Game[]> {
        const games = await this.getAllGames();
        return games.sort((a, b) => b.rating - a.rating);
    };

    public async sortIncreaseGamesByID(): Promise<Game[]> {
        const games = await this.getAllGames();
        return games.sort((a, b) => a.id - b.id);
    };

    public async getGamesByPage(gameList: Game[], currentPage: number, recordsPerPage: number): Promise<{ currentRecords: Game[], totalPages: number }> {
        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const currentRecords = gameList.slice(indexOfFirstRecord, indexOfLastRecord);
        const totalPages = Math.ceil(gameList.length / recordsPerPage);
    
        return { currentRecords, totalPages };
    }

    public async getChartData(): Promise<{ [genre: string]: number }> {
        const games = await this.getAllGames();
        const genreFrequency: { [genre: string]: number } = {};
    
        validGenres.forEach(genre => {
            genreFrequency[genre] = 0;
        });
    
        games.forEach(game => {
            game.genres.forEach(genre => { genreFrequency[genre]++; });
        });
    
        return genreFrequency;
    }
    

    public async filterGamesByGenres(genres: string[]): Promise<Game[]> {
        if (genres.length === 0) {
            return await this.getAllGames();
        }
    
        const games = await this.getAllGames();
        return games.filter(game =>
            genres.some(selectedGenre => game.genres.includes(selectedGenre))
        );
    }
    
    
    public async searchGamesByTitle(searchText: string): Promise<Game[]> {
        const searchQuery = searchText.toLowerCase().trim();
        const games = await this.getAllGames();
       
        return games.filter(game =>
            game.title.toLowerCase().includes(searchQuery)
        );
    }

    public async getAllGameMedia() {
        return await this.mediaRepository.getAllGameMedia();
    }

    public async getNextAvailableMediaId(): Promise<number> {
        const gameMedia = await this.getAllGameMedia();
        if (gameMedia.length > 0) {
            const nextAvailableId = gameMedia.reduce((maxId, gameMedia) => Math.max(maxId, gameMedia.id), 0);
            return nextAvailableId + 1;
        } else {
            return 1;
        }
    }

    public async addGameMedia(gameId: number, mediaType: string, url: string): Promise<GameMedia> {
        const id = await this.getNextAvailableMediaId();
        const newGameMedia = new GameMedia(id, gameId, mediaType, url);
        return await this.mediaRepository.addGameMedia(newGameMedia);
    }

    public async getGameMediaById(id: number): Promise<GameMedia | null> {
        return await this.mediaRepository.getGameMediaById(id);
    }

    public async deleteGameMedia(id: number): Promise<void> {
        await this.mediaRepository.deleteGameMedia(id);
    }

    public async updateGameMedia(id: number, newGameId: number, newMediaType: string, newUrl: string): Promise<GameMedia> {
        const modifiedGameMedia = new GameMedia(id, newGameId, newMediaType, newUrl);
        return await this.mediaRepository.updateGameMedia(modifiedGameMedia);
    }
    
    async getMediaByGameId(gameId: number): Promise<GameMedia[]> {
        return await this.mediaRepository.getGameMediaByGameId(gameId);
    }
}