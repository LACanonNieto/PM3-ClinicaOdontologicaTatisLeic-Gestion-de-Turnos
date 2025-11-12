import Logo from "../../assets/Logo.png"
import styles from "./Navbar.module.css"
import ProfileLogin from "../ProfileLogin/ProfileLogin"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Navbar = () =>{
    const { user } = useContext(UserContext);

    return(
        <header className={styles.header}>
            <div>
            <Link to="/home">
                <img src={Logo} className={styles.Logo} alt="Logo odo" />
            </Link>
            </div>
            <div className={styles.ItemsNav}>
            <Link to="/home" className={styles.OptionsNav}>INICIO</Link>
            <Link to="/contact" className={styles.OptionsNav}>CONTACTO</Link>
            <Link to="/services" className={styles.OptionsNav}>SERVICIOS</Link>
            {user && (
            <Link to="/myAppointments" className={styles.OptionsNav}>MIS TURNOS
            </Link>
            )}
            <ProfileLogin/>
            </div>
        </header>
    )
};

export default Navbar;
