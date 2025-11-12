import { useState } from "react";
import styles from "./FormAppointments.module.css";
import axios from "axios";
import { createPortal} from "react-dom";
import { validateDate, validateSubject, validateTime} from "../../helpers/validateAppointments";
import Swal from "sweetalert2";

const FormAppointments = ({userId, onClose, onSuccess}) => {
    const [formData, setFormData] = useState({
        date: "", 
        time: "",
        subject: "",
    });
    const [errors, setErrors] = useState({
        date: "",
        time: "",
        subject: "",
        general: ""
    });
    const [loading, setLoading] = useState(false);
    
const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({
        ...formData,
        [name]: value
        });

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let fieldError = "";

        switch (name) {
            case "date":
                fieldError = validateDate(value).error;
                break;
            case "time":
                fieldError = validateTime(value).error;
                break;
            case "subject":
                fieldError = validateSubject(value).error;
                break;
            default:
                break;
        }

        setErrors({
            ...errors,
            [name]: fieldError
        });
    };

const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.date || !formData.time || !formData.subject) {
        await Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Por favor completa todos los campos",
            confirmButtonColor: "hsl(266, 79%, 34%)"
        });
        return;
    }

    if (errors.date || errors.time || errors.subject) {
        await Swal.fire({
            icon: "warning",
            title: "Errores en el formulario",
            text: "Por favor corrige los errores antes de continuar",
            confirmButtonColor: "hsl(266, 79%, 34%)"
        });
        return;
    }

    setLoading(true);

    try {
        const response = await axios.post("http://localhost:3312/appointments/schedule", {
            date: formData.date,
            time: formData.time,
            subject: formData.subject,
            userId: userId
        });

        setFormData({
            date: "",
            time: "",
            subject: ""
        });

        setErrors({
            date: "",
            time: "",
            subject: "",
            general: ""
        });

        await Swal.fire({
            icon: "success",
            title: "¡Turno agendado!",
            text: "Tu turno ha sido creado exitosamente",
            confirmButtonColor: "hsl(266, 79%, 34%)",
            timer: 2000,
            timerProgressBar: true
        });

        if (onSuccess) {
            onSuccess(response.data);
        }

        if (onClose) {
            onClose();
        }
    } catch (err) {
        await Swal.fire({
            icon: "error",
            title: "Error al agendar",
            text: err.response?.data?.message || "Error al agendar el turno",
            confirmButtonColor: "hsl(266, 79%, 34%)"
        });
    } finally {
        setLoading(false);
    }
};

const hours =[
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
];

const typeServices =[
        "Diagnóstico y prevención",
        "Tratamiento de caries",
        "Endodoncia",
        "Periodoncia",
        "Rehabilitación oral",
        "Odontología estética",
        "Odontopediatría",
        "Cirugía bucal",
        "Implantología"
];

    return createPortal (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    ✕
                </button>

                <h2 className={styles.title}>Agendar Nuevo Turno</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {errors.general && (
                        <div className={styles.errorGeneral}>{errors.general}</div>
                    )}

                    <div className={styles.formGroup}>
                        <label htmlFor="date">Fecha:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            required
                            className={errors.date ? styles.inputError : ""}
                        />
                        {errors.date && (
                            <span className={styles.errorMessage}>{errors.date}</span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="time">Hora:</label>
                        <select
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            className={errors.time ? styles.inputError : ""}
                        >
                            <option value="">Selecciona una hora</option>
                            {hours.map(h => <option key={h} value={h}>{h}</option>)}
                        </select>

                        <small>Horario: Lun–Vie 8:00–18:00 / Sáb 8:00–12:00</small>
                        {errors.time && <span className={styles.errorMessage}>{errors.time}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="subject">Motivo de la consulta:</label>
                        <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className={errors.subject ? styles.inputError : ""}
                        >
                            <option value="">Selecciona un servicio</option>
                            {typeServices.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.subject && <span className={styles.errorMessage}>{errors.subject}</span>}
                    </div>

                    <div className={styles.buttonGroup}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={styles.cancelButton}
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={loading}
                        >
                            {loading ? "Agendando..." : "Agendar Turno"}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default FormAppointments;
