
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Wallet, CreditCard } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import ActionButton from "@/components/ui/ActionButton";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const UNIT_PRICE = 50; // ₦50 per kWh

const Recharge = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>("1000");
  const [units, setUnits] = useState<number>(20);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  
  // Meter number would come from user profile in a real app
  const meterNumber = "BY - 45678901";

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
    // Navigate to order summary page instead of immediate recharge
    navigate("/order-summary", {
      state: {
        amount: Number(amount),
        units,
        meterNumber,
        paymentMethod
      }
    });
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
          <h1 className="text-2xl font-bold text-bayelsa-deep-blue">Recharge</h1>
        </div>

        {/* Meter Number Input (read-only) */}
        <div className="mb-6">
          <label className="block text-bayelsa-deep-blue font-medium mb-2">
            Meter Number
          </label>
          <Input
            type="text"
            value={meterNumber}
            readOnly
            className="bg-gray-50 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">
            This is your registered meter number
          </p>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-bayelsa-deep-blue font-medium mb-2">
            Enter Amount (₦)
          </label>
          <Input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="focus:ring-bayelsa-blue"
            placeholder="Enter amount"
          />
          <p className="text-sm text-gray-600 mt-2">
            You will receive approximately {units.toFixed(2)} kWh
          </p>
        </div>

        {/* Preset Amounts */}
        <div className="mb-8">
          <p className="text-sm text-bayelsa-deep-blue mb-2">Quick Select</p>
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

        {/* Payment Methods */}
        <div className="mb-8">
          <p className="text-bayelsa-deep-blue font-medium mb-3">Payment Method</p>
          <RadioGroup defaultValue="card" className="space-y-3" onValueChange={setPaymentMethod}>
            <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
              <div className="flex items-center">
                <RadioGroupItem value="wallet" id="wallet" className="mr-3" />
                <label htmlFor="wallet" className="flex items-center">
                  <Wallet size={20} className="mr-2 text-bayelsa-deep-blue" /> 
                  <span>Wallet</span>
                </label>
              </div>
              <span className="font-medium">₦567.89</span>
            </div>
            
            <div className="flex items-center p-3 border border-gray-300 rounded-lg">
              <RadioGroupItem value="card" id="card" className="mr-3" />
              <label htmlFor="card" className="flex items-center">
                <CreditCard size={20} className="mr-2 text-bayelsa-deep-blue" />
                <span>Card Payment</span>
              </label>
            </div>

            <div className="flex items-center p-3 border border-gray-300 rounded-lg">
              <RadioGroupItem value="bank" id="bank" className="mr-3" />
              <label htmlFor="bank" className="ml-0">Bank Transfer</label>
            </div>
          </RadioGroup>
          
          <div className="mt-3 text-right">
            <button className="text-bayelsa-blue text-sm">
              Add New Payment Method
            </button>
          </div>
        </div>

        {/* Proceed to Order Summary Button */}
        <ActionButton 
          fullWidth 
          onClick={handleRecharge}
          disabled={!amount || isNaN(Number(amount)) || Number(amount) <= 0}
          className="flex items-center justify-center gap-2"
        >
          Proceed to Order Summary
          <ChevronLeft size={16} className="rotate-180" />
        </ActionButton>
      </div>
    </MobileLayout>
  );
};

export default Recharge;
