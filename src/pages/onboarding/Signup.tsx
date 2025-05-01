
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ActionButton from "@/components/ui/ActionButton";
import { useToast } from "@/hooks/use-toast";
import MobileLayout from "@/components/layout/MobileLayout";

const SignupPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    meterNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // This would be connected to backend registration in a real app
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords are identical",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate successful registration
    toast({
      title: "Account created successfully!",
      description: "Welcome to BAY POWER",
    });
    
    // Navigate to the dashboard after signup
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <MobileLayout hideNavigation>
      <div className="flex flex-col min-h-screen p-6 pb-20 animate-fade-in">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate("/onboarding/welcome")} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft size={24} className="text-bayelsa-deep-blue dark:text-bayelsa-teal" />
          </button>
          <h1 className="text-2xl font-bold ml-4 text-bayelsa-deep-blue dark:text-white">Sign Up</h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName"
              name="firstName" 
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
              className="h-12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName"
              name="lastName" 
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
              className="h-12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone"
              name="phone" 
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+234 701 234 5678"
              required
              className="h-12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Home Address</Label>
            <Input 
              id="address"
              name="address" 
              value={formData.address}
              onChange={handleChange}
              placeholder="12, Akin Street"
              required
              className="h-12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="meterNumber">Meter Number</Label>
            <Input 
              id="meterNumber"
              name="meterNumber" 
              value={formData.meterNumber}
              onChange={handleChange}
              placeholder="12-3456-7890-1"
              required
              className="h-12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email"
              name="email" 
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@gmail.com"
              required
              className="h-12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              name="password" 
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••"
              required
              minLength={8}
              className="h-12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Retype Password</Label>
            <Input 
              id="confirmPassword"
              name="confirmPassword" 
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••••"
              required
              className="h-12"
            />
          </div>
          
          <div className="pt-4">
            <ActionButton 
              type="submit"
              fullWidth 
              className="py-4 transition-all duration-300 hover:scale-[1.02] mt-4"
            >
              Create Account
            </ActionButton>
          </div>
          
          <div className="text-center pt-4">
            <span className="text-gray-500 dark:text-gray-400">Already have an account? </span>
            <button 
              type="button"
              onClick={() => navigate("/onboarding/login")}
              className="text-bayelsa-blue dark:text-bayelsa-teal font-medium"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </MobileLayout>
  );
};

export default SignupPage;
