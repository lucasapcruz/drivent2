import { CreatePaymentParams } from "@/services/payments-service";
import Joi from "joi";

export const processPaymentSchema = Joi.object<CreatePaymentParams>({
  ticketId: Joi.number().integer().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.string().required()
  })
});
