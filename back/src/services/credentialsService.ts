import { CredentialModel } from "../config/data-source";
import CredentialDto from "../dto/CredentialDto";
import { Credential } from "../entities/Credentials";

export const createCredentialsService = async (credentialData: CredentialDto): Promise<Credential>  => {
    const newCredential= CredentialModel.create(credentialData);
    await CredentialModel.save(newCredential);
    return newCredential;
};

export const validateCredentialsService = async (username: string, password: string): Promise<Credential | null> => {
    const credential = await CredentialModel.findOneBy({
        username,
        password
    }
    );
    return credential;
};

export const getCredentialByIdService = async (id: number): Promise<Credential| null> => {
    const credential = await CredentialModel.findOneBy({ id });
    return credential;
};
