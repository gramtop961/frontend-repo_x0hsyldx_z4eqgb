import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function SummaryCards({ totals }) {
  const { totalDebt, totalIncome, totalWithdrawals } = totals;
  return (
    <section className="max-w-md mx-auto px-4 mt-4 grid grid-cols-2 gap-3">
      <div className="col-span-2 p-4 rounded-2xl bg-indigo-600 text-white">
        <p className="text-sm/4 text-white/80">Total Outstanding</p>
        <p className="text-2xl font-semibold mt-1">${totalDebt.toFixed(2)}</p>
      </div>
      <div className="p-4 rounded-2xl border bg-white">
        <div className="flex items-center justify-between">
          <p className="text-sm/4 text-gray-500">Income</p>
          <ArrowDownRight className="h-4 w-4 text-emerald-600" />
        </div>
        <p className="text-xl font-semibold mt-1 text-emerald-700">${totalIncome.toFixed(2)}</p>
      </div>
      <div className="p-4 rounded-2xl border bg-white">
        <div className="flex items-center justify-between">
          <p className="text-sm/4 text-gray-500">Withdrawals</p>
          <ArrowUpRight className="h-4 w-4 text-rose-600" />
        </div>
        <p className="text-xl font-semibold mt-1 text-rose-700">${totalWithdrawals.toFixed(2)}</p>
      </div>
    </section>
  );
}
