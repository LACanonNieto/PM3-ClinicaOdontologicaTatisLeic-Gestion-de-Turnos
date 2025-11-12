import React from "react";
import styles from "./AppointmentCard.module.css"

const AppointmentCard = ({ appointment, onCancel }) => {
    const handleCancelClick = () => {

        if (appointment.status.toLowerCase() !== "cancelled") {
            onCancel(appointment.id);
        }
    };

    return (
    <div className={styles.row}>
        <span className={styles.status}>{appointment.status}</span>
        <span className={styles.date}>{appointment.date}</span>
        <span className={styles.time}>{appointment.time}</span>
        <span className={styles.subject}>{appointment.subject}</span>
        <div className={styles.actionCell}>
        <button
            className={`${styles.actionBtn} ${
            appointment.status === "Cancelled" ? styles.disabledBtn : ""
            }`}
            onClick={handleCancelClick}
            disabled={appointment.status === "Cancelled"}
        >
            {appointment.status.toLowerCase() === "cancelled" ? "Cancelado" : "Cancelar"}
        </button>
        </div>
    </div>
    );
};

export default AppointmentCard;
