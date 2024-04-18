import { InferSchemaType, Schema, model } from "mongoose";

const gameMediaSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'GameMedia ID is required']
    },
    gameId: {
        type: Number,
        ref: "Game",
        required: [true, 'Game ID is required']
    },
    mediaType: {
        type: String,
        required: [true, 'Media type is required'],
        enum: ['screenshot', 'video', 'artwork', 'trailer', 'other']
    },
    url: {
        type: String,
        required: [true, 'URL is required']
    }
});

type GameMedia = InferSchemaType<typeof gameMediaSchema>;

export default model<GameMedia>("GameMedia", gameMediaSchema);
