import "reflect-metadata"
import server from './server';
import { PORT } from './config/envs';
import { AppDataSource } from './config/data-source';

AppDataSource.initialize().then(() => {
        console.info("✅ Conexión a la base de datos realizada con éxito");
        console.info(`📊 Base de datos: ${process.env.DB_NAME}`);
        console.info(`💻 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
        
        server.listen(PORT, () => {
            console.info(`Servidor corriendo en http://localhost:${PORT}`);
        });

    })
    .catch((error) => {
        console.error("❌ Error conectando a la base de datos:", error);
        process.exit(1);
    });
    