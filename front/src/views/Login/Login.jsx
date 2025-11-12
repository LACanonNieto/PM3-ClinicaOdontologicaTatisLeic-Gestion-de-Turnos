import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { UserContext } from "../../context/UserContext";
import styles from "./Login.module.css";
import { validateLogin } from "../../helpers/validateLogin";
import Swal from "sweetalert2";

const Login = () => {
    const { login } = useContext(UserContext);
    const navigate = useNavigate(); 
    
    const [userData, setUserData] = useState({
        username: "", 
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleInputChange = ({ target: { name, value } }) => {
        const updatedUserData = {
            ...userData,
            [name]: value
        };
        setUserData(updatedUserData);
        setErrors(validateLogin(updatedUserData));
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validateLogin(userData);
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length > 0) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor completa todos los campos correctamente",
                confirmButtonColor: "hsl(266, 79%, 34%)"
            });
            return;
        }

        try {
            setIsSubmitting(true);

            const result = await login(userData.username, userData.password);
            
            if (result.success) {
                await Swal.fire({
                    icon: "success",
                    title: "¡Bienvenido!",
                    text: "Has iniciado sesión correctamente",
                    confirmButtonColor: "hsl(266, 79%, 34%)",
                    timer: 2000,
                    timerProgressBar: true
                });
                
                navigate("/myAppointments");
            } else {

                Swal.fire({
                    icon: "error",
                    title: "Error al iniciar sesión",
                    text: result.message,
                    confirmButtonColor: "hsl(266, 79%, 34%)"
                });
            }
        } catch (error) {

            console.error("Error inesperado:", error);
            
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un error inesperado. Por favor intenta de nuevo.",
                confirmButtonColor: "hsl(266, 79%, 34%)"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormInvalid = 
        !userData.username || 
        !userData.password || 
        Object.keys(errors).length > 0;

    return (
        <div className={styles.container}>
            <form onSubmit={handleOnSubmit} className={styles.form}>
                <h2 className={styles.title}>LOGIN</h2>
                
                <div className={styles.inputGroup}>
                    <label>Username</label>
                    <input 
                        type="text"
                        value={userData.username}
                        name="username"
                        placeholder="Ingresa tu usuario"
                        onChange={handleInputChange}
                        className={errors.username ? styles.inputError : ""}
                    />
                    {errors.username && (
                        <p className={styles.error}>{errors.username}</p>
                    )}
                </div>
                
                <div className={styles.inputGroup}>
                    <label>Password</label>
                    <input 
                        type="password"
                        value={userData.password}
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        onChange={handleInputChange}
                        className={errors.password ? styles.inputError : ""}
                    />
                    {errors.password && (
                        <p className={styles.error}>{errors.password}</p>
                    )}
                </div>
                
                <button 
                    type="submit" 
                    className={styles.button}
                    disabled={isFormInvalid || isSubmitting}
                >
                    {isSubmitting ? "Cargando..." : "Ingresar"}
                </button>

                <p className={styles.registerLink}>
                    ¿No tienes cuenta?{" "}
                    <a href="/register" className={styles.link}>
                        Regístrate aquí
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;