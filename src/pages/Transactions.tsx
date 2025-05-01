
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Receipt } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Transaction = {
  date: string;
  time?: string;
  units?: number;
  amount: number;
  type?: string;
  account?: string;
};

const Transactions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recharge");
  
  const [transactions] = useState<Transaction[]>([
    { date: "2025-05-01", time: "1:52 pm", units: 500, amount: 250, type: "recharge" },
    { date: "2025-04-12", units: 1000, amount: 500, type: "recharge" },
    { date: "2025-03-24", units: 1200, amount: 500, type: "recharge" },
    { date: "2025-03-11", units: 200, amount: 100, type: "recharge" },
    { date: "2025-01-28", units: 400, amount: 200, type: "recharge" },
  ]);

  const [fundingTransactions] = useState<Transaction[]>([
    { date: "2025-05-01", time: "1:52 pm", account: "JOHN DOE 234***5678 A45", amount: 2000 },
    { date: "2025-04-12", account: "JOHN DOE 234***5678 A45", amount: 500 },
    { date: "2025-03-24", account: "JOHN DOE 234***5678 A45", amount: 500 },
    { date: "2025-03-11", account: "JOHN DOE 234***5678 A45", amount: 1000 },
    { date: "2025-01-28", account: "JOHN DOE 234***5678 A45", amount: 20000 },
  ]);

  const formatDate = (dateStr: string) => {
    if (dateStr.includes("-")) {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short'
      }).format(date);
    }
    return dateStr;
  };

  const renderTransactions = (items: Transaction[]) => {
    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Receipt size={64} className="mb-4 text-gray-300" />
          <p className="text-lg font-medium">
            {activeTab === "recharge" ? "No Recharge Yet" : "No Funds Transfer Yet"}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-0 divide-y">
        {items.map((item, idx) => (
          <div key={idx} className="py-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">
                  {item.time || formatDate(item.date)}
                </p>
                <p className="font-medium">
                  {item.units 
                    ? `${item.units.toLocaleString()} Units` 
                    : item.account}
                </p>
              </div>
              <p className="font-bold text-right">₦{item.amount.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <MobileLayout hideNavigation={false}>
      <div className="p-4 space-y-4 pb-20">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold">Transactions</h1>
        </div>

        <Tabs defaultValue="recharge" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100">
            <TabsTrigger value="recharge">Recharge</TabsTrigger>
            <TabsTrigger value="funding">Wallet Funding</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recharge">
            {renderTransactions(transactions)}
          </TabsContent>
          
          <TabsContent value="funding">
            {renderTransactions(fundingTransactions)}
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default Transactions;
