import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";
import AppointmentDto from "../dto/AppointmentDto";
import { Appointment, AppointmentStatus } from "../entities/Appointment";

const festivosColombia2025 = [
    "2025-01-01", "2025-01-06", "2025-03-24", "2025-04-17", "2025-04-18",
    "2025-05-01", "2025-06-02", "2025-06-23", "2025-06-30", "2025-07-20",
    "2025-08-07", "2025-08-18", "2025-10-13", "2025-11-03", "2025-11-17",
    "2025-12-08", "2025-12-25"
];

export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
    const appointments = await AppointmentRepository.find({
        relations: { user: true }
    });
    return appointments;
};

export const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {
    const appointment = await AppointmentRepository.findOne({
        where: { id },
        relations: { user: true }
    });
    return appointment;
};

export const createAppointmentService = async (
    appointmentData: AppointmentDto
): Promise<Appointment> => {
    const user = await UserRepository.findOneBy({
        id: appointmentData.userId
    });
    
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    if (!appointmentData.date) {
        throw new Error("La fecha es requerida");
    }
    
    if (!appointmentData.time) {
        throw new Error("La hora es requerida");
    }
    
    if (!appointmentData.subject) {
        throw new Error("El motivo es requerido");
    }
    
    const localDate = appointmentData.date;

    const dayOfWeek = localDate.getDay();
    const year = localDate.getFullYear();
    const month = localDate.getMonth() + 1;
    const day = localDate.getDate();
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    if (dayOfWeek === 0) {
        throw new Error("No se pueden agendar turnos los domingos");
    }
    
    if (festivosColombia2025.includes(dateStr)) {
        throw new Error("No se pueden agendar turnos en días festivos");
    }

if (dayOfWeek === 6) {
    const timeParts = appointmentData.time.split(':');
    

    if (timeParts.length !== 2) {
        throw new Error("Formato de hora inválido");
    }
    
    const hoursStr = timeParts[0];
    const minutesStr = timeParts[1];

    if (!hoursStr || !minutesStr) {
        throw new Error("Formato de hora inválido");
    }
    
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    
    if (isNaN(hours) || isNaN(minutes)) {
        throw new Error("Formato de hora inválido");
    }
    
    const timeInMinutes = hours * 60 + minutes;
    

    if (timeInMinutes >= 12 * 60) {
        throw new Error("Los sábados solo se atiende hasta las 12:00");
    }
}
    
    const newAppointment = AppointmentRepository.create({
        date: localDate,
        time: appointmentData.time,
        subject: appointmentData.subject,
        user: user,
        status: AppointmentStatus.ACTIVE
    });
    
    await AppointmentRepository.save(newAppointment);
    return newAppointment;
};

export const cancelAppointmentService = async (id: number): Promise<Appointment | null> => {
    const appointment = await AppointmentRepository.findOneBy({ id });
    
    if (!appointment) {
        throw new Error("Turno no encontrado");
    }
    
    if (appointment.status === AppointmentStatus.CANCELLED) {
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

export const getAppointmentsByUserIdService = async (userId: number): Promise<Appointment[]> => {
    const appointments = await AppointmentRepository.find({
        where: { user: { id: userId } },
        relations: { user: true }
    });
    return appointments;
};
