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
    console.log(error)
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}