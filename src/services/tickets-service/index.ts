import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";
import { Event, Ticket } from "@prisma/client";
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

const ticketsService = {
    getTicketsFromUser,
};

export default ticketsService;