import { CreateTicketParams } from "@/services/tickets-service";
import Joi from "joi";

export const createTicketSchema = Joi.object<CreateTicketParams>({
  ticketTypeId: Joi.number().integer().required(),
});
