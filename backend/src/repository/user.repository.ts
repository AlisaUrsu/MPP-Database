import { User } from "../models/user";
import UserModel from "../models/user.model";

export class UserRepository {
    constructor(){}

    async addUser(user: User): Promise<User> {
        const newUser = new UserModel(user);
        await newUser.save();
        return newUser;
    }

    async updateUser(updatedUser: User): Promise<User> {
        const user = await UserModel.findOne({username: updatedUser.username});
        if (!user) {
            throw new Error("User not found");
        }
        Object.assign(user, updatedUser);
        await user.save();
        return user;
    }

    async deleteUser(username: string): Promise<void> {
        await UserModel.findOneAndDelete({username: username});
    }

    async getAllUsers(): Promise<User[]> {
        return await UserModel.find({});
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return await UserModel.findOne({username: username});
    }

}