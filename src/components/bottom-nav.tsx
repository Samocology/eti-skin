import { Link } from "@tanstack/react-router";
import { Home, ShoppingBag, Search, User } from "lucide-react";

export function BottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-soft-top z-50">
      <div className="flex justify-around items-center h-16">
        <Link to="/" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/shop" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xs mt-1">Shop</span>
        </Link>
        <button className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Search</span>
        </button>
        <Link to="/account" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Account</span>
        </Link>
      </div>
    </div>
  );
}