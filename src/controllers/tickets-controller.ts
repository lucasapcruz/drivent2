import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticketWithTicketTypes = await ticketsService.getTicketsFromUser(userId);

    return res.status(httpStatus.OK).send(ticketWithTicketTypes);
  } catch (error) {
    if(error.name === "RequestError"){
      return res.status(error.status).send(error.statusText);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getTicketTypes();

    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    if(error.name === "RequestError"){
      return res.status(error.status).send(error.statusText);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}