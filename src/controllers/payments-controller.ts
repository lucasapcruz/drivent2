import { AuthenticatedRequest } from "@/middlewares";
import paymentsServices from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function processPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { body } = req;
  
  try {
    const processedPayment = await paymentsServices.processPayment(userId, {
      ...body
    });

    return res.status(httpStatus.OK).send(processedPayment);
  } catch (error) {
    if(error.name === "RequestError"){
      return res.status(error.status).send(error.statusText);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getTicketPaymentInfo(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const {ticketId} = req.query;
  
  try {

    if(!ticketId){
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    
    const ticketPaymentInfo = await paymentsServices.getPaymentInfo(userId, Number(ticketId));

    return res.status(httpStatus.OK).send(ticketPaymentInfo);
  } catch (error) {
    if(error.name === "RequestError"){
      return res.status(error.status).send(error.statusText);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}