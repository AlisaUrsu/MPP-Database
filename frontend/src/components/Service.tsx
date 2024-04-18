import {IGame} from "./Games.type";

interface ServiceProps {
    gameList: IGame[];
}

export const sortDecreaseGamesByTitle = (list: IGame[]): IGame[] => {
    return [...list].sort((a, b) => b.title.localeCompare(a.title));
};

export const sortIncreaseGamesByTitle = (list: IGame[]): IGame[] => {
    return [...list].sort((a, b) => a.title.localeCompare(b.title));
};

export const sortIncreaseGamesByYear = (list: IGame[]): IGame[] => {
    return [...list].sort((a, b) => a.releaseYear - b.releaseYear);
};

export const sortDecreaseGamesByYear = (list: IGame[]): IGame[] => {
    return [...list].sort((a, b) => b.releaseYear - a.releaseYear);
};

export const sortIncreaseGamesByRating = (list: IGame[]): IGame[] => {
    return [...list].sort((a, b) => a.rating - b.rating);
};

export const sortDecreaseGamesByRating = (list: IGame[]): IGame[] => {
    return [...list].sort((a, b) => b.rating - a.rating);
};

export const sortIncreaseGamesByID = (list: IGame[]): IGame[] => {
    return [...list].sort((a, b) => a.id - b.id);
};