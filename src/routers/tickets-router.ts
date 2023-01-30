import { Router } from "express";
import { getUserTicket } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const ticketsRouter = Router();

ticketsRouter
    .all("/*", authenticateToken)
    .get("/", getUserTicket)

export { ticketsRouter };
