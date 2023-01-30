import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { processPaymentSchema } from "@/schemas/payments-schema";
import { getTicketPaymentInfo, processPayment } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter
    .all("/*", authenticateToken)
    .get("/", getTicketPaymentInfo)
    .post("/process", validateBody(processPaymentSchema), processPayment)

export { paymentsRouter };
