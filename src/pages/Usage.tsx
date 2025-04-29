
import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { Download, FileText, TrendingDown, TrendingUp, AlertTriangle, Calendar } from "lucide-react";

// Sample data - in a real app, this would come from an API
const usageData = {
  daily: [
    { day: 'Mon', value: 8, average: 7 },
    { day: 'Tue', value: 12, average: 7 },
    { day: 'Wed', value: 16, average: 7 },
    { day: 'Thu', value: 20, average: 7 },
    { day: 'Fri', value: 15, average: 7 },
    { day: 'Sat', value: 10, average: 7 },
    { day: 'Sun', value: 6, average: 7 },
  ],
  weekly: [
    { week: 'W1', value: 60, average: 70 },
    { week: 'W2', value: 85, average: 70 },
    { week: 'W3', value: 75, average: 70 },
    { week: 'W4', value: 92, average: 70 },
  ],
  monthly: [
    { month: 'January', value: 240, average: 300 },
    { month: 'February', value: 320, average: 300 },
    { month: 'March', value: 270, average: 300 },
    { month: 'April', value: 350, average: 300 },
  ],
};

const billHistory = [
  { month: 'April 2025', amount: '₦12,450', status: 'Paid', date: '14/04/2025' },
  { month: 'March 2025', amount: '₦10,780', status: 'Paid', date: '15/03/2025' },
  { month: 'February 2025', amount: '₦11,250', status: 'Paid', date: '13/02/2025' },
];

const meterInfo = {
  meterNumber: "BY-45678901",
  accountNumber: "BYED-123456",
  address: "Sampou Community",
  lastReading: "14523.7 kWh",
  meterType: "Prepaid",
  status: "Active"
};

// Peak usage times
const peakUsageTimes = [
  { time: "6:00 AM - 8:00 AM", percentage: 18 },
  { time: "12:00 PM - 2:00 PM", percentage: 22 },
  { time: "7:00 PM - 10:00 PM", percentage: 35 },
  { time: "Other times", percentage: 25 }
];

const COLORS = ['#47B8B8', '#0A2463', '#F1F0FB', '#8E9196'];

const monthlyComparisonData = [
  { name: 'Apr', current: 350, previous: 320 },
  { name: 'Mar', current: 270, previous: 290 },
  { name: 'Feb', current: 320, previous: 300 },
  { name: 'Jan', current: 240, previous: 250 },
];

const Usage = () => {
  const [period, setPeriod] = useState("daily");
  
  return (
    <MobileLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-2">Power Usage</h2>
        
        {/* Period Tabs */}
        <Tabs defaultValue="daily" onValueChange={setPeriod} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-4">
            <Card className="bg-white shadow-sm">
              <CardContent className="pt-4">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={usageData.daily}
                      margin={{ top: 20, right: 10, left: 0, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#47B8B8" radius={[4, 4, 0, 0]} name="Usage (kWh)" />
                      <Line type="monotone" dataKey="average" stroke="#0A2463" strokeWidth={2} dot={false} name="Average" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg">Usage Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-3">
                  {usageData.daily[6].value > usageData.daily[5].value ? (
                    <TrendingUp className="text-red-500" />
                  ) : (
                    <TrendingDown className="text-green-500" />
                  )}
                  <span className="text-sm">
                    {Math.abs(((usageData.daily[6].value - usageData.daily[5].value) / usageData.daily[5].value) * 100).toFixed(1)}% {usageData.daily[6].value > usageData.daily[5].value ? "increase" : "decrease"} from yesterday
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <AlertTriangle size={16} className="text-amber-500" />
                  <span className="text-sm">Peak usage: 8:00 PM - 9:00 PM</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <Card className="bg-white shadow-sm">
              <CardContent className="pt-4">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={usageData.weekly}
                      margin={{ top: 20, right: 10, left: 0, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#47B8B8" radius={[4, 4, 0, 0]} name="Usage (kWh)" />
                      <Line type="monotone" dataKey="average" stroke="#0A2463" strokeWidth={2} dot={false} name="Average" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg">Weekly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="text-amber-500" />
                  <span className="text-sm">
                    22% higher than your weekly average
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <Card className="bg-white shadow-sm">
              <CardContent className="pt-4">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyComparisonData}
                      margin={{ top: 20, right: 10, left: 0, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="current" stroke="#47B8B8" strokeWidth={2} name="Current Year" />
                      <Line type="monotone" dataKey="previous" stroke="#8E9196" strokeWidth={2} name="Previous Year" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Peak Usage Times */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-lg">Peak Usage Times</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={peakUsageTimes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="percentage"
                    nameKey="time"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {peakUsageTimes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bill History */}
        <Card>
          <CardHeader className="py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Bill History</CardTitle>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Download size={14} />
                <span className="text-xs">Export</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billHistory.map((bill, index) => (
                  <TableRow key={index}>
                    <TableCell>{bill.month}</TableCell>
                    <TableCell>{bill.amount}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {bill.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <Button variant="outline" size="sm" className="w-full mt-4 flex items-center justify-center gap-1">
              <FileText size={14} />
              <span>View All Transactions</span>
            </Button>
          </CardContent>
        </Card>

        {/* Meter Information */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-lg">Meter Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Meter Number</p>
                <p className="font-medium">{meterInfo.meterNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Account Number</p>
                <p className="font-medium">{meterInfo.accountNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="font-medium">{meterInfo.address}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Last Reading</p>
                <p className="font-medium">{meterInfo.lastReading}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Meter Type</p>
                <p className="font-medium">{meterInfo.meterType}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-medium flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  {meterInfo.status}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Schedule Reading</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <AlertTriangle size={14} />
                <span>Report Issue</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Usage;
