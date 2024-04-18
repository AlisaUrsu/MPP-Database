export class Game {
    id: number;
    title: string;
    releaseYear: number;
    description: string;
    genres: string[];
    rating: number;
    image?: string;

    constructor(id: number, title: string, releaseYear: number, description: string, genres: string[], rating: number, image: string) {
        this.id = id;
        this.title = title;
        this.releaseYear = releaseYear;
        this.description = description;
        this.genres = genres;
        this.rating = rating;
        this.image = image;
    }
}