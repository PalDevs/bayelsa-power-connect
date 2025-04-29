
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileLayout hideNavigation>
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 animate-fade-in">
        <img 
          src="/lovable-uploads/07ae02c6-8a64-4182-bb68-e6cc902fec61.png" 
          alt="Bayelsa State Emblem" 
          className="w-32 h-32 mb-8"
        />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">WELCOME</h1>
          <h2 className="text-2xl font-bold">DOUYE DIRI</h2>
        </div>
        <div className="absolute bottom-12">
          <div className="flex items-center space-x-2">
            <span className="text-4xl font-bold">B</span>
            <img 
              src="/placeholder.svg" 
              alt="Power Tower Icon" 
              className="w-6 h-8"
            />
            <span className="text-4xl font-bold">Y POWER</span>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Welcome;
