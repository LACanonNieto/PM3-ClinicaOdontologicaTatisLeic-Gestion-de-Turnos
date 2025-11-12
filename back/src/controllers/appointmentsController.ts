import { Request, Response } from "express";
import { 
    createAppointmentService, 
    getAllAppointmentsService,
    getAppointmentByIdService,
    cancelAppointmentService,
    getAppointmentsByUserIdService
} from "../services/appointmentsService";
import { getUserByIdService } from "../services/usersService";

export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await getAllAppointmentsService();
        res.status(200).json(appointments);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAppointmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const appointment = await getAppointmentByIdService(Number(id));
        
        if (!appointment) {
            return res.status(404).json({ message: "Turno no encontrado" });
        }
        
        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const { date, time, userId, subject } = req.body;
        
        const user = await getUserByIdService(userId);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        
        // ✅ Validar que date existe
        if (!date) {
            return res.status(400).json({ error: "La fecha es requerida" });
        }
        
        // ✅ Manejar el string de fecha directamente
        let localDate: Date;
        
        if (typeof date === 'string') {
            // Si viene como string "YYYY-MM-DD"
            const dateParts = date.split('-');
            
            if (dateParts.length !== 3 || !dateParts[0] || !dateParts[1] || !dateParts[2]) {
                return res.status(400).json({ error: "Formato de fecha inválido" });
            }
            
            const year: number = Number(dateParts[0]);
            const month: number = Number(dateParts[1]);
            const day: number = Number(dateParts[2]);
            
            // ✅ Validar que los valores sean números válidos
            if (isNaN(year) || isNaN(month) || isNaN(day)) {
                return res.status(400).json({ error: "Formato de fecha inválido" });
            }
            
            localDate = new Date(year, month - 1, day);
        } else {
            // Si viene como objeto Date
            localDate = new Date(date);
        }
        
        const newAppointment = await createAppointmentService({
            date: localDate, 
            time,
            userId,
            subject
        });
        
        res.status(201).json(newAppointment);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const cancelAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const appointment = await cancelAppointmentService(Number(id));
        
        if (!appointment) {
            return res.status(404).json({ message: "Turno no encontrado" });
        }
        
        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAppointmentsByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const appointments = await getAppointmentsByUserIdService(Number(userId));
        res.status(200).json(appointments);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
