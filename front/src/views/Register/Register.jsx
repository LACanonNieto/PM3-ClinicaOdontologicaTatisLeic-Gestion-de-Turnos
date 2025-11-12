import axios from "axios";
import styles from "./Register.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { initialValues, validationSchema, formFields } from "../../helpers/validateRegister";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
        await axios.post("http://localhost:3312/users/register", values);
        
        alert("¡Registro exitoso! Ahora puedes iniciar sesión");
        resetForm();

        setTimeout(()=>{
            navigate("/login");
        }, 1000);
        
    } catch (error) {
        console.error("Error en el registro:", error);
        
        if (error.response?.status === 409 || 
            error.response?.data?.message?.includes("duplicate") ||
            error.response?.data?.message?.includes("ya existe")) {
            alert("Este email ya está registrado. Por favor usa otro email o inicia sesión.");
        } 
        else if (error.response?.data?.message) {
            alert(error.response.data.message);
        } 
        else {
            alert("Hubo un error al registrar el usuario. Por favor intenta de nuevo.");
        }
    } finally {
        setSubmitting(false);
    }
};

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerCard}>
                <h1 className={styles.title}>Formulario de Registro</h1>
                <p className={styles.subtitle}>
                    Por favor llene los siguientes datos para crear su usuario y poder solicitar sus citas
                </p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className={styles.form}>
                            {formFields.map((field) => (
                                <div key={field.name} className={styles.formGroup}>
                                    <label htmlFor={field.name}>{field.label}</label>
                                    <Field
                                        type={field.type}
                                        id={field.name}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        className={styles.input}
                                    />
                                    <ErrorMessage
                                        name={field.name}
                                        component="div"
                                        className={styles.error}
                                    />
                                </div>
                            ))}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={styles.submitBtn}
                            >
                                {isSubmitting ? "Registrando..." : "Registrarse"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className={styles.loginLink}>
                    ¿Ya tienes cuenta?{" "}
                    <a href="/login" className={styles.link}>
                        Inicia sesión aquí
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
