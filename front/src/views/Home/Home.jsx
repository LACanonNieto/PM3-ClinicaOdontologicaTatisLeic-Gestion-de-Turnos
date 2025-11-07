import styles from "./Home.module.css"
import TextHome from "../../components/TextHome/TextHome.jsx"

const Home = () => {
    return (
    <main className={styles.main}>
        <h1>Bienvenidos al Consultorio Odontologico</h1>
        <TextHome/>
    </main>
    )
}

export default Home
