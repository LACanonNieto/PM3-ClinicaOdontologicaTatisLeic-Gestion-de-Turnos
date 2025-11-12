import CredentialRepository from "../repositories/CredentialRepository";
import { Credential } from "../entities/Credential";
import { EntityManager } from "typeorm";
import bcrypt from "bcryptjs"

export const createCredentialsService = async (
    entityManager: EntityManager,
    username: string,
    password: string
): Promise<Credential>  => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCredentials: Credential = entityManager.create(Credential, {
        username,
        password: hashedPassword
    });
    const results = await entityManager.save(Credential, newCredentials);
    return results;
};

export const validateCredentialsService = async (
    username: string, 
    password: string
): Promise<number> => {
    const foundCredentials: null | Credential = await CredentialRepository.findOne({
        where: {
        username,
    },
});
    if (!foundCredentials){
        throw new Error( "❌ no existe el Usuario")
    }
    const isValid = await bcrypt.compare(password, foundCredentials.password);

    if (!isValid) {
        throw new Error("Contraseña incorrecta");
    }

    return foundCredentials.id;
};

export const getCredentialByIdService = async (id: number): Promise<Credential| null> => {
    const credential = await CredentialRepository.findOneBy({ id });
    return credential;
};
