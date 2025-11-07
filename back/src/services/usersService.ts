import UserDto from "../dto/UserDto";
import UserRepository from "../repositories/UserRepository";
import { User } from "../entities/User";
import { createCredentialsService, validateCredentialsService } from "./credentialsService";
import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credential";

export const getAllUsersService = async (): Promise<User[]> => {
    const users = await UserRepository.find({
    relations: {
        appointments: true
    }
});
    return users;
};

export const getUserByIdService = async (id: number): Promise<User> => {
    const foundUser: User | null = await UserRepository.findOne({
        where: { id },
        relations: {
            appointments: true
        }
    });
    if (!foundUser) {
        throw new Error("Usuario no encontrado");
    }
    return foundUser;
};

export const createUserService = async (userData: UserDto,username: string,password: string
): Promise<User> => {
    const resultUser: User = await AppDataSource.transaction(async (entityManager) => {
        const newCredentials: Credential = await createCredentialsService(
            entityManager,
            username,
            password
        );
    const newUser: User = entityManager.create(User, {
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credentials: newCredentials
    });

    const results = await entityManager.save(User, newUser);
        return results;
});
return resultUser;
};

export const loginUserService = async (
    username: string, 
    password: string
): Promise<User> => {
    const credentialId = await validateCredentialsService(username, password);
    
    const foundUser: User | null = await UserRepository.findOne({
        where: {
            credentials: {
                id: credentialId,
            },
        },
    });
    
    if (!foundUser) {
        throw new Error("Usuario no encontrado");
    }
    
    return foundUser;
};
