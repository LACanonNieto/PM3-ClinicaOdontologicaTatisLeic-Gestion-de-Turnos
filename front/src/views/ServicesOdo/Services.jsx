import styles from "./Services.module.css";
import TypeService from "../../components/TypesService/TypeService";

const Services = () => {
    const services = [
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

    return (
        <main className={styles.servicesContainer}>
            <h1 className={styles.mainTitle}>NUESTROS SERVICIOS</h1>
            
            <div className={styles.contentWrapper}>
                <div className={styles.servicesList}>
                    {services.map((service, index) => (
                        <TypeService key={index} service={service} />
                    ))}
                </div>
                
                <div className={styles.imageCircle}>
                    <img 
                        src="/images/foto-Servicios.jpg" 
                        alt="Doctora Odontóloga" 
                        className={styles.doctorImage}
                    />
                </div>
            </div>
            
            <div className={styles.ctaSection}>
            <a href="/register">
                <button className={styles.ctaButton}>¡Reserva tu cita!</button>
            </a>
            </div>
        </main>
    );
};

export default Services;
