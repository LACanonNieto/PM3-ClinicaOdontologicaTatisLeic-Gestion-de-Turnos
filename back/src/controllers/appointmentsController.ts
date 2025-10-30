import { Request, Response } from "express";
// import { } from "../services/userService";


export const getAppointments = async (req: Request, res: Response) => {
    res.send("Obtener el listado de todos los turnos de todos los usuarios")
}

export const getAppointmentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    res.send("Obtener el detalle de un turno específico por ID")
}

export const scheduleAppointment = async (req: Request, res: Response) => {
    res.send("Agendar un nuevo turno")
}
export const cancelAppointment = async (req: Request, res: Response) => {
    res.send("Cambiar el estatus de un turno a “cancelled")
}
