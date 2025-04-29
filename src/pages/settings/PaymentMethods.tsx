
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Plus, Trash2, Check, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface PaymentMethodProps {
  id: string;
  type: "card" | "bank" | "mobile";
  name: string;
  lastFour: string;
  expiryDate?: string;
  isDefault: boolean;
}

const PaymentMethods = () => {
  const { toast } = useToast();
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodProps[]>([
    {
      id: "card-1",
      type: "card",
      name: "Visa",
      lastFour: "4242",
      expiryDate: "09/26",
      isDefault: true
    },
    {
      id: "bank-1",
      type: "bank",
      name: "Zenith Bank",
      lastFour: "7890",
      isDefault: false
    },
    {
      id: "mobile-1",
      type: "mobile",
      name: "Mobile Money",
      lastFour: "1234",
      isDefault: false
    }
  ]);

  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard(prev => ({ ...prev, [name]: value }));
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    
    toast({
      description: "Default payment method updated."
    });
  };

  const handleDeleteMethod = (id: string) => {
    const methodToDelete = paymentMethods.find(method => method.id === id);
    
    if (methodToDelete?.isDefault) {
      toast({
        title: "Cannot Delete",
        description: "You cannot delete your default payment method.",
        variant: "destructive"
      });
      return;
    }
    
    setPaymentMethods(methods => 
      methods.filter(method => method.id !== id)
    );
    
    toast({
      description: "Payment method removed successfully."
    });
  };

  const handleAddCard = () => {
    // Validation would go here in a real app
    
    const newPaymentMethod: PaymentMethodProps = {
      id: `card-${Date.now()}`,
      type: "card",
      name: detectCardType(newCard.cardNumber) || "Card",
      lastFour: newCard.cardNumber.slice(-4),
      expiryDate: newCard.expiryDate,
      isDefault: paymentMethods.length === 0
    };
    
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    
    setNewCard({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: ""
    });
    
    toast({
      title: "Card Added",
      description: "Your new payment method has been added."
    });
    
    return true;
  };

  // Simple card type detection
  const detectCardType = (cardNumber: string): string => {
    const firstDigit = cardNumber.charAt(0);
    
    if (cardNumber.startsWith("4")) {
      return "Visa";
    } else if (cardNumber.startsWith("5")) {
      return "MasterCard";
    } else if (cardNumber.startsWith("3")) {
      return "Amex";
    }
    
    return "Card";
  };

  const getCardIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "visa":
        return "💳";
      case "mastercard":
        return "💳";
      case "amex":
        return "💳";
      case "zenith bank":
        return "🏦";
      case "mobile money":
        return "📱";
      default:
        return "💰";
    }
  };

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link to="/settings" className="text-gray-600 dark:text-gray-300">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Payment Methods</h1>
        </div>

        <div className="flex flex-col gap-4">
          {paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 text-2xl">
                      {getCardIcon(method.name)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{method.name}</p>
                        {method.isDefault && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle2 size={12} className="mr-1" />
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {method.type === "card" ? "•••• " : ""}{method.lastFour}
                        {method.expiryDate ? ` • Expires ${method.expiryDate}` : ""}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {!method.isDefault && (
                      <>
                        <button 
                          onClick={() => handleSetDefault(method.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 hover:dark:bg-blue-900/20 rounded-full"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteMethod(method.id)}
                          className="p-2 text-red-600 hover:bg-red-50 hover:dark:bg-red-900/20 rounded-full"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="w-full">
              <Plus size={18} className="mr-2" />
              Add Payment Method
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Payment Method</SheetTitle>
              <SheetDescription>
                Enter your card details to add a new payment method.
              </SheetDescription>
            </SheetHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={newCard.cardNumber}
                  onChange={handleCardInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardHolder">Card Holder Name</Label>
                <Input
                  id="cardHolder"
                  name="cardHolder"
                  placeholder="John Doe"
                  value={newCard.cardHolder}
                  onChange={handleCardInputChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={newCard.expiryDate}
                    onChange={handleCardInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    type="password"
                    placeholder="123"
                    value={newCard.cvv}
                    onChange={handleCardInputChange}
                  />
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button onClick={handleAddCard} className="w-full">
                  Add Card
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start space-x-3">
          <Info className="text-blue-500 mt-0.5 flex-shrink-0" size={18} />
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Your payment information is encrypted and secure. We never store your full card details on our servers.
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default PaymentMethods;
