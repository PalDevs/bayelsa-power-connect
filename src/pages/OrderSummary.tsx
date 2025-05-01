
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Wallet, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileLayout from "@/components/layout/MobileLayout";
import ActionButton from "@/components/ui/ActionButton";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPaying, setIsPaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Get data passed from Recharge page
  const { amount = 0, units = 0, meterNumber = "BY - 45678901" } = location.state || {};
  
  // Mock user data (in a real app, this would come from a user profile/context)
  const userData = {
    name: "John Doe",
    address: "12, Akin Street"
  };

  // Mock transaction data (in a real app, this would be generated after payment)
  const transactionData = {
    reference: "4567890" + Math.floor(Math.random() * 1000),
    receipt: "1234 - 568 - 9012 - 3",
    date: new Date().toLocaleString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  };

  const handlePayment = () => {
    setIsPaying(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsPaying(false);
      setIsCompleted(true);
      
      // Show success toast
      toast({
        title: "Payment Successful",
        description: "Your account has been credited with " + units.toFixed(2) + " kWh"
      });
    }, 2000);
  };

  const handleComplete = () => {
    navigate("/dashboard");
  };

  return (
    <MobileLayout hideNavigation>
      <div>
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 mr-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-bayelsa-deep-blue">
            {isCompleted ? "Units Purchased Successfully!" : "Order Summary"}
          </h1>
        </div>

        {isCompleted ? (
          // Success view - after payment is completed
          <Card className="border-0 shadow-sm mb-6">
            <div className="divide-y">
              <div className="py-4 px-4">
                <p className="text-bayelsa-deep-blue font-medium">Meter Number</p>
                <p className="font-semibold">{meterNumber}</p>
              </div>
              
              <div className="py-4 px-4">
                <p className="text-bayelsa-deep-blue font-medium">Home Address</p>
                <p className="font-semibold">{userData.address}</p>
              </div>
              
              <div className="py-4 px-4">
                <p className="text-bayelsa-deep-blue font-medium">Number of Units</p>
                <p className="font-semibold">{units.toLocaleString()}</p>
              </div>
              
              <div className="py-4 px-4">
                <p className="text-bayelsa-deep-blue font-medium">Total Cost</p>
                <p className="font-semibold">₦{amount.toLocaleString()}</p>
              </div>
              
              <div className="py-4 px-4">
                <p className="text-bayelsa-deep-blue font-medium">Transaction Reference</p>
                <p className="font-semibold">{transactionData.reference}</p>
              </div>
              
              <div className="py-4 px-4 flex justify-between items-center">
                <div>
                  <p className="text-bayelsa-deep-blue font-medium">Receipt Number</p>
                  <p className="font-semibold">{transactionData.receipt}</p>
                </div>
                <ChevronLeft size={20} className="rotate-180" />
              </div>
              
              <div className="py-4 px-4">
                <p className="text-bayelsa-deep-blue font-medium">Date of Payment</p>
                <p className="font-semibold">{transactionData.date}</p>
              </div>
            </div>
            
            <div className="p-4">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <FileText size={18} />
                Download Receipt
              </Button>
            </div>
          </Card>
        ) : (
          // Order summary view - before payment
          <Card className="border-0 shadow-sm mb-6">
            <div className="divide-y">
              <div className="py-4 px-4">
                <p className="text-bayelsa-deep-blue font-medium">Meter Number</p>
                <p className="font-semibold">{meterNumber}</p>
              </div>
              
              <div className="py-4 px-4">
                <p className="text-bayelsa-deep-blue font-medium">Name</p>
                <p className="font-semibold">{userData.name}</p>
              </div>
              
              <div className="py-4 px-4">
                <p className="text-bayelsa-deep-blue font-medium">Home Address</p>
                <p className="font-semibold">{userData.address}</p>
              </div>
              
              <div className="py-4 px-4">
                <p className="text-bayelsa-deep-blue font-medium">Number of Units</p>
                <p className="font-semibold">{units.toLocaleString()}</p>
              </div>
              
              <div className="py-4 px-4">
                <p className="text-bayelsa-deep-blue font-medium">Payment Method</p>
                <div className="bg-gray-50 p-3 rounded-lg mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet size={20} className="text-bayelsa-deep-blue" />
                    <span>Wallet</span>
                  </div>
                  <span className="font-medium">₦567.89</span>
                </div>
                <button className="text-bayelsa-blue text-sm mt-2 flex items-center">
                  Change Payment Method
                  <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Action Button */}
        {isCompleted ? (
          <ActionButton 
            fullWidth 
            onClick={handleComplete}
            className="bg-bayelsa-deep-blue"
          >
            Complete
          </ActionButton>
        ) : (
          <ActionButton 
            fullWidth 
            onClick={handlePayment}
            disabled={isPaying}
          >
            {isPaying ? "Processing..." : `Pay ₦${amount.toLocaleString()}`}
          </ActionButton>
        )}
      </div>
    </MobileLayout>
  );
};

export default OrderSummary;
