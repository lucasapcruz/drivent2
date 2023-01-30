import { prisma } from "@/config";
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

const ticketsRepository = {
  findTicketWithTicketTypesByEnrollmentId,
  findTicketTypes,
  createTicket
};

export default ticketsRepository;