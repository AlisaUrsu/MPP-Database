import { InferSchemaType, Schema, model } from "mongoose";

const developerSchema = new Schema({
    id: {
        type: Number,
        required: [true, 'ID is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    establishYear: {
        type: Number,
        required: [true, 'Establish year is required'],
        max: [new Date().getFullYear(), 'Establish year cannot be later than current year']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    activity: {
        type: String,
        required: [true, 'Activity is required']
    }
});

type Developer = InferSchemaType<typeof developerSchema>

export default model<Developer>("Developer", developerSchema);