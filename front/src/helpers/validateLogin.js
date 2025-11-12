export const validateLogin = (input) => {
    const errors = {};

    if (!input.username) {
        errors.username = "El username es obligatorio";
    } else if (input.username.length < 4) {
        errors.username = "El username debe tener al menos 4 caracteres";
    }

    if (!input.password) {
        errors.password = "La contraseña es obligatoria";
    } else if (input.password.length < 4) {
        errors.password = "La contraseña debe tener al menos 4 caracteres";
    }

    return errors;
};