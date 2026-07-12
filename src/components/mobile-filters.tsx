import { X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export function MobileFilters({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="lg:hidden flex items-center gap-2 text-sm font-semibold border-b-2 border-transparent hover:border-primary pb-1">
        <SlidersHorizontal className="h-4 w-4" />
        <span>Filters</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="absolute top-0 right-0 h-full w-full max-w-sm bg-background shadow-lg p-6 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setIsOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto py-6">
              {children}
            </div>
            <div className="pt-4 border-t border-border">
              <button onClick={() => setIsOpen(false)} className="w-full bg-primary text-primary-foreground py-2.5 rounded-md">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}