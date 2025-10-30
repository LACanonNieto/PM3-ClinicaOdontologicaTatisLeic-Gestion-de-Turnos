import { Request, Response } from "express";
// import { } from "../services/userService";

//Get/ users => obtener todos los usuarios
//Get/ users/ :id =>obtener usuario por ID
//post/users/ register => crear un nuevo usuario y se logee

export const getUsers = async (req: Request, res: Response) => {
    res.send("Obtener el listado de todos los usuarios")
}

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    res.send("Obtener el detalle de un usuario específico por ID")
}

export const registerUser = async (req: Request, res: Response) => {
    res.send("Registro de un nuevo usuario")
}
export const loginUser = async (req: Request, res: Response) => {
    res.send("Login del usuario a la aplicación")
}
