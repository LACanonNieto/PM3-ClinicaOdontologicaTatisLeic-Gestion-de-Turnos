import { Request, Response } from "express";
import { getAllUsersService, 
    getUserByIdService,
    createUserService,
    loginUserService
} from "../services/usersService";
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
        const user= await getUserByIdService(Number(id));
        res.status(200).json(user);     
    } catch (error: any) {
        if (error.message === "Usuario no encontrado"){
            return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
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
        res.status(400).json({ message: error.message });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await loginUserService(username, password);
        res.status(200).json({ 
            message: "Login exitoso",
            user 
        });
    } catch (error: any) {
        if (error.message === "No existe el username" || 
            error.message === "Contraseña incorrecta" ||
            error.message === "Usuario no encontrado") {
            return res.status(400).json({
                message: error.message
            });
        }
        res.status(500).json({
            message: error.message
        });
    }
};
