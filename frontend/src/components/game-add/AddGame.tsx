import "./AddGame.styles.css"
import {ChangeEvent, useEffect, useState} from "react";
import {IGame} from "../Games.type";
import {Games} from "../Games";
import {Genres} from "../Genres";

type Props = {
    onBackButton: () => void;
    onSubmitButton: (data: IGame) => void;
};

const AddGame = (props: Props) => {
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [releaseYearError, setReleaseYearError] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [genres, setGenres] = useState<string[]>([]);
    const [genresError, setGenresError] = useState("");
    const [rating, setRating] = useState("");
    const [ratingError, setRatingError] = useState("");
    const [image, setImage] = useState(require("../../assets/placeholder.png"));

    const validateTitle = () => {
        if (!title.trim()) {
            setTitleError("Title is required!");
            return false;
        }
        setTitleError("");
        return true;
    };

    const validateReleaseYear = () => {
        if (!releaseYear.trim()) {
            setReleaseYearError("Release year is required!");
            return false;
        }
        if (isNaN(Number(releaseYear))) {
            setReleaseYearError("Release year must be a number!");
            return false;
        }
        setReleaseYearError("");
        return true;
    };

    const validateDescription = () => {
        if (!description.trim()) {
            setDescriptionError("Description is required!");
            return false;
        }
        setDescriptionError("");
        return true;
    };

    const validateGenres = () => {
        if (genres.length === 0) {
            setGenresError("At least one genre must be specified!");
            return false;
        }
        setGenresError("");
        return true;
    };

    const validateRating = () => {
        if (!rating.trim()) {
            setRatingError("Rating is required!");
            return false;
        }
        if (isNaN(Number(rating))) {
            setRatingError("Rating must be a number!");
            return false;
        }
        setRatingError("");
        return true;
    };

    const validateData = () => {
        return validateTitle() && validateReleaseYear() && validateGenres() && validateDescription()  && validateRating();
    }

    const isGameDuplicate = (gameList: IGame[], name: string, releaseYear: number): boolean => {
        // Check if any game in the list matches the given name and release year
        return gameList.some(game => game.title === name && game.releaseYear === releaseYear);
    };


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    setImage(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
        }

    const {onBackButton, onSubmitButton} = props

    const onTitleChanged = (e:any) => {
        setTitle(e.target.value)
    };

    const onDescriptionChanged = (e:any) => {
        setDescription(e.target.value)
    };

    const onReleaseYearChanged = (e:any) => {
        setReleaseYear(e.target.value)
    };

    const onGenresChanged = (e:any) => {
        const isChecked = e.target.checked;
        const genre = e.target.value;

        if (isChecked) {
            setGenres((prevGenres) => [...prevGenres, genre]);
        } else {
            setGenres((prevGenres) => prevGenres.filter((g) => g !== genre));
        }
    };

    const onRatingChanged = (e:any) => {
        setRating(e.target.value)
    };

    const getNextAvailableId = () => {
        const storedGames = localStorage.getItem('Games');
        if (storedGames) {
            const games = JSON.parse(storedGames);
            const maxId = Math.max(...games.map((game: { id: number; }) => game.id));
            return maxId + 1;
        } else {
            return 1;
        }
    };


    const onSubmitButtonClick = (e:any) => {
        e.preventDefault();
        if (validateData()) {
            const data: IGame = {
                id: getNextAvailableId(),
                title: title,
                description: description,
                releaseYear: Number(releaseYear),
                genres: genres,
                rating: Number(rating),
                image: image
            }
            onSubmitButton(data);
            onBackButton();
        }
    };

    return (
        <>
            <div className="container-form">
                <div className="add-game-title">Add a new game</div>
                <form onSubmit={onSubmitButtonClick}>
                    <div className="inputs">
                    <div className="write-input">
                        <div className="input-box-title">
                            <label htmlFor="title-input">Title</label>
                            <textarea id="title-input" className="title-input" name="title" value={title}
                                      onChange={onTitleChanged} onBlur={validateTitle}/>
                            <div className="error-container">
                                {titleError && <div className="error">{titleError}</div>}
                            </div>
                        </div>
                        <div className="input-box-title">
                            <label htmlFor="description-input">Description</label>
                        <textarea id="description-input" value={description} maxLength={220}
                                  onChange={onDescriptionChanged} onBlur={validateDescription}
                                  placeholder="A good description summarizes the game's theme, genre, and special features without being opinionated."
                                  className="description-input"/>
                        {descriptionError && <div className="error">{descriptionError}</div>}
                    </div>
                    <div className="input-box-title">
                        <label htmlFor="genres-checkboxes">Genres</label>
                        <div className="genres-checkboxes">
                            {Genres.map((genre) => {
                                return (
                                    <label className="checkbox-label">
                                        <input className="checkbox"
                                            type="checkbox"
                                            value={genre} onBlur={validateGenres}
                                            onChange={onGenresChanged}
                                            checked={genres.includes(genre)}
                                        />
                                        {genre}
                                    </label>
                                )
                            })}

                        </div>
                        {genresError && <div className="error">{genresError}</div>}
                    </div>
                    <div className="year-rating-flex">
                        <div className="input-box-title">
                            <label htmlFor="release-year-input">Release Year</label>
                            <textarea id="release-year-input" value={releaseYear} onChange={onReleaseYearChanged}
                                      onBlur={validateReleaseYear} className="release-year-input"/>
                            {releaseYearError && <div className="error">{releaseYearError}</div>}
                        </div>
                        <div className="input-box-title">
                            <label htmlFor="rating-input">Rating</label>
                            <textarea id="rating-input" value={rating} onChange={onRatingChanged} onBlur={validateRating}
                                      className="release-year-input"/>
                            {ratingError && <div className="error">{ratingError}</div>}
                        </div>
                    </div>
                    </div>
                        <div className="image-upload-container">
                            <div className="input-box-title">
                                <label>Game Cover</label>
                                <img src={image} alt="" id="preview-image"/>
                                <input type="file" className="file-input" onChange={handleFileChange} accept="image/*"/>
                            </div>
                        </div>
                    </div>
                    <div className="final-buttons">
                    <input type="button" className="back-button" onClick={onBackButton} value="Back"/>
                        <input type="submit" className="submit-button" value="Add Game"/>
                    </div>
                </form>
            </div>

        </>
    )
}

export default AddGame;