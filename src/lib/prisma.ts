import { PrismaClient } from "@prisma/client";

// DEFININDO A CONEXÃO COM O BANCO DE DADOS
export const prisma = new PrismaClient({
    log: ['query'],
})