import { Router } from 'express';
import { getAppointments, 
    getAppointmentById, 
    scheduleAppointment, 
    cancelAppointment 
} from '../controllers/appointmentsController';

const router: Router = Router();

// GET/Turns => obtener todos los turnos
// GET/Turns/: id => obtener un turno por ID
//POST/ TURNS/ Schedule => crear un nuevo turno
// PUT//turns/ cancel => cancelar un turno

router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.post("/schedule", scheduleAppointment);
router.put("/cancel", cancelAppointment);

export default router;
