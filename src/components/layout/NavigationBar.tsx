
import { useLocation, Link } from "react-router-dom";
import { Home, Zap, Receipt, Settings } from "lucide-react";

const NavigationBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <nav className="app-footer">
      <div className="grid grid-cols-4 py-2">
        <Link to="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/usage" className={`nav-item ${isActive("/usage") ? "active" : ""}`}>
          <Zap size={24} />
          <span className="text-xs mt-1">Usage</span>
        </Link>
        <Link to="/transactions" className={`nav-item ${isActive("/transactions") ? "active" : ""}`}>
          <Receipt size={24} />
          <span className="text-xs mt-1">Transactions</span>
        </Link>
        <Link to="/settings" className={`nav-item ${isActive("/settings") ? "active" : ""}`}>
          <Settings size={24} />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
