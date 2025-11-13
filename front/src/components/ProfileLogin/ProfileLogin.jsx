import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./ProfileLogin.module.css";

export default function ProfileLogin() {
    const { user, logout } = useContext(UserContext);
    const [image, setImage] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

useEffect(() => {
        const storedImage = user ? localStorage.getItem(`profileImage_${user.id}`) : null;
        
        if (storedImage) {
            setImage(storedImage);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    const handleCircleClick = () => {
        if (!user) {

            navigate("/login");
        } else {

            setShowMenu(!showMenu);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setImage(base64String);
            
            if (user?.id) {
                localStorage.setItem(`profileImage_${user.id}`, base64String);
            }
        };
        reader.readAsDataURL(file);
    }
};

    useEffect(() => {
        if (user?.id) {
            const storedImage = localStorage.getItem(`profileImage_${user.id}`);
            if (storedImage) {
                setImage(storedImage);
            } else {
                setImage(null);
            }
        } else {
            setImage(null);
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        setImage(null);
        setShowMenu(false);
        navigate("/home");
    };

    return (
        <div className={styles.profileContainer} ref={menuRef}>
            <div className={styles.circle} onClick={handleCircleClick}>
                {image ? (
                    <img src={image} alt="Perfil" className={styles.image} />
                ) : (
                    <span className={styles.text}>+</span>
                )}
            </div>

            {user && showMenu && (
                <div className={styles.dropdownMenu}>
                    <div className={styles.menuHeader}>
                        <div className={styles.menuImage}>
                            {image ? (
                                <img src={image} alt="Perfil" className={styles.menuImageImg} />
                            ) : (
                                <span className={styles.menuImagePlaceholder}>👤</span>
                            )}
                        </div>
                        <div className={styles.menuInfo}>
                            <p className={styles.menuName}>{user.name || user.username}</p>
                            <p className={styles.menuEmail}>{user.email}</p>
                        </div>
                    </div>

                    <div className={styles.menuDivider}></div>

                    <label htmlFor="fileInput" className={styles.menuOption}>
                        📷 Cambiar foto
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.input}
                    />

                    <div className={styles.menuDivider}></div>

                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        🚪 Cerrar Sesión
                    </button>
                </div>
            )}
        </div>
    );
}
