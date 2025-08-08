import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class SearchTransaction {
  async searchTransaction(request: Request, response: Response) {
    try {
      const { _sort, _order, q, page } = request.query;

      // Campo de ordenação — aqui usamos 'id' como padrão
      const orderByField = _sort && typeof _sort === "string" ? _sort : "id";
      const orderDirection = _order === "desc" ? "desc" : "asc";

      // Filtro de busca
      const where = q
        ? {
            OR: [
              {
                description: {
                  contains: String(q),
                  mode: "insensitive" as const,
                },
              },
              {
                category: {
                  contains: String(q),
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {};

      // Paginação
      const pageNumber = page ? parseInt(String(page)) : 0;
      const itemsPerPage = 10;
      const skip = pageNumber * itemsPerPage;

      const transactions = await prismaClient.transaction.findMany({
        where,
        orderBy: {
          [orderByField]: orderDirection,
        },
        skip,
        take: itemsPerPage,
      });

      const total = await prismaClient.transaction.count({ where });

      return response.status(200).json({
        message: "Transações encontradas com sucesso!",
        transactions,
        total,
        page: pageNumber,
        totalPages: Math.ceil(total / itemsPerPage),
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao buscar transações" });
    }
  }
}
