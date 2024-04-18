import { Game } from "../models/game";
import { GameRepository } from "../repository/games.repository";

describe("GameRepository", () => {
  let gameRepository: GameRepository;

  beforeEach(() => {
    gameRepository = new GameRepository();
    gameRepository.populateRepo(); 
  });

  test("should add a game to the repository", () => {
    const initialLength = gameRepository.getAllGames().length;
    const newGame = new Game(
      17,
      "New Game",
      2024,
      "A description of the new game.",
      ["Action", "Indie"],
      8.5,
      "https://example.com/new_game_image.png"
    );

    gameRepository.addGame(newGame);

    const games = gameRepository.getAllGames();
    expect(games.length).toBe(initialLength + 1);
    expect(games).toContain(newGame);
  });

  test("should update an existing game in the repository", () => {
    const updatedGame = new Game(
      1,
      "Updated Game",
      2024,
      "An updated description.",
      ["Horror"],
      9.0,
      "https://example.com/updated_game_image.png"
    );

    gameRepository.updateGame(updatedGame);

    const game = gameRepository.getGameById(1);
    expect(game).toEqual(updatedGame);
  });

  test("should delete a game from the repository", () => {
    const initialLength = gameRepository.getAllGames().length;
    const gameIdToDelete = 1;

    gameRepository.deleteGame(gameIdToDelete);

    const games = gameRepository.getAllGames();
    expect(games.length).toBe(initialLength - 1);
    expect(gameRepository.getGameById(gameIdToDelete)).toBeUndefined();
  });

  test("should retrieve all games from the repository", () => {
    const games = gameRepository.getAllGames();
    expect(games.length).toBeGreaterThan(0);
  });

  test("should retrieve a game by its ID", () => {
    const gameId = 2;
    const game = gameRepository.getGameById(gameId);
    expect(game?.id).toBe(gameId);
  });
});
