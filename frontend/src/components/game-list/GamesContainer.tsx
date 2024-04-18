import "../Games";
import "./GamesContainer.styles.css"
import {IGame} from "../Games.type";
import DeleteGameModal from "../game-delete/DeleteGameModal";
import {useState} from "react";
import {sortDecreaseGamesByTitle} from "../Service";


type Props = {
    list: IGame[];
    onDeleteButton: (data: IGame) => void;
    onUpdateButton: (data: IGame) => void;
};
const GamesContainer = (props: Props) => {
    const {list, onDeleteButton, onUpdateButton} = props;
    const [showModal, setShowModal] = useState(false);
    const [gameToDelete, setGameToDelete] = useState<IGame |null>(null)

    const openModal = (data: IGame) => {
        setGameToDelete(data);
        setShowModal(true);

    }

    const closeModal = () => {
        setShowModal(false);
        setGameToDelete(null);
    }

    const handleDelete = () => {
        if (gameToDelete) {
            onDeleteButton(gameToDelete);
            closeModal();
        }
    }
    function ExtractImageName(address: string) {
        return address.split("/").slice(-1);
      }

    return (
        <>
            <div className="container">
                {list.map((game) => {
                    return (
                        <>
                <div className="game" data-testid="game" key={game.id}>
                    <img src={game.image} alt=""/>
                                <div className="game-details">
                                    <div className="game-title">{game.title}</div>
                                    <div className="game-release">{game.releaseYear}</div>
                                    <div className="game-description">{game.description}</div>
                                    <div className="game-genres">Genres: {game.genres.join(", ")}</div>
                                    <div className="game-rating"><i className="fas fa-star"></i>{game.rating}</div>
                                </div>
                                <div className="game-buttons">
                                    <button className="game-button" data-testid="edit-button" value="edit" onClick={() => onUpdateButton(game)}><i className="far fa-edit"></i></button>
                                    <button className="game-button" data-testid="delete-button" value="delete" onClick={() => openModal(game)}><i className="far fa-trash-alt"></i></button>
                                </div>
                </div>
                        </>);
                })}
            </div>
            {showModal && (<DeleteGameModal onCancelButton={closeModal} onDeleteButton={handleDelete}/>)}

        </>
    )
}

export default GamesContainer;