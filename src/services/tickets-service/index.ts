import { notFoundError, requestError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";
import { Event, Ticket, TicketType } from "@prisma/client";
import dayjs from "dayjs";
import httpStatus from "http-status";

async function getTicketsFromUser(userId: number): Promise<Ticket> {
  
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
  if(!enrollment){
    throw requestError(httpStatus.NOT_FOUND, "User doesn't have an enrollment yet");
  }

  const ticket = await ticketsRepository.findTicketWithTicketTypesByEnrollmentId(enrollment.id);
  if (!ticket){
    throw requestError(httpStatus.NOT_FOUND, "User doesn't have a ticket yet");
  }
  return ticket;
}

async function getTicketTypes(): Promise<TicketType[]> {

  const ticketTypes = await ticketsRepository.findTicketTypes();

  return ticketTypes
}

async function createTicket(userId: number, ticketTypeId: number): Promise<Ticket> {

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
  if(!enrollment){
    throw requestError(httpStatus.NOT_FOUND, "User doesn't have an enrollment yet");
  }

  const createdTicket = await ticketsRepository.createTicket(enrollment.id, ticketTypeId);

  return createdTicket
}

export type CreateTicketParams = Pick<Ticket, "ticketTypeId">;

export type UpdateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;


const ticketsService = {
    getTicketsFromUser,
    getTicketTypes,
    createTicket
};

export default ticketsService;