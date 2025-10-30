import { Router } from 'express';
import { getUsers, getUserById, registerUser, loginUser } from '../controllers/usersController';

const router: Router = Router();

//Get/ users => obtener todos los usuarios
//Get/ users/ :id =>obtener usuario por ID
//post/users/ register => crear un nuevo usuario 

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
