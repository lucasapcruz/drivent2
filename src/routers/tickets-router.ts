import { Router } from "express";
import { createTicket, getTicketTypes, getUserTicket } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTicketSchema } from "@/schemas/tickets-schema";

const ticketsRouter = Router();

ticketsRouter
    .all("/*", authenticateToken)
    .get("/", getUserTicket)
    .get("/types", getTicketTypes)
    .post("/", validateBody(createTicketSchema),createTicket)

export { ticketsRouter };
