import "./Home.styles.css";
import "../Games.type";
import GamesContainer from "../game-list/GamesContainer";
import {useEffect, useState} from "react";
import {Games} from "../Games";
import {IGame} from "../Games.type";
import AddGame from "../game-add/AddGame";
import {PageEnum} from "../Page.Operations";
import UpdateGame from "../game-update/UpdateGame";
import {BarChart} from "@mui/x-charts";
import {Genres} from "../Genres";
import GenreBarChart from "../barchart/GenreBarChart";
import {GenreLineChart} from "../linechart/GenreLineChart";


const Home = () => {
    const [gameList, setGameList] = useState([] as IGame[]);
    const [shownPage, setShownPage] = useState(PageEnum.list);
    const [gameToEdit, setGameToEdit] = useState({} as IGame);
    const [selectedSortOption, setSelectedSortOption] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [genresData, setGenresData] = useState<{ [genre: string]: number }>({});
    const [ratingCategories, setRatingCategories] = useState<string[]>([]);
    const [selectedRatingCategory, setSelectedRatingCategory] = useState("");
    const [filteredGameList, setFilteredGameList] = useState([] as IGame[]);

    /*useEffect(() => {
        async function loadGames() {
            try {
                const response = await fetch("http://localhost:5000/games", {method: "GET"});
                const games = await response.json();
                setGameList(games);
                setFilteredGameList(games);
                setSelectedSortOption("")
                fetchChartData();
            }
            catch (error){
                console.error(error);
                alert(error);
            }
        }
        loadGames();
    }, []);*/

    const loadGames = async () => {
        try {
            const response = await fetch(`http://localhost:5000/games/${currentPage}/${recordsPerPage}`, { method: "GET" });
            const { currentRecords, totalPages } = await response.json();
            setGameList(currentRecords);
            setFilteredGameList(currentRecords);
            setTotalPages(totalPages);
            setSelectedSortOption("");
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    

    useEffect(() => {
        const fetchRatingCategoriesData = async () => {
            try {
                const response = await fetch("http://localhost:5000/games/ratingCategories");
                const categories = await response.json();
                setRatingCategories(categories);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        };
        fetchRatingCategoriesData();
    }, []);

    const handleRatingCategoryChange = (e: any) => {
        setSelectedRatingCategory(e.target.value);
    };

    const fetchFilteredGames = async () => {
        try {
            const response = await fetch(`http://localhost:5000/games/${currentPage}/${recordsPerPage}/filter/ratingCategories/${selectedRatingCategory}`);
            const { currentRecords, totalPages } = await response.json();
            setGameList(currentRecords);
            setFilteredGameList(currentRecords);
            setTotalPages(totalPages);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    useEffect(() => {
        if (selectedRatingCategory) {
            fetchFilteredGames();
        }
    }, [selectedRatingCategory, currentPage, recordsPerPage]);

    const onAddGame = () => {
        setShownPage(PageEnum.add);
    };

    const showGamesPage = () => {
        setShownPage(PageEnum.list);
    };


    const addGame = async (data: IGame) => {
        try {
            const response = await fetch("http://localhost:5000/games/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const newGame = await response.json();
            setGameList([...gameList, newGame]);
            loadGames();
        } catch (error) {
            console.error(error);
            alert("Error adding game");
        }
    };

    const deleteGame = async (data: IGame) => {
        try {
            await fetch(`http://localhost:5000/games/delete/${data.id}`, {
                method: "DELETE",
            });
            const updatedGameList = gameList.filter((game) => game.id !== data.id);
            setGameList(updatedGameList);
            loadGames();
        } catch (error) {
            console.error(error);
            alert("Error deleting game");
        }
    };

    const onUpdateGame = (data: IGame) => {
        setShownPage(PageEnum.update);
        setGameToEdit(data);
    };

    const onBarchart = () =>{
        setShownPage(PageEnum.barchart);
    }

    const updateGame = async (data: IGame) => {
        try {
            const response = await fetch(`http://localhost:5000/games/update/${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const updatedGame = await response.json();
            const updatedGameList = gameList.map((game) =>
                game.id === updatedGame.id ? updatedGame : game
            );
            setGameList(updatedGameList);
            loadGames();
        } catch (error) {
            console.error(error);
            alert("Error updating game");
        }
    };

    
    const handleSortOptionChanged = (e:any) => {
        const selectedOption = e.target.value;
        setSelectedSortOption(selectedOption);
    };
    
    const sortGames = async () => {
        try {
            const response = await fetch(`http://localhost:5000/games/${currentPage}/${recordsPerPage}/sort/${selectedSortOption}`, { method: "GET" });
            const { currentRecords, totalPages } = await response.json();
                setGameList(currentRecords);
                setFilteredGameList(currentRecords);
                setTotalPages(totalPages);
            //loadGames();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };
    
    useEffect(() => {
        if (selectedSortOption) {
            sortGames();
        }
    }, [selectedSortOption, currentPage, recordsPerPage]);

    const handleSearchInputChange = (e: any) => {
        setSearchInput(e.target.value);
    };
    
    

    const handleGenreFilterChange = (e: any) => {
        const genre = e.target.value;
        const isChecked = e.target.checked;
    
        if (isChecked) {
            setSelectedGenres([...selectedGenres, genre]);
        } else {
            setSelectedGenres(selectedGenres.filter(item => item !== genre));
        }

    };

    useEffect(() => {
        filterGamesByGenres();
    }, [selectedGenres, currentPage, recordsPerPage]);
    
    
    const filterGamesByGenres = async () => {
        try {
            const genresQueryParam = selectedGenres.join(',');
            const queryParams = `genres=${encodeURIComponent(genresQueryParam)}`;
            const response = await fetch(`http://localhost:5000/games/${currentPage}/${recordsPerPage}/filter/genres?${queryParams}`, { method: "GET" });
            const { currentRecords, totalPages } = await response.json();
                setGameList(currentRecords);
                setFilteredGameList(currentRecords);
                setTotalPages(totalPages);
            
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };


    const handleRecordsPerPageChange = (e:any) => {
        setRecordsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        fetchChartData();
    }, []);

    const fetchChartData = async () => {
        try {
            const response = await fetch("http://localhost:5000/games/chart");
            if (!response.ok) {
                throw new Error("Failed to fetch chart data");
            }
            const data = await response.json();
            setGenresData(data);
            //loadGames();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div>
                {shownPage === PageEnum.list && (
                    <>
                        <div className="filter-container">
                            <div className="genre-filter">
                                {Genres.map((genre, index) => (
                                    <label key={index} className="filter-label">
                                        <input
                                            className="filter-checkbox"
                                            type="checkbox"
                                            value={genre}
                                            checked={selectedGenres.includes(genre)}
                                            onChange={handleGenreFilterChange}
                                        />
                                        {genre}
                                    </label>
                                ))}
                            </div>
                            <div className="barchart-container">
                                <h3>Most popular genres: </h3>
                                <button
                                    className="add-button"
                                    onClick={onBarchart}
                                >
                                    See Barchart
                                </button>
                            </div>
                        </div>
                        <select value={selectedRatingCategory} onChange={handleRatingCategoryChange}>
                <option value="">Select Rating Category</option>
                {ratingCategories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
                        <div className="search-add-space">
                            <input
                                type="text"
                                placeholder="Search a game by description"
                                className="search-game"
                                onChange={handleSearchInputChange}
                            />
                            <select className="sort-options" id="sort-options" data-testid="sort-options"
                                    onChange={handleSortOptionChanged}>
                                <option value="sort-by">Sort By</option>
                                <option value="alphabetically-increase">Alphabetically ↑</option>
                                <option value="alphabetically-decrease">Alphabetically ↓</option>
                                <option value="year-increase">Release year ↑</option>
                                <option value="year-decrease">Release year ↓</option>
                                <option value="rating-increase">Rating ↑</option>
                                <option value="rating-decrease">Rating ↓</option>
                                <option value="not-sorted">Not sorted</option>
                            </select>
                            <select className="records-display-options" data-testid="records-display-options" value={recordsPerPage} onChange={handleRecordsPerPageChange}>
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={20}>20 per page</option>
                                <option value={gameList.length}>All</option>
                            </select>
                            <button
                                className="add-button"
                                onClick={onAddGame}
                            >
                                Add Game
                            </button>
                        </div>
                        <section className="filter"></section>
                        <section className="content">
                            <GamesContainer
                                list={gameList}
                                onDeleteButton={deleteGame}
                                onUpdateButton={onUpdateGame}
                            />
                        </section>
                    
                        <div className="pagination">
                            <button
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <div className="page-numbers">
                                {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => onPageChange(page)}
                                        className={page === currentPage ? "active" : ""}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                           
                    </>
                )}
                {shownPage === PageEnum.add && (
                    <AddGame
                        onBackButton={showGamesPage}
                        onSubmitButton={addGame}
                    />
                )}
                {shownPage === PageEnum.update && (
                    <UpdateGame
                        data={gameToEdit}
                        onBackButton={showGamesPage}
                        onUpdateButton={updateGame}
                    />
                )}
                {shownPage === PageEnum.barchart && (
                    <>
                    <GenreBarChart genresData={genresData} onBackButton={showGamesPage}/>
                    <GenreLineChart genresData={genresData}/>
                    </>
                )}
            </div>
        </>
    );
};
export default Home;
