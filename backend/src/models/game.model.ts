import { InferSchemaType, Schema, model } from "mongoose"

const gameSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'ID is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title must be at least 3 characters long']
    },
    releaseYear: {
        type: Number,
        required: [true, 'Release year is required'],
        min: [1958, 'Release year must be 1958 or later'],
        max: [2024, 'Release year cannot be later than 2024']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [220, 'Description cannot exceed 220 characters']
    },
    genres: {
        type: [String],
        required: [true, 'Genres are required'],
        validate: {
            validator: function (value: string[]) {
                return value.length <= 6;
            },
            message: 'Maximum allowed number of genres is 6'
        }
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating cannot be greater than 10']
    },
    image: {
        type: String,
        required: [true, 'Rating is required'],
    }
});

type Game = InferSchemaType<typeof gameSchema>

export default model<Game>("Game", gameSchema);