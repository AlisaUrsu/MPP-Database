import { InferSchemaType, Schema, model, Types } from "mongoose";

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["user", "admin"]
    }
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);