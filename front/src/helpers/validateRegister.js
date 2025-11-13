import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const initialValues = {
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
};


export const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .required("El nombre es obligatorio"),
    email: Yup.string()
        .email("Email inválido")
        .matches(emailRegex, "Email inválido"),
    birthdate: Yup.date()
        .max(new Date(), "La fecha no puede ser futura")
        .test('edad-minima', 'Debes ser mayor de 18 años', function(value) {
            if (!value) return false;
            const hoy = new Date();
            const fechaNacimiento = new Date(value);
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const mes = hoy.getMonth() - fechaNacimiento.getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                edad--;
            }
            return edad >= 18;
        })
        .required("La fecha de nacimiento es obligatoria"),
    nDni: Yup.string()
        .matches(/^[0-9]+$/, "El DNI solo debe contener números")
        .min(6, "El DNI debe tener al menos 6 dígitos")
        .required("El DNI es obligatorio"),
    username: Yup.string()
        .min(4, "El username debe tener al menos 4 caracteres")
        .required("El username es obligatorio"),
    password: Yup.string()
        .min(4, "La contraseña debe tener al menos 4 caracteres")
        .required("La contraseña es obligatoria"),
});


export const formFields = [
    {
        name: "name",
        label: "Nombre Completo",
        type: "text",
        placeholder: "Ej: Juan Pérez"
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "ejemplo@correo.com"
    },
    {
        name: "birthdate",
        label: "Fecha de Nacimiento",
        type: "date",
        placeholder: ""
    },
    {
        name: "nDni",
        label: "DNI",
        type: "text",
        placeholder: "12345678"
    },
    {
        name: "username",
        label: "Usuario",
        type: "text",
        placeholder: "Nombre de usuario"
    },
    {
        name: "password",
        label: "Contraseña",
        type: "password",
        placeholder: "••••••••"
    }
];
