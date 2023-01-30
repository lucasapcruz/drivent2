import { notFoundError, requestError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";
import { Event, Payment, Ticket, TicketStatus, TicketType } from "@prisma/client";
import dayjs from "dayjs";
import httpStatus from "http-status";

async function processPayment(userId:number, payment: CreatePaymentParams): Promise<Payment> {

  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId)

  const ticketInfo = await ticketsRepository.findTicketById(payment.ticketId)

  if(!ticketInfo){
    throw requestError(httpStatus.NOT_FOUND, "There is no ticket with this ticketId");
  }

  const enrollmentByTicketInfoId = await enrollmentRepository.findWithId(ticketInfo.enrollmentId)

  if(enrollmentByTicketInfoId.userId !== userId){
    throw requestError(httpStatus.UNAUTHORIZED, "There is no ticket with this ticketId");
  }
  
  const cardMask = payment.cardData.number.toString().slice(-4)

  const processedPayment = {
    ticketId:payment.ticketId,
    value: ticketInfo.TicketType.price,
    cardIssuer: payment.cardData.issuer,
    cardLastDigits: cardMask
  }

  const createdPayment = await paymentsRepository.createPaymentForTicket(processedPayment)

  const ticketUpdate = {
    ticketTypeId: ticketInfo.ticketTypeId,
    enrollmentId: ticketInfo.enrollmentId,
    status: TicketStatus.PAID
  }

  const updatedTicket = await ticketsRepository.updateTicketStatus(payment.ticketId, ticketUpdate)

  return createdPayment
}

async function getPaymentInfo(userId:number, ticketId: number): Promise<Payment> {

  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId)
  
  const ticketInfo = await ticketsRepository.findTicketById(ticketId)

  if(!ticketInfo){
    throw requestError(httpStatus.NOT_FOUND, "There is no ticket related to this ticketId");
  }

  const enrollmentByTicketInfoId = await enrollmentRepository.findWithId(ticketInfo.enrollmentId)

  if(enrollmentByTicketInfoId.userId !== userId){
    throw requestError(httpStatus.UNAUTHORIZED, "There is no ticket with this ticketId");
  }

  const paymentInfo = await paymentsRepository.findPaymentInfo(ticketId)

  return paymentInfo
}

export type CreatePaymentParams = {
    ticketId: number,
    cardData: {
      issuer: string,
      number: number,
      name: string,
      expirationDate: Date,
      cvv: number
    }
}

export type ProcessedPaymentParams = Omit<Payment, "id" | "createdAt" | "updatedAt">

const paymentsServices = {
    processPayment,
    getPaymentInfo
};

export default paymentsServices;