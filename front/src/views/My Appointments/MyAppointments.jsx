import { useState } from "react";
import { appointmentsData } from "../../helpers/myAppointments";
import AppointmentCard from "../../AppointmentCard/AppointmentCard"
import styles from "./MyAppointments.module.css"

const MyAppointments = () => {
    const [appointments, setAppointments] = useState(appointmentsData);

    const handleCancel = (id) => {
    const updatedAppointments = appointments.map((appoint) =>
        appoint.id === id ? { ...appoint, status: "Cancelled" } : appoint
    );
    setAppointments(updatedAppointments);
    };

    return( 
    <main className={styles.AppointContainer}>
        <h2 className={styles.title}>Mis turnos</h2>

        <div className={styles.tableContainer}>
            <div className={styles.headerRow}>
                <span>Status</span>
                <span>Fecha</span>
                <span>Hora</span>
                <span>Asunto</span>
                <span>Acción</span>
            </div>

            <div className={styles.rowsContainer}>
                {appointments.map((appoint) => (
                    <AppointmentCard 
                    key={appoint.id} 
                    appointment = {appoint} 
                    onCancel={handleCancel}/>
                ))}
            </div>
        </div>
    </main>
    )
};
export default MyAppointments;
