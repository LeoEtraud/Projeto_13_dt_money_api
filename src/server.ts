import express, { Request, Response, NextFunction } from "express"; // Adicione NextFunction
import cors from "cors";
import { router } from "./routes/routes";

const app = express();

// Middlewares globais
app.use(express.json());
app.use(express.static("public"));

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Cache-Control
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  next();
});

// Rotas
app.use(router);

// Middleware de tratamento de erros (CORRIGIDO)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Adicione next
  console.error(err.stack); // Log do erro no servidor
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}!`));
