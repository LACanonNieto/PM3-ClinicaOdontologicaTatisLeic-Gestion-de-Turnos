import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";
import AppointmentDto from "../dto/AppointmentDto";
import { Appointment, AppointmentStatus } from "../entities/Appointment";

export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
    const appointments = await AppointmentRepository.find({
        relations: {
            user:true
        }
    });
    return appointments;
};

export const getAppointmentByIdService = async (id: number): Promise<Appointment| null> => {
    const appointment = await AppointmentRepository.findOne({
        where: { id },
        relations: {
            user: true
        }
    });
    return appointment;
};

export const createAppointmentService = async (appointmentData: AppointmentDto): Promise<Appointment>  => {
    const user = await UserRepository.findOneBy({
        id: appointmentData.userId
    });
    if (!user){
        throw new Error("Usuario no encontrado");
    }
    const newAppointment = AppointmentRepository.create({
        date: appointmentData.date,
        time: appointmentData.time,
        subject: appointmentData.subject,
        user: user,
        status: AppointmentStatus.ACTIVE
    });
    await AppointmentRepository.save(newAppointment);
    return newAppointment;
};

export const cancelAppointmentService = async (id: number): Promise<Appointment | null> => {
    const appointment = await AppointmentRepository.findOneBy ({ id });
    
    if (!appointment) {
        throw new Error("Turno no encontrado");
    }
    
    if (appointment.status === AppointmentStatus.CANCELLED){
        throw new Error("El turno ya está cancelado previamente");
    }

    const now = new Date();
    if (new Date(appointment.date) < now) {
        throw new Error("No se puede cancelar un turno que ya ha pasado");
    }

    appointment.status = AppointmentStatus.CANCELLED;
    await AppointmentRepository.save(appointment);
    return appointment;
};

export const getAppointmentsByUserIdService = async (userId: number) : Promise<Appointment[]> => {
    const appointments = await AppointmentRepository.find({
        where: {
            user: {
                id: userId
            }
        },
        relations: {
            user: true
        }
    });
    return appointments;
};
