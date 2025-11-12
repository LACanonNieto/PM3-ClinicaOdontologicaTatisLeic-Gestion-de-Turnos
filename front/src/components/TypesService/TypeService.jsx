import styles from "./TypeService.module.css";
import { FaCheck } from "react-icons/fa";

const TypeService = ({ service }) => {
    return (
        <div className={styles.serviceItem}>
            <div className={styles.iconWrapper}>
                <FaCheck className={styles.icon} />
            </div>
            <span className={styles.serviceName}>{service}</span>
        </div>
    );
};

export default TypeService;
