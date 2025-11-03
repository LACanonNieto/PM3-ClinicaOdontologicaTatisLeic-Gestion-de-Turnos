import { AppointmentModel, UserModel } from "../config/data-source";
import AppointmentDto from "../dto/AppointmentDto";
import { Appointment, AppointmentStatus } from "../entities/Appointments";

export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
    const appointments = await AppointmentModel.find({
        relations: {
            user:true
        }
    });
    return appointments;
};

export const getAppointmentByIdService = async (id: number): Promise<Appointment| null> => {
    const appointment = await AppointmentModel.findOne({
        where: { id },
        relations: {
            user: true
        }
    });
    return appointment;
};

export const createAppointmentService = async (appointmentData: AppointmentDto): Promise<Appointment>  => {
    const user = await UserModel.findOneBy({
        id: appointmentData.userId
    });
    if (!user){
        throw new Error("Usuario no encontrado");
    }
    const newAppointment = AppointmentModel.create({
        date: appointmentData.date,
        time: appointmentData.time,
        user: user,
        status: AppointmentStatus.ACTIVE
    });
    await AppointmentModel.save(newAppointment);
    return newAppointment;
};

export const cancelAppointmentService = async (id: number): Promise<Appointment | null> => {
    const appointment = await AppointmentModel.findOneBy ({ id });
    
    if (!appointment) {
        return null;
    }
    
    if (appointment.status === AppointmentStatus.CANCELLED){
        throw new Error("El turno ya está cancelado");
    }
    
    appointment.status = AppointmentStatus.CANCELLED;
    await AppointmentModel.save(appointment);
    return appointment;
};

export const getAppointmentsByUserIdService = async (userId: number) : Promise<Appointment[]> => {
    const appointments = await AppointmentModel.find({
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
