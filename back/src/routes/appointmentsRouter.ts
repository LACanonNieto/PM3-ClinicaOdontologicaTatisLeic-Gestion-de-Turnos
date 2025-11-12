import { Router } from 'express';
import { getAllAppointments, 
    getAppointmentById, 
    createAppointment, 
    cancelAppointment,
    getAppointmentsByUserId
} from '../controllers/appointmentsController';

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", getAllAppointments);
appointmentsRouter.get("/:id", getAppointmentById);
appointmentsRouter.post("/schedule", createAppointment);
appointmentsRouter.put("/cancel/:id", cancelAppointment);
appointmentsRouter.get("/user/:userId", getAppointmentsByUserId);

export default appointmentsRouter;
