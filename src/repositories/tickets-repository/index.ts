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

const ticketsRepository = {
    findTicketWithTicketTypesByEnrollmentId,
};

export default ticketsRepository;