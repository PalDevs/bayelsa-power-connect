
import MobileLayout from "@/components/layout/MobileLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const usageData = [
  { month: 'January', value: 8 },
  { month: 'February', value: 12 },
  { month: 'March', value: 16 },
  { month: 'April', value: 20 },
];

const meterInfo = {
  meterNumber: "BY-45678901",
  accountNumber: "BYED-123456",
  address: "Sampou Community"
};

const Usage = () => {
  return (
    <MobileLayout>
      <div className="space-y-8">
        {/* Usage Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={usageData}
              margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="value" fill="#47B8B8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Meter Information */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6">Meter Information</h2>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="font-medium text-lg">Meter Number:</span>
              <span className="text-lg">{meterInfo.meterNumber}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium text-lg">Account Number:</span>
              <span className="text-lg">{meterInfo.accountNumber}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium text-lg">Address:</span>
              <span className="text-lg">{meterInfo.address}</span>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Usage;
