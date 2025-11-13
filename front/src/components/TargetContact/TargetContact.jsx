import styles from "./TargetContact.module.css";

const TargetContact = () => {
    return (
        <div className={styles.card}>
            <div className={styles.imageSection}>
                <img 
                    src="/images/foto-Doctora.jpg" 
                    alt="Odontóloga" 
                    className={styles.photo}
                />
            </div>
            
            <div className={styles.infoSection}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Odontóloga</h2>
                    <h3 className={styles.subtitle}>Dra. Tatiana Andrea Leiva</h3>
                    <p className={styles.tagline}>Cuidando tu sonrisa</p>
                </div>
                
                <div className={styles.details}>
                    <div className={styles.infoItem}>
                        <span className={styles.icon}>📍</span>
                        <p>Cra 14 # 8-45 centro odontológico del Quindío consultorio 202, Armenia.Quindio</p>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <span className={styles.icon}>📞</span>
                        <p>+57 312 7226161</p>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <span className={styles.icon}>✉️</span>
                        <p>thatt02@hotmail.com</p>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <span className={styles.icon}>ⓕ</span>
                        <a 
                            href="https://www.facebook.com/profile.php?id=100054452380706" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            @Dra. Tatiana Andrea Leiva Odontóloga
                        </a>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <span className={styles.icon}>🕐</span>
                        <div>
                            <p>Lunes - Viernes: 8:00 AM - 6:00 PM </p>
                            <p>Sabados: 8:00 AM - 12:00M</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TargetContact;
