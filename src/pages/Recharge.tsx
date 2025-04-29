
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import ActionButton from "@/components/ui/ActionButton";
import { useToast } from "@/hooks/use-toast";

const UNIT_PRICE = 50; // ₦50 per kWh

const Recharge = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>("1000");
  const [units, setUnits] = useState<number>(20);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    // Calculate units based on amount (₦50 per kWh)
    if (!isNaN(Number(value))) {
      setUnits(Number(value) / UNIT_PRICE);
    }
  };

  const handlePresetAmount = (value: string) => {
    setAmount(value);
    setUnits(Number(value) / UNIT_PRICE);
  };

  const handleRecharge = () => {
    // This would connect to a payment gateway in a real app
    toast({
      title: "Recharge Initiated",
      description: `Processing payment for ₦${amount} (${units} kWh)...`,
    });
    
    // Simulate successful payment after 2 seconds
    setTimeout(() => {
      toast({
        title: "Recharge Successful",
        description: `Your account has been credited with ${units} kWh`,
      });
      navigate("/");
    }, 2000);
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
          <h1 className="text-2xl font-bold">Recharge</h1>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter Amount (₦)
          </label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bayelsa-blue"
            placeholder="Enter amount"
          />
          <p className="text-sm text-gray-600 mt-2">
            You will receive approximately {units.toFixed(2)} kWh
          </p>
        </div>

        {/* Preset Amounts */}
        <div className="mb-8">
          <p className="text-sm text-gray-700 mb-2">Quick Select</p>
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => handlePresetAmount("1000")}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ₦1,000
            </button>
            <button 
              onClick={() => handlePresetAmount("2000")}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ₦2,000
            </button>
            <button 
              onClick={() => handlePresetAmount("3000")}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ₦3,000
            </button>
            <button 
              onClick={() => handlePresetAmount("5000")}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ₦5,000
            </button>
            <button 
              onClick={() => handlePresetAmount("10000")}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ₦10,000
            </button>
            <button 
              onClick={() => handlePresetAmount("20000")}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ₦20,000
            </button>
          </div>
        </div>

        {/* Payment Methods - Just UI placeholders */}
        <div className="mb-8">
          <p className="text-sm text-gray-700 mb-2">Payment Method</p>
          <div className="space-y-3">
            <div className="flex items-center p-3 border border-gray-300 rounded-lg">
              <input type="radio" name="payment" id="card" defaultChecked />
              <label htmlFor="card" className="ml-2">Card Payment</label>
            </div>
            <div className="flex items-center p-3 border border-gray-300 rounded-lg">
              <input type="radio" name="payment" id="bank" />
              <label htmlFor="bank" className="ml-2">Bank Transfer</label>
            </div>
            <div className="flex items-center p-3 border border-gray-300 rounded-lg">
              <input type="radio" name="payment" id="ussd" />
              <label htmlFor="ussd" className="ml-2">USSD</label>
            </div>
          </div>
        </div>

        {/* Recharge Button */}
        <ActionButton 
          fullWidth 
          onClick={handleRecharge}
          disabled={!amount || isNaN(Number(amount)) || Number(amount) <= 0}
        >
          Pay ₦{!isNaN(Number(amount)) ? Number(amount).toLocaleString() : amount}
        </ActionButton>
      </div>
    </MobileLayout>
  );
};

export default Recharge;
