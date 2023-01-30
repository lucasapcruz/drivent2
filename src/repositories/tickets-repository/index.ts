import { prisma } from "@/config";
import { CreateTicketParams, UpdateTicketParams } from "@/services/tickets-service";
import { Enrollment, Ticket, TicketStatus } from "@prisma/client";

async function findTicketWithTicketTypesByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

async function createTicket(
  enrollmentId: number,
  ticktTypeId: number
) {
  return prisma.ticket.create({
    data:{
      ticketTypeId: ticktTypeId,
      enrollmentId: enrollmentId,
      status: TicketStatus.RESERVED
    },
    include:{
      TicketType:true
    }
  });
}

async function findTicketById(id: number) {
  return prisma.ticket.findFirst({
    where: { id: id },
    include: {
      TicketType: true,
    },
  });
}

async function updateTicketStatus(ticketId: number, ticket: UpdateTicketParams){
  return prisma.ticket.update({
    where:{
      id: ticketId
    },
    data: ticket
  });
}

const ticketsRepository = {
  findTicketWithTicketTypesByEnrollmentId,
  findTicketTypes,
  createTicket,
  findTicketById,
  updateTicketStatus
};

export default ticketsRepository;