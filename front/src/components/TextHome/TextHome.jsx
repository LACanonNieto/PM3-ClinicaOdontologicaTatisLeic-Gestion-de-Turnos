import styles from "./TextHome.module.css"


const TextHome = () =>{
    return(
        <div className={styles.container}>
                <img src="/images/foto-Consultorio.jpg" alt="Consultorio Odontológico" className={styles.image}/>

            <p>
            En nuestro consultorio odontológico brindamos atención integral 
            con tecnología moderna y un equipo comprometido con tu salud bucal. 
            Ofrecemos tratamientos personalizados en un ambiente cómodo, seguro 
            y con la calidez que mereces. Nuestro objetivo es ayudarte a mantener 
            una sonrisa sana y radiante.¡Tu sonrisa es nuestra mejor carta de presentación!
            </p>        
        </div>
    )
};

export default TextHome;
