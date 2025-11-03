import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function CustomerList({ customers, onSelect, selectedId }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.guarantor.toLowerCase().includes(q)
    );
  }, [query, customers]);

  return (
    <section className="max-w-md mx-auto px-4 mt-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customers or guarantors"
          className="w-full pl-10 pr-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <ul className="mt-3 space-y-2">
        {filtered.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => onSelect(c.id)}
              className={`w-full p-4 rounded-2xl border text-left bg-white hover:bg-gray-50 transition ${
                selectedId === c.id ? "ring-2 ring-indigo-500" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-gray-500">Guarantor: {c.guarantor}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${
                      c.balance > 0 ? "text-rose-600" : "text-emerald-600"
                    }`}>
                    ${Math.abs(c.balance).toFixed(2)} {c.balance > 0 ? "owed" : "credit"}
                  </p>
                  <p className="text-xs text-gray-500">Txns: {c.history.length}</p>
                </div>
              </div>
            </button>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-center text-sm text-gray-500 py-6">No customers found</li>
        )}
      </ul>
    </section>
  );
}
