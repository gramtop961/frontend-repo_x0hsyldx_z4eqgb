import { User } from "lucide-react";

export default function Header({ onReset }) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white grid place-items-center font-bold">
            DM
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">Debt Manager</h1>
            <p className="text-xs text-muted-foreground">Track customers & payments</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="text-xs px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            title="Reset demo data"
          >
            Reset
          </button>
          <button className="h-9 w-9 rounded-xl border grid place-items-center hover:bg-gray-50" title="Account">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
