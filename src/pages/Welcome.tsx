
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3500); // Increased time slightly to allow animation to complete

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileLayout hideNavigation>
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Top emblem with pulsing animation */}
        <div className="mb-8 animate-pulse">
          <img 
            src="/lovable-uploads/d262bdb0-052e-43ec-9749-aafd007dd6d4.png" 
            alt="Bayelsa State Emblem" 
            className="w-36 h-36 drop-shadow-lg"
          />
        </div>
        
        {/* Middle content with fade-in animation */}
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-4xl font-bold text-bayelsa-deep-blue dark:text-bayelsa-teal tracking-wide">
            WELCOME TO
          </h1>
          
          <div className="relative">
            <div className="flex items-center justify-center space-x-1">
              <span className="text-5xl font-bold text-bayelsa-blue dark:text-white">B</span>
              
              {/* Power Tower Icon in the middle of "BAY POWER" */}
              <div className="w-8 h-16 relative">
                <img 
                  src="/lovable-uploads/a2c3bcfa-c3fa-406c-8746-1bbe2e59015a.png" 
                  alt="Power Tower" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="flex items-center">
                <span className="text-5xl font-bold text-bayelsa-blue dark:text-white">Y</span>
                <span className="text-5xl font-bold text-bayelsa-blue dark:text-white ml-4">POWER</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-2 italic">
              Powering Bayelsa State
            </p>
          </div>
        </div>
        
        {/* Bottom text with slide-up animation */}
        <div className="absolute bottom-16 animate-fade-in" style={{animationDelay: "1s"}}>
          <p className="text-bayelsa-gray text-sm">
            © 2025 Bayelsa State Government
          </p>
        </div>
        
        {/* Loading dots animation */}
        <div className="absolute bottom-8 flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-bayelsa-teal rounded-full"></div>
          <div className="w-3 h-3 bg-bayelsa-teal rounded-full" style={{animationDelay: "0.2s"}}></div>
          <div className="w-3 h-3 bg-bayelsa-teal rounded-full" style={{animationDelay: "0.4s"}}></div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Welcome;
