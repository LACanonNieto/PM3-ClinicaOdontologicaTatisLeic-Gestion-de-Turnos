import { Request, Response } from "express";
import { getAllUsersService, 
    getUserByIdService,
    createUserService,
    findUserByCredentialsIdService
} from "../services/usersService";
import { validateCredentialsService } from "../services/credentialsService";
import { User } from "../entities/User";


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users: User[] =  await getAllUsersService();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }    
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } =  req.params;
        const user: User | null = await getUserByIdService(Number(id));

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        const newUser: User = await createUserService({
                name,
                email,
                birthdate: new Date(birthdate),
                nDni
            },
            username,
            password
        );
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const credential = await validateCredentialsService(username, password);
        if (!credential) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }
        const user = await findUserByCredentialsIdService(credential.id);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json({ 
            message: "Login exitoso",
            user 
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
