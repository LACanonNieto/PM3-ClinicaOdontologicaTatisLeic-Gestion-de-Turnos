import { Request, Response } from "express";
import {getAllAppointmentsService,
getAppointmentByIdService,
createAppointmentService,
cancelAppointmentService,
} from "../services/appointmentsService";
import { getUserByIdService } from "../services/usersService";
import { Appointment} from "../entities/Appointment";


export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const Appointments: Appointment[] = await getAllAppointmentsService();
        res.status(200).json(Appointments);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAppointmentById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const appointment = await getAppointmentByIdService(Number(id));
        if (!appointment) {
            return res.status(404).json({ error: "Turno no encontrado" });
        }
        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createAppointment = async (req: Request, res: Response) => {  
    try {
        const { date, time, subject, userId } = req.body;
        const user = await getUserByIdService(userId);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        const newAppointment = await createAppointmentService({
            date: new Date(date),
            time,
            userId,
            subject,
        });
        res.status(201).json(newAppointment);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const cancelAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cancelledAppointment = await cancelAppointmentService(Number(id));
        res.status(200).json(cancelledAppointment);
    } catch (error: any) {
        if (error.message === "Turno no encontrado") {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === "El turno ya fue cancelado previamente" || 
            error.message === "No se puede cancelar un turno que ya ha pasado") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};
