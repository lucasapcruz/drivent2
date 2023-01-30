import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

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

const ticketsRepository = {
    findTicketWithTicketTypesByEnrollmentId,
    findTicketTypes
};

export default ticketsRepository;