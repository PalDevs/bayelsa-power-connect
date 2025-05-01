
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Key } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ActionButton from "@/components/ui/ActionButton";
import MobileLayout from "@/components/layout/MobileLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<"meter" | "email">("meter");
  
  // This would be connected to backend authentication in a real app
  const handleLogin = () => {
    // Simulate login and navigate to the dashboard
    navigate("/dashboard");
  };

  return (
    <MobileLayout hideNavigation>
      <div className="flex flex-col min-h-screen p-6 animate-fade-in">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate("/onboarding/welcome")} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft size={24} className="text-bayelsa-deep-blue dark:text-bayelsa-teal" />
          </button>
          <h1 className="text-2xl font-bold ml-4 text-bayelsa-deep-blue dark:text-white">Login</h1>
        </div>

        <Tabs defaultValue="email" className="w-full mb-8" onValueChange={(v) => setLoginMethod(v as "meter" | "email")}>
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="meter" className="data-[state=active]:bg-bayelsa-blue data-[state=active]:text-white">
              Meter Number
            </TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-bayelsa-blue data-[state=active]:text-white">
              Email
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="meter" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meterNumber">Meter Number</Label>
              <Input 
                id="meterNumber" 
                placeholder="12-3456-7890-1"
                className="h-12"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="johndoe@gmail.com"
                className="h-12" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="text-bayelsa-blue p-0 h-auto dark:text-bayelsa-teal">
                  Forgot password?
                </Button>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••••"
                className="h-12" 
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col items-center mt-auto space-y-6">
          <ActionButton 
            onClick={handleLogin} 
            fullWidth 
            className="py-4 transition-all duration-300 hover:scale-[1.02]"
          >
            Login
          </ActionButton>
          
          <div className="text-center">
            <span className="text-gray-500 dark:text-gray-400">Don't have an account? </span>
            <button 
              onClick={() => navigate("/onboarding/signup")}
              className="text-bayelsa-blue dark:text-bayelsa-teal font-medium"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default LoginPage;
