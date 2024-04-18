import { GameService } from "../services/games.service";
import { GameRepository } from "../repository/games.repository";
import { Game } from "../models/game";
import {genres as validGenres} from "../models/genres";

describe("GameService", () => {
  let gameService: GameService;
  let gameRepository: GameRepository;

  beforeEach(() => {
    gameRepository = new GameRepository();
    
    gameRepository.addGame(new Game(
      1,
      "Mock Game 1",
      2022,
      "Description of Mock Game 1",
      ["Action, Horror, Survival"],
      8.5,
      "https://example.com/mock_game1_image.png"
    ));

    gameRepository.addGame(new Game(
      2,
      "Mock Game 2",
      2023,
      "Description of Mock Game 2",
      ["Action, Indie"],
      7.8,
      "https://example.com/mock_game2_image.png"
    ))
    gameService = new GameService(gameRepository);
  });
  
  test("should add a game", () => {
    const initialLength = gameService.getAllGames().length;
    const addedGame = gameService.addGame(
      "New Game",
      "Description of New Game",
      ["Sci-fi, Anime"],
      2024,
      7.5,
      "https://example.com/new_game_image.png"
    );

    expect(addedGame).toBeInstanceOf(Game);
    expect(addedGame.id).toBeDefined();
    expect(gameService.getAllGames().length).toBe(initialLength + 1);
  });

  test("should retrieve a game by ID", () => {
    const retrievedGame = gameService.getGameById(1);

    expect(retrievedGame).toBeInstanceOf(Game);
    expect(retrievedGame.id).toEqual(1);
  });

  it("should update a game by ID", () => {
    const updatedGame = gameService.updateGame(
      1,
      "Updated Game Title",
      "Updated Description",
      ["Exploration, Space"],
      2010,
      9.0,
      "https://example.com/updated_game_image.png"
    );

    expect(updatedGame.title).toEqual("Updated Game Title");
    expect(updatedGame.description).toEqual("Updated Description");
    expect(updatedGame.genres).toEqual(["Exploration, Space"]);
    expect(updatedGame.releaseYear).toEqual(2010);
    expect(updatedGame.rating).toEqual(9.0);
    expect(updatedGame.image).toEqual("https://example.com/updated_game_image.png");
  });

  test("should filter games by description", () => {
    const filteredGames = gameService.filterGamesByDescription("description");

    expect(filteredGames.length).toBeGreaterThan(0);
    expect(filteredGames.every(game => game.description.toLowerCase().includes("description"))).toBe(true);
  });

  test("should sort games in decreasing order by title", () => {
    const sortedGames = gameService.sortDecreaseGamesByTitle();
    const titles = sortedGames.map(game => game.title);

    expect(titles).toEqual(titles.slice().sort().reverse());
  });

  test("should retrieve games by page", () => {
    const currentPage = 1;
    const recordsPerPage = 5;
    const { currentRecords, totalPages } = gameService.getGamesByPage(currentPage, recordsPerPage);

    expect(currentRecords.length).toBeLessThanOrEqual(recordsPerPage);
    expect(totalPages).toBe(Math.ceil(gameRepository.getAllGames().length / recordsPerPage));
  });


  test("should filter games by genres", () => {
    const genres = ["Test Genre"];
    const filteredGames = gameService.filterGamesByGenres(genres);

    expect(filteredGames.every(game => game.genres.some(genre => genres.includes(genre)))).toBe(true);
  });

  test("should search games by title", () => {
    const searchText = "Test";
    const searchedGames = gameService.searchGamesByTitle(searchText);

    expect(searchedGames.every(game => game.title.toLowerCase().includes(searchText.toLowerCase()))).toBe(true);
  });
});