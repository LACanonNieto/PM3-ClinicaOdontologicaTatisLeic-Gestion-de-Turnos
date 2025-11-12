import { createContext, useState, useEffect } from "react";
import axios from "axios"; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userAppointments, setUserAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedAppointments = localStorage.getItem("appointments");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (storedAppointments) {
            setUserAppointments(JSON.parse(storedAppointments));
        }

        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {

            const response = await axios.post("http://localhost:3312/users/login", {
                username,
                password
            });

            const userData = response.data.user;
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));

            await fetchUserAppointments(userData.id);

            return { success: true };
        } catch (error) {
            console.error("Error en login:", error);
            

            let message = "Error al iniciar sesión";
            
            if (error.response?.data?.message) {
                message = error.response.data.message; 
            } else if (error.response?.status === 400) {
                message = "Usuario no registrado";
            } else if (error.response?.status === 401) {
                message = "Contraseña incorrecta";
            }
            
            return {
                success: false,
                message: message
            };
        }
    };

const fetchUserAppointments = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3312/users/${userId}`);
            const appointments = response.data.appointments || [];
            
            setUserAppointments(appointments);
            localStorage.setItem("appointments", JSON.stringify(appointments));
            
            return appointments;
        } catch (error) {
            console.error("Error al cargar turnos:", error);
            setUserAppointments([]);
            return [];
        }
    };


    const refreshAppointments = async () => {
        if (user?.id) {
            await fetchUserAppointments(user.id);
        }
    };

    const logout = () => {
        setUser(null);
        setUserAppointments([]); 
        localStorage.removeItem("user");
        localStorage.removeItem("appointments");
    };

    return (
        <UserContext.Provider value={{ 
            user, 
            userAppointments,
            login, 
            logout, 
            loading,
            fetchUserAppointments,
            refreshAppointments
        }}>
            {children}
        </UserContext.Provider>
    );
};
