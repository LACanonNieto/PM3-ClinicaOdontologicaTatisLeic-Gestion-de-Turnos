import styles from "./Contact.module.css";
import TargetContact from "../../components/TargetContact/TargetContact";

const Contact = () => {
    return (
        <main className={styles.contactContainer}>
            <h1 className={styles.title}>Contáctanos</h1>
            <p className={styles.subtitle}>
                Estamos aquí para atenderte. Agenda tu cita o contáctanos para más información.
            </p>
            <TargetContact />
        </main>
    );
};

export default Contact;
