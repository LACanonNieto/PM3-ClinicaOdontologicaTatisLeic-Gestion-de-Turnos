import { CredentialModel, UserModel } from "../config/data-source";
import UserDto from "../dto/UserDto";
import { Credential } from "../entities/Credentials";
import { User } from "../entities/User";
import { createCredentialsService } from "./credentialsService";

export const getAllUsersService = async (): Promise<User[]> => {
    const users = await UserModel.find({
    relations: {
        credentials: true,
        appointments: true
    }
});
    return users;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
    const user = await UserModel.findOne({
        where: { id },
        relations: {
            credentials: true,
            appointments: true
        }
    });
    return user;
};

export const createUserService = async (userData: UserDto, username: string, password: string): Promise<User> => {
    const newCredentials = await createCredentialsService({username, password});

    const newUser = UserModel.create({
        ...userData,
        credentials: newCredentials
    });
    await UserModel.save(newUser);
    return newUser;
};

export const findUserByCredentialsIdService = async (credentialsId: number) : Promise<User| null> => {
    const user = await UserModel.findOne({
        where:{
            credentials: {
                id: credentialsId
            }
        },
        relations: {
            credentials: true
        }
    });
    return user;
};
