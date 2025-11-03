import { Router } from 'express';
import { getAllUsers, getUserById, registerUser, loginUser } from '../controllers/usersController';

const usersRouter: Router = Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);

export default usersRouter;
