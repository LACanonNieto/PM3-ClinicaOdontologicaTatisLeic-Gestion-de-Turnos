import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import FormAppointments from "../../components/FormAppointments/FormAppointments";
import styles from "./MyAppointments.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const formatDate = (dateString) => {
    const [datePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year}`;
};


const sortAppointments = (appointments) =>{
    return[...appointments].sort(( a, b ) => {
if (a.status === 'active' && b.status === 'cancelled') return -1;
        if (a.status === 'cancelled' && b.status === 'active') return 1;
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
    });
};

const MyAppointments = () => {
    const { user, userAppointments, refreshAppointments, loading } = useContext(UserContext);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/home");
        }
    }, [user, navigate]);

    useEffect(() => {
    if (user?.id) {
        refreshAppointments();
    }
}, [user]);

    const handleCancelAppointment = async (appointmentId) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Deseas cancelar este turno?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7C3AED",
            cancelButtonColor: "#EF4444",
            confirmButtonText: "Sí, cancelar",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(`http://localhost:3312/appointments/cancel/${appointmentId}`);
                    await refreshAppointments();

                    Swal.fire({
                        title: "Cancelado",
                        text: "Tu turno ha sido cancelado correctamente.",
                        icon: "success",
                        confirmButtonColor: "#7C3AED",
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: error.response?.data?.message || "Hubo un problema al cancelar el turno.",
                        icon: "error",
                        confirmButtonColor: "#7C3AED",
                    });
                }
            }
        });
    };

const handleAppointmentCreated = async () => {
    await refreshAppointments();
};

    if (!user) {
        return null;
    }

    if (loading) {
        return <div className={styles.loading}>Cargando turnos...</div>;
    }

    return (
        <div className={styles.AppointContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Mis Turnos</h1>
                <button
                    className={styles.newAppointmentButton}
                    onClick={() => {
                        setShowForm(true);
                    }}
                >
                    + Nuevo Turno
                </button>
            </div>

            {userAppointments.length === 0 ? (
                <div className={styles.empty}>
                    <p>No tienes turnos agendados</p>
                    <button onClick={() => setShowForm(true)}>
                        Agendar mi primer turno
                    </button>
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Motivo</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortAppointments(userAppointments).map((appointment) => {
                                return (
                                    <tr key={appointment.id}>
                                        <td>{formatDate(appointment.date)}</td>
                                        <td>{appointment.time}</td>
                                        <td>{appointment.subject}</td>
                                        <td>
                                            <span
                                                className={`${styles.status} ${
                                                    appointment.status === "active"
                                                        ? styles.active
                                                        : styles.cancelled
                                                }`}
                                            >
                                                {appointment.status === "active" ? "Activo" : "Cancelado"}
                                            </span>
                                        </td>
                                        <td>
                                            {appointment.status === "active" && (
                                                <button
                                                    className={styles.cancelButton}
                                                    onClick={() => handleCancelAppointment(appointment.id)}
                                                >
                                                    Cancelar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {showForm && (
                <FormAppointments
                    userId={user.id}
                    onClose={() => setShowForm(false)}
                    onSuccess={handleAppointmentCreated}
                />
            )}
        </div>
    );
};

export default MyAppointments;
