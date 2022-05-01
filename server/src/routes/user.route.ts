import express, { Express, Request, Response, Router } from "express";
import userController from "../controllers/user.controller";

const user_router = Router();

user_router.get("/:id", userController.getUserByID);

user_router.post("/", userController.createUser);
user_router.post("/login", userController.loginUser);

export default user_router;
