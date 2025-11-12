export const validateDate = (dateString) => {
    if (!dateString) {
        return { isValid: false, error: "" };
    }

    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        return { 
            isValid: false, 
            error: "⚠️ No puedes seleccionar una fecha pasada" 
        };
    }

    return { isValid: true, error: "" };
};

export const validateTime = (timeString) => {
    if (!timeString) {
        return { isValid: false, error: "" };
    }

    const [hours, minutes] = timeString.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;
    const minTime = 8 * 60; // 8:00 AM
    const maxTime = 18 * 60; // 6:00 PM

    if (timeInMinutes < minTime) {
        return { 
            isValid: false, 
            error: "⚠️ El horario de atención inicia a las 8:00 AM" 
        };
    }

    if (timeInMinutes > maxTime) {
        return { 
            isValid: false, 
            error: "⚠️ El horario de atención termina a las 6:00 PM" 
        };
    }

    return { isValid: true, error: "" };
};

export const validateSubject = (subject) => {
    if (!subject) {
        return { isValid: false, error: "" };
    }

    if (subject.trim().length < 10) {
        return { 
            isValid: false, 
            error: "⚠️ El motivo debe tener al menos 10 caracteres" 
        };
    }

    if (subject.trim().length > 200) {
        return { 
            isValid: false, 
            error: "⚠️ El motivo no puede exceder 200 caracteres" 
        };
    }

    return { isValid: true, error: "" };
};

export const validateAppointmentForm = (formData) => {
    const dateValidation = validateDate(formData.date);
    const timeValidation = validateTime(formData.time);
    const subjectValidation = validateSubject(formData.subject);

    const errors = {
        date: dateValidation.error,
        time: timeValidation.error,
        subject: subjectValidation.error,
        general: ""
    };

    if (!formData.date || !formData.time || !formData.subject) {
        errors.general = "⚠️ Todos los campos son obligatorios";
        return { isValid: false, errors };
    }

    const hasErrors = !dateValidation.isValid || 
                    !timeValidation.isValid || 
                    !subjectValidation.isValid;

    if (hasErrors) {
        errors.general = "⚠️ Por favor corrige los errores antes de continuar";
        return { isValid: false, errors };
    }

    return { isValid: true, errors };
};
