
import { ReactNode } from "react";
import NavigationBar from "./NavigationBar";

interface MobileLayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
}

const MobileLayout = ({ children, hideNavigation = false }: MobileLayoutProps) => {
  return (
    <div className="mobile-container">
      <main className="app-content">
        {children}
      </main>
      {!hideNavigation && <NavigationBar />}
    </div>
  );
};

export default MobileLayout;
