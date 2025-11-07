import Logo from "../../assets/Logo.png"
import styles from "./Navbar.module.css"
import ProfileLogin from "../ProfileLogin/ProfileLogin"

const Navbar = () =>{
    return(
        <header className={styles.header}>
            <div>
                <img src={Logo} className={styles.Logo} alt="Logo odo" />
            </div>
            <div className={styles.ItemsNav}>
            <span className={styles.OptionsNav}>INICIO</span>
            <span className={styles.OptionsNav}>SERVICIOS</span>
            <span className={styles.OptionsNav}>MIS TURNOS</span>
            <span className={styles.OptionsNav}>CONTACTO</span>
            <ProfileLogin/>
            </div>
        </header>
    )
};

export default Navbar;