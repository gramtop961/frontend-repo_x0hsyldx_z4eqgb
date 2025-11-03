import { Plus, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function TransactionForm({ customers, selectedId, onAdd, onAddCustomer }) {
  const [type, setType] = useState("withdraw"); // withdraw increases debt, income reduces debt
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [newCustomer, setNewCustomer] = useState({ name: "", guarantor: "" });

  useEffect(() => {
    setAmount("");
    setNote("");
  }, [type, selectedId]);

  const customer = useMemo(
    () => customers.find((c) => c.id === selectedId),
    [customers, selectedId]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!customer || isNaN(value) || value <= 0) return;
    onAdd({
      customerId: selectedId,
      type,
      amount: value,
      note: note.trim(),
      date: new Date().toISOString(),
    });
    setAmount("");
    setNote("");
  };

  const canSubmit = customer && amount && parseFloat(amount) > 0;

  return (
    <section className="max-w-md mx-auto px-4 mt-4 pb-20">
      <div className="p-4 rounded-2xl border bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">New Transaction</h3>
          {customer && (
            <p className="text-xs text-gray-500">
              Selected: <span className="font-medium text-gray-700">{customer.name}</span>
            </p>
          )}
        </div>

        {!customer && (
          <div className="mb-4 p-3 rounded-xl bg-indigo-50 text-indigo-700 text-sm">
            Select a customer below or create a new one.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border ${
                type === "withdraw" ? "bg-rose-50 border-rose-200 text-rose-700" : "bg-white"
              }`}
              onClick={() => setType("withdraw")}
            >
              <ArrowUpRight className="h-4 w-4" /> Withdraw
            </button>
            <button
              type="button"
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border ${
                type === "income" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white"
              }`}
              onClick={() => setType("income")}
            >
              <ArrowDownRight className="h-4 w-4" /> Income
            </button>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Amount</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Note</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional details"
              className="w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-indigo-600 text-white disabled:opacity-50"
          >
            <Plus className="h-4 w-4" /> Add Transaction
          </button>
        </form>
      </div>

      <div className="mt-4 p-4 rounded-2xl border bg-white">
        <h3 className="font-semibold mb-2">Create Customer</h3>
        <div className="grid grid-cols-2 gap-2">
          <input
            value={newCustomer.name}
            onChange={(e) => setNewCustomer((s) => ({ ...s, name: e.target.value }))}
            placeholder="Customer name"
            className="px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            value={newCustomer.guarantor}
            onChange={(e) => setNewCustomer((s) => ({ ...s, guarantor: e.target.value }))}
            placeholder="Guarantor"
            className="px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => {
              const name = newCustomer.name.trim();
              const guarantor = newCustomer.guarantor.trim();
              if (!name || !guarantor) return;
              onAddCustomer({ name, guarantor });
              setNewCustomer({ name: "", guarantor: "" });
            }}
            className="col-span-2 px-3 py-2.5 rounded-xl bg-gray-900 text-white"
          >
            Add Customer
          </button>
        </div>
      </div>
    </section>
  );
}
