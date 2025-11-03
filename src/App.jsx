import { useMemo, useState } from "react";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import CustomerList from "./components/CustomerList";
import TransactionForm from "./components/TransactionForm";

function seedCustomers() {
  return [
    {
      id: "c1",
      name: "Amina Ali",
      guarantor: "Hassan Noor",
      balance: 120.0, // owes 120
      history: [
        { type: "withdraw", amount: 70, date: "2025-01-03" },
        { type: "withdraw", amount: 50, date: "2025-01-05" },
      ],
    },
    {
      id: "c2",
      name: "Joseph K",
      guarantor: "Mary J",
      balance: 30.0, // owes 30
      history: [{ type: "withdraw", amount: 30, date: "2025-01-06" }],
    },
    {
      id: "c3",
      name: "Sara W",
      guarantor: "Ahmed M",
      balance: -15.0, // in credit 15
      history: [
        { type: "withdraw", amount: 60, date: "2025-01-04" },
        { type: "income", amount: 75, date: "2025-01-07" },
      ],
    },
  ];
}

export default function App() {
  const [customers, setCustomers] = useState(seedCustomers());
  const [selectedId, setSelectedId] = useState(customers[0]?.id ?? null);

  const totals = useMemo(() => {
    const totalDebt = customers.reduce((sum, c) => (c.balance > 0 ? sum + c.balance : sum), 0);
    const { income, withdrawals } = customers.reduce(
      (acc, c) => {
        c.history.forEach((h) => {
          if (h.type === "income") acc.income += h.amount;
          else acc.withdrawals += h.amount;
        });
        return acc;
      },
      { income: 0, withdrawals: 0 }
    );
    return { totalDebt, totalIncome: income, totalWithdrawals: withdrawals };
  }, [customers]);

  const addTransaction = ({ customerId, type, amount, note, date }) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id !== customerId) return c;
        const balance = type === "withdraw" ? c.balance + amount : c.balance - amount;
        const history = [
          { type, amount, note, date },
          ...c.history,
        ];
        return { ...c, balance, history };
      })
    );
  };

  const addCustomer = ({ name, guarantor }) => {
    setCustomers((prev) => [
      {
        id: `c${prev.length + 1}`,
        name,
        guarantor,
        balance: 0,
        history: [],
      },
      ...prev,
    ]);
  };

  const resetData = () => {
    setCustomers(seedCustomers());
    setSelectedId("c1");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onReset={resetData} />
      <SummaryCards totals={totals} />
      <CustomerList
        customers={customers}
        onSelect={setSelectedId}
        selectedId={selectedId}
      />
      <TransactionForm
        customers={customers}
        selectedId={selectedId}
        onAdd={addTransaction}
        onAddCustomer={addCustomer}
      />
      <footer className="py-8 text-center text-xs text-gray-500">Designed for mobile — resize your window to phone width for the best experience.</footer>
    </div>
  );
}
