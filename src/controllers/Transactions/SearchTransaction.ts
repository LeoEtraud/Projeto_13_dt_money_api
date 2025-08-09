import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class SearchTransaction {
  async searchTransaction(_request: Request, response: Response) {
    try {
      const transactions = await prismaClient.transaction.findMany({
        orderBy: { createdAt: "desc" }, // ajuste para createdAt se preferir
      });

      return response.status(200).json({
        message: "Transações listadas com sucesso!",
        transactions,
        total: transactions.length,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao listar transações" });
    }
  }
}
