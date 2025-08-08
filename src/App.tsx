import { useState } from "react";
import "./App.css";

interface Transaction {
  id: string;
  description: string;
  price: number;
  category: string;
  type: string;
  createdAt: string;
}

interface TransactionResponse {
  message: string;
  transactions: Transaction[];
  total: number;
  page: number;
  totalPages: number;
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulando a chamada do frontend com os parâmetros
      const response = await fetch(
        "http://localhost:3333/transactions?_sort=createdAt&_order=desc&page=0",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Status da resposta:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta:", errorText);
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      const data: TransactionResponse = await response.json();
      console.log("Dados recebidos da API:", data);
      setTransactions(data.transactions);
    } catch (err) {
      console.error("Erro ao buscar transações:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Teste da API de Transações</h1>

      <button
        onClick={fetchTransactions}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Carregando..." : "Buscar Transações"}
      </button>

      {error && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            borderRadius: "5px",
            border: "1px solid #f5c6cb",
          }}
        >
          <strong>Erro:</strong> {error}
        </div>
      )}

      {transactions.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Transações Encontradas ({transactions.length})</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  borderRadius: "8px",
                  backgroundColor:
                    transaction.type === "income" ? "#d4edda" : "#f8d7da",
                }}
              >
                <div>
                  <strong>ID:</strong> {transaction.id}
                </div>
                <div>
                  <strong>Descrição:</strong> {transaction.description}
                </div>
                <div>
                  <strong>Preço:</strong> R${" "}
                  {Number(transaction.price).toFixed(2)}
                </div>
                <div>
                  <strong>Categoria:</strong> {transaction.category}
                </div>
                <div>
                  <strong>Tipo:</strong> {transaction.type}
                </div>
                <div>
                  <strong>Data:</strong>{" "}
                  {new Date(transaction.createdAt).toLocaleDateString("pt-BR")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {transactions.length === 0 && !loading && !error && (
        <div style={{ marginTop: "20px", textAlign: "center", color: "#666" }}>
          Clique em "Buscar Transações" para carregar os dados
        </div>
      )}
    </div>
  );
}

export default App;
