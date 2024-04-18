export class GameMedia {
    id: number;
    gameId: number;
    mediaType: string;
    url: string;

    constructor(id: number, gameId: number, mediaType: string, url: string) {
        this.id = id;
        this.gameId = gameId;
        this.mediaType = mediaType;
        this.url = url;
    }
}