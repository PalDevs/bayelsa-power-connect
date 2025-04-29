
import { ReactNode } from "react";

interface PowerCardProps {
  children: ReactNode;
  className?: string;
}

const PowerCard = ({ children, className = "" }: PowerCardProps) => {
  return (
    <div className={`rounded-xl bg-bayelsa-deep-blue text-white p-5 shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default PowerCard;
