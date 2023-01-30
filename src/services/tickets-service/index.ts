import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";
import { Event, Ticket, TicketType } from "@prisma/client";
import dayjs from "dayjs";

async function getTicketsFromUser(userId: number): Promise<Ticket> {
  
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
  if(!enrollment){
    throw notFoundError();
  }

  const ticket = await ticketsRepository.findTicketWithTicketTypesByEnrollmentId(enrollment.id);
  if (!ticket){
    throw notFoundError();
  }
  return ticket;
}

async function getTicketTypes(): Promise<TicketType[]> {

  const ticketTypes = await ticketsRepository.findTicketTypes();

  return ticketTypes
}

const ticketsService = {
    getTicketsFromUser,
    getTicketTypes
};

export default ticketsService;