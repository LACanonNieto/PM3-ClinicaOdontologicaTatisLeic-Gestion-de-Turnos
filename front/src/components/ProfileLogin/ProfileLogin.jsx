import { useState } from "react";
import styles from "./ProfileLogin.module.css";

export default function ProfileLogin() {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        setImage(imageURL);
    }
};

return (
    <div className={styles.container}>
        <label htmlFor="fileInput" className={styles.circle}>
        {image ? (
            <img src={image} alt="Perfil" className={styles.image} />
        ) : (
            <span className={styles.text}>+</span>
        )}
        </label>

        <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleImageChange}
        className={styles.input}
        />
    </div>
    );
}
