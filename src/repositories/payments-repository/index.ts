import { prisma } from "@/config";
import { ProcessedPaymentParams } from "@/services/payments-service";
import { Ticket, TicketStatus } from "@prisma/client";

async function createPaymentForTicket(
  processedPayment: ProcessedPaymentParams
) {
  return prisma.payment.create({
    data: processedPayment
  });
}

async function findPaymentInfo(
  ticketId: number
) {
  return prisma.payment.findFirst({
    where:{
      ticketId: ticketId
    }
  });
}

const paymentsRepository = {
  createPaymentForTicket,
  findPaymentInfo
};

export default paymentsRepository;